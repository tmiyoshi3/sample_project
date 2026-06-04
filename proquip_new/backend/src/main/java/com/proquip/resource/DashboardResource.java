package com.proquip.resource;

import com.proquip.dto.DashboardSummaryDTO;
import com.proquip.dto.DashboardSummaryDTO.BudgetDTO;
import com.proquip.dto.DashboardSummaryDTO.CategorySpendingDTO;
import com.proquip.dto.DashboardSummaryDTO.LowStockItemDTO;
import com.proquip.dto.DashboardSummaryDTO.RecentOrderDTO;
import com.proquip.dto.DashboardSummaryDTO.SpendingTrendDTO;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Path("/api/dashboard")
@Produces(MediaType.APPLICATION_JSON)
public class DashboardResource {

    @Inject
    EntityManager em;

    @GET
    @Path("/summary")
    public DashboardSummaryDTO getSummary() {
        DashboardSummaryDTO summary = new DashboardSummaryDTO();

        summary.totalProducts = (Long) em.createQuery(
                "SELECT COUNT(p) FROM Product p WHERE p.status = 'ACTIVE'")
                .getSingleResult();

        summary.activeSuppliers = (Long) em.createQuery(
                "SELECT COUNT(s) FROM Supplier s WHERE s.status = 'ACTIVE'")
                .getSingleResult();

        summary.pendingOrders = (Long) em.createQuery(
                "SELECT COUNT(o) FROM PurchaseOrder o WHERE o.status = 'SUBMITTED'")
                .getSingleResult();

        Long pendingReqCount = (Long) em.createQuery(
                "SELECT COUNT(r) FROM PurchaseRequisition r WHERE r.status = 'SUBMITTED'")
                .getSingleResult();
        summary.pendingApprovals = summary.pendingOrders + pendingReqCount;

        summary.lowStockItems = (Long) em.createNativeQuery(
                "SELECT COUNT(*) FROM inventory_item i " +
                "JOIN product p ON i.product_id = p.id " +
                "WHERE i.quantity_on_hand <= p.reorder_point AND p.status = 'ACTIVE'")
                .getSingleResult();

        return summary;
    }

    @GET
    @Path("/recent-orders")
    @SuppressWarnings("unchecked")
    public List<RecentOrderDTO> getRecentOrders() {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT po.id, po.order_number, s.name AS supplier_name, " +
                "po.total_amount, po.status, po.order_date " +
                "FROM purchase_order po " +
                "LEFT JOIN supplier s ON po.supplier_id = s.id " +
                "ORDER BY po.order_date DESC NULLS LAST " +
                "LIMIT 10")
                .getResultList();

        List<RecentOrderDTO> result = new ArrayList<>();
        for (Object[] row : rows) {
            RecentOrderDTO dto = new RecentOrderDTO();
            dto.id = ((Number) row[0]).longValue();
            dto.orderNumber = (String) row[1];
            dto.supplierName = (String) row[2];
            dto.totalAmount = (BigDecimal) row[3];
            dto.status = (String) row[4];
            dto.orderDate = row[5] != null ? ((Date) row[5]).toLocalDate() : null;
            result.add(dto);
        }
        return result;
    }

    @GET
    @Path("/spending-trend")
    @SuppressWarnings("unchecked")
    public List<SpendingTrendDTO> getSpendingTrend(
            @QueryParam("months") @DefaultValue("12") int months) {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT TO_CHAR(o.order_date, 'YYYY-MM') AS month, " +
                "SUM(o.total_amount) AS total " +
                "FROM purchase_order o " +
                "WHERE o.order_date >= CURRENT_DATE - CAST(:months || ' months' AS INTERVAL) " +
                "AND o.status NOT IN ('CANCELLED', 'DRAFT') " +
                "GROUP BY TO_CHAR(o.order_date, 'YYYY-MM') " +
                "ORDER BY 1")
                .setParameter("months", String.valueOf(months))
                .getResultList();

        List<SpendingTrendDTO> result = new ArrayList<>();
        for (Object[] row : rows) {
            SpendingTrendDTO dto = new SpendingTrendDTO();
            dto.month = (String) row[0];
            dto.amount = (BigDecimal) row[1];
            result.add(dto);
        }
        return result;
    }

    @GET
    @Path("/category-spending")
    @SuppressWarnings("unchecked")
    public List<CategorySpendingDTO> getCategorySpending() {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT c.name, COUNT(DISTINCT po.id), SUM(po.total_amount) " +
                "FROM purchase_order po " +
                "JOIN purchase_order_item poi ON poi.order_id = po.id " +
                "JOIN product p ON poi.product_id = p.id " +
                "JOIN category c ON p.category_id = c.id " +
                "WHERE po.status NOT IN ('CANCELLED', 'DRAFT') " +
                "GROUP BY c.name " +
                "ORDER BY SUM(po.total_amount) DESC")
                .getResultList();

        List<CategorySpendingDTO> result = new ArrayList<>();
        for (Object[] row : rows) {
            CategorySpendingDTO dto = new CategorySpendingDTO();
            dto.categoryName = (String) row[0];
            dto.orderCount = ((Number) row[1]).longValue();
            dto.totalAmount = (BigDecimal) row[2];
            result.add(dto);
        }
        return result;
    }

    @GET
    @Path("/low-stock-items")
    @SuppressWarnings("unchecked")
    public List<LowStockItemDTO> getLowStockItems() {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT i.id, p.id, p.name, p.sku, i.quantity_on_hand, p.reorder_point " +
                "FROM inventory_item i " +
                "JOIN product p ON i.product_id = p.id " +
                "WHERE i.quantity_on_hand <= p.reorder_point AND p.status = 'ACTIVE' " +
                "ORDER BY (i.quantity_on_hand::float / GREATEST(p.reorder_point, 1)) ASC " +
                "LIMIT 20")
                .getResultList();

        List<LowStockItemDTO> result = new ArrayList<>();
        for (Object[] row : rows) {
            LowStockItemDTO dto = new LowStockItemDTO();
            dto.id = ((Number) row[0]).longValue();
            dto.productId = ((Number) row[1]).longValue();
            dto.productName = (String) row[2];
            dto.productSku = (String) row[3];
            dto.quantity = ((Number) row[4]).intValue();
            dto.minimumStock = ((Number) row[5]).intValue();
            dto.status = dto.quantity <= dto.minimumStock / 2 ? "CRITICAL" : "WARNING";
            result.add(dto);
        }
        return result;
    }

    @GET
    @Path("/budgets")
    @SuppressWarnings("unchecked")
    public List<BudgetDTO> getBudgets(
            @QueryParam("year") @DefaultValue("2026") int year) {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT b.id, b.name, b.total_amount, b.spent_amount " +
                "FROM budget b " +
                "WHERE b.fiscal_year = :year AND b.status IN ('ACTIVE', 'APPROVED') " +
                "ORDER BY b.name")
                .setParameter("year", year)
                .getResultList();

        List<BudgetDTO> result = new ArrayList<>();
        for (Object[] row : rows) {
            BudgetDTO dto = new BudgetDTO();
            dto.id = ((Number) row[0]).longValue();
            dto.name = (String) row[1];
            dto.totalAmount = (BigDecimal) row[2];
            dto.usedAmount = (BigDecimal) row[3];
            result.add(dto);
        }
        return result;
    }
}
