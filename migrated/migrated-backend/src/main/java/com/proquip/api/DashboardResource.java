package com.proquip.api;

import com.proquip.dto.CategorySpendingItem;
import com.proquip.dto.DashboardSummaryDto;
import com.proquip.dto.SpendingTrendItem;
import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import org.jboss.logging.Logger;

@Path("/api/dashboard")
@Authenticated
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DashboardResource {

    private static final Logger LOG = Logger.getLogger(DashboardResource.class);

    @Inject
    EntityManager em;

    @GET
    @Path("/summary")
    public DashboardSummaryDto getSummary() {
        DashboardSummaryDto dto = new DashboardSummaryDto();
        try {
            long totalProducts = em.createQuery(
                    "SELECT COUNT(p) FROM Product p WHERE p.status = 'ACTIVE'", Long.class)
                    .getSingleResult();
            dto.setTotalProducts(totalProducts);

            long activeSuppliers = em.createQuery(
                    "SELECT COUNT(s) FROM Supplier s WHERE s.status = 'ACTIVE'", Long.class)
                    .getSingleResult();
            dto.setActiveSuppliers(activeSuppliers);

            long pendingOrders = em.createQuery(
                    "SELECT COUNT(o) FROM PurchaseOrder o WHERE o.status = 'SUBMITTED'", Long.class)
                    .getSingleResult();
            dto.setPendingOrders(pendingOrders);

            // Existing system calls getLowStockItems(null) which returns empty list
            dto.setLowStockItems(0);

            long pendingRequisitions = em.createQuery(
                    "SELECT COUNT(r) FROM PurchaseRequisition r WHERE r.status = 'SUBMITTED'", Long.class)
                    .getSingleResult();
            dto.setPendingApprovals(pendingOrders + pendingRequisitions);
        } catch (Exception e) {
            LOG.error("Error fetching dashboard summary", e);
            // Return empty/zero data to match existing system behavior
        }
        return dto;
    }

    @GET
    @Path("/spending-trend")
    @SuppressWarnings("unchecked")
    public List<SpendingTrendItem> getSpendingTrend(
            @QueryParam("months") @DefaultValue("12") int months) {
        try {
            List<Object[]> results = em.createNativeQuery(
                    "SELECT TO_CHAR(o.order_date, 'YYYY-MM') as month, SUM(o.total_amount) as total "
                    + "FROM public.purchase_order o "
                    + "WHERE o.order_date >= CURRENT_DATE - CAST(:months AS INTEGER) * INTERVAL '1 month' "
                    + "AND o.status NOT IN ('CANCELLED', 'DRAFT') "
                    + "GROUP BY TO_CHAR(o.order_date, 'YYYY-MM') ORDER BY 1")
                    .setParameter("months", months)
                    .getResultList();

            List<SpendingTrendItem> items = new ArrayList<>();
            for (Object[] row : results) {
                String month = (String) row[0];
                BigDecimal amount = row[1] != null ? new BigDecimal(row[1].toString()) : BigDecimal.ZERO;
                items.add(new SpendingTrendItem(month, amount));
            }
            return items;
        } catch (Exception e) {
            LOG.error("Error fetching spending trend", e);
            return new ArrayList<>();
        }
    }

    @GET
    @Path("/category-spending")
    @SuppressWarnings("unchecked")
    public List<CategorySpendingItem> getCategorySpending() {
        try {
            List<Object[]> results = em.createQuery(
                    "SELECT c.name, COUNT(DISTINCT o.id), SUM(o.totalAmount) "
                    + "FROM PurchaseOrder o JOIN o.items oi JOIN oi.product p JOIN p.category c "
                    + "WHERE o.status NOT IN ('CANCELLED', 'DRAFT') "
                    + "GROUP BY c.name ORDER BY SUM(o.totalAmount) DESC")
                    .getResultList();

            List<CategorySpendingItem> items = new ArrayList<>();
            for (Object[] row : results) {
                String categoryName = (String) row[0];
                long orderCount = ((Number) row[1]).longValue();
                BigDecimal totalAmount = row[2] != null ? new BigDecimal(row[2].toString()) : BigDecimal.ZERO;
                items.add(new CategorySpendingItem(categoryName, orderCount, totalAmount));
            }
            return items;
        } catch (Exception e) {
            LOG.error("Error fetching category spending", e);
            return new ArrayList<>();
        }
    }
}
