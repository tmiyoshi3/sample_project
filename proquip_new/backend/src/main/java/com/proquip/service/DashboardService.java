package com.proquip.service;

import com.proquip.dto.DashboardSummaryDto;
import com.proquip.dto.DashboardSummaryDto.BudgetSummaryDto;
import com.proquip.dto.DashboardSummaryDto.CategorySpendingDto;
import com.proquip.dto.DashboardSummaryDto.LowStockAlertDto;
import com.proquip.dto.DashboardSummaryDto.RecentOrderDto;
import com.proquip.dto.DashboardSummaryDto.SpendingTrendDto;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class DashboardService {

    @Inject
    EntityManager em;

    public DashboardSummaryDto getSummary() {
        DashboardSummaryDto dto = new DashboardSummaryDto();

        Object[] counts = (Object[]) em.createNativeQuery(
                "SELECT " +
                "(SELECT COUNT(*) FROM product WHERE status = 'ACTIVE'), " +
                "(SELECT COUNT(*) FROM supplier WHERE status = 'ACTIVE'), " +
                "(SELECT COUNT(*) FROM purchase_order WHERE status = 'SUBMITTED'), " +
                "(SELECT COUNT(*) FROM purchase_requisition WHERE status = 'SUBMITTED')")
                .getSingleResult();

        dto.totalProducts = ((Number) counts[0]).longValue();
        dto.activeSuppliers = ((Number) counts[1]).longValue();
        dto.pendingOrders = ((Number) counts[2]).longValue();
        long pendingReqs = ((Number) counts[3]).longValue();
        dto.pendingApprovals = dto.pendingOrders + pendingReqs;

        Number lowStockCount = (Number) em.createNativeQuery(
                "SELECT COUNT(*) FROM inventory_item ii " +
                "JOIN product p ON p.id = ii.product_id " +
                "WHERE p.status = 'ACTIVE' AND ii.quantity_on_hand <= p.min_order_qty")
                .getSingleResult();
        dto.lowStockItems = lowStockCount.longValue();

        return dto;
    }

    @SuppressWarnings("unchecked")
    public List<RecentOrderDto> getRecentOrders() {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT o.id, o.order_number, s.name, o.total_amount, o.status, o.order_date " +
                "FROM purchase_order o " +
                "JOIN supplier s ON s.id = o.supplier_id " +
                "ORDER BY o.order_date DESC NULLS LAST " +
                "LIMIT 10")
                .getResultList();

        List<RecentOrderDto> result = new ArrayList<>();
        for (Object[] row : rows) {
            RecentOrderDto dto = new RecentOrderDto();
            dto.id = ((Number) row[0]).longValue();
            dto.orderNumber = (String) row[1];
            dto.supplierName = (String) row[2];
            dto.totalAmount = row[3] != null ? new BigDecimal(row[3].toString()) : BigDecimal.ZERO;
            dto.status = (String) row[4];
            dto.orderDate = row[5] != null ? row[5].toString() : null;
            result.add(dto);
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    public List<SpendingTrendDto> getSpendingTrend(int months) {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT TO_CHAR(o.order_date, 'YYYY-MM') as month, SUM(o.total_amount) as total " +
                "FROM purchase_order o " +
                "WHERE o.order_date >= CURRENT_DATE - INTERVAL '" + months + " months' " +
                "AND o.status NOT IN ('CANCELLED', 'DRAFT') " +
                "GROUP BY TO_CHAR(o.order_date, 'YYYY-MM') " +
                "ORDER BY 1")
                .getResultList();

        List<SpendingTrendDto> result = new ArrayList<>();
        for (Object[] row : rows) {
            SpendingTrendDto dto = new SpendingTrendDto();
            dto.month = (String) row[0];
            dto.amount = row[1] != null ? new BigDecimal(row[1].toString()) : BigDecimal.ZERO;
            result.add(dto);
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    public List<CategorySpendingDto> getCategorySpending() {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT c.name, COUNT(DISTINCT o.id), SUM(o.total_amount) " +
                "FROM purchase_order o " +
                "JOIN purchase_order_item oi ON oi.order_id = o.id " +
                "JOIN product p ON p.id = oi.product_id " +
                "JOIN category c ON c.id = p.category_id " +
                "WHERE o.status NOT IN ('CANCELLED', 'DRAFT') " +
                "GROUP BY c.name " +
                "ORDER BY SUM(o.total_amount) DESC")
                .getResultList();

        List<CategorySpendingDto> result = new ArrayList<>();
        for (Object[] row : rows) {
            CategorySpendingDto dto = new CategorySpendingDto();
            dto.categoryName = (String) row[0];
            dto.orderCount = ((Number) row[1]).longValue();
            dto.totalAmount = row[2] != null ? new BigDecimal(row[2].toString()) : BigDecimal.ZERO;
            result.add(dto);
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    public List<LowStockAlertDto> getLowStockAlerts() {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT p.id, p.name, p.sku, ii.quantity_on_hand, p.min_order_qty " +
                "FROM inventory_item ii " +
                "JOIN product p ON p.id = ii.product_id " +
                "WHERE p.status = 'ACTIVE' AND ii.quantity_on_hand <= p.min_order_qty " +
                "ORDER BY (ii.quantity_on_hand::float / NULLIF(p.min_order_qty, 0)) ASC")
                .getResultList();

        List<LowStockAlertDto> result = new ArrayList<>();
        for (Object[] row : rows) {
            LowStockAlertDto dto = new LowStockAlertDto();
            dto.productId = ((Number) row[0]).longValue();
            dto.productName = (String) row[1];
            dto.productSku = (String) row[2];
            dto.quantity = ((Number) row[3]).intValue();
            dto.minimumStock = row[4] != null ? ((Number) row[4]).intValue() : 0;
            result.add(dto);
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    public BudgetSummaryDto getBudgetSummary(int fiscalYear) {
        BudgetSummaryDto dto = new BudgetSummaryDto();

        Object[] result = (Object[]) em.createNativeQuery(
                "SELECT COALESCE(SUM(total_amount), 0), COALESCE(SUM(spent_amount), 0) " +
                "FROM budget WHERE fiscal_year = :year AND status IN ('ACTIVE', 'APPROVED')")
                .setParameter("year", fiscalYear)
                .getSingleResult();

        dto.totalAmount = new BigDecimal(result[0].toString());
        dto.spentAmount = new BigDecimal(result[1].toString());
        dto.utilization = dto.totalAmount.compareTo(BigDecimal.ZERO) > 0
                ? dto.spentAmount.multiply(BigDecimal.valueOf(100))
                        .divide(dto.totalAmount, 0, RoundingMode.HALF_UP).intValue()
                : 0;

        return dto;
    }
}
