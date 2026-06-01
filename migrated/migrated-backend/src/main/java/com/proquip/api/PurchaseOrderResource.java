package com.proquip.api;

import com.proquip.dto.PageResult;
import com.proquip.dto.PurchaseOrderItemResponse;
import com.proquip.dto.PurchaseOrderResponse;
import com.proquip.entity.procurement.PurchaseOrder;
import com.proquip.entity.procurement.PurchaseOrderItem;
import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.jboss.logging.Logger;

@Path("/api/purchase-orders")
@Authenticated
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PurchaseOrderResource {

    private static final Logger LOG = Logger.getLogger(PurchaseOrderResource.class);

    @Inject
    EntityManager em;

    @GET
    @SuppressWarnings("unchecked")
    public PageResult<PurchaseOrderResponse> list(
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("100") int size,
            @QueryParam("status") String status,
            @QueryParam("keyword") String keyword,
            @QueryParam("supplierId") Long supplierId) {
        try {
            StringBuilder jpql = new StringBuilder(
                    "SELECT DISTINCT po FROM PurchaseOrder po "
                    + "LEFT JOIN FETCH po.supplier LEFT JOIN FETCH po.items");
            StringBuilder countJpql = new StringBuilder(
                    "SELECT COUNT(DISTINCT po) FROM PurchaseOrder po");
            StringBuilder whereClause = new StringBuilder();

            List<String> conditions = new ArrayList<>();
            if (status != null && !status.isEmpty()) {
                conditions.add("po.status = :status");
            }
            if (keyword != null && !keyword.isEmpty()) {
                conditions.add("(po.poNumber LIKE :keyword OR po.notes LIKE :keyword)");
            }
            if (supplierId != null) {
                conditions.add("po.supplier.id = :supplierId");
            }

            if (!conditions.isEmpty()) {
                whereClause.append(" WHERE ").append(String.join(" AND ", conditions));
            }

            jpql.append(whereClause).append(" ORDER BY po.orderDate DESC NULLS FIRST, po.id DESC");
            countJpql.append(whereClause);

            TypedQuery<PurchaseOrder> query = em.createQuery(jpql.toString(), PurchaseOrder.class);
            TypedQuery<Long> countQuery = em.createQuery(countJpql.toString(), Long.class);

            if (status != null && !status.isEmpty()) {
                query.setParameter("status", status);
                countQuery.setParameter("status", status);
            }
            if (keyword != null && !keyword.isEmpty()) {
                String likePattern = "%" + keyword + "%";
                query.setParameter("keyword", likePattern);
                countQuery.setParameter("keyword", likePattern);
            }
            if (supplierId != null) {
                query.setParameter("supplierId", supplierId);
                countQuery.setParameter("supplierId", supplierId);
            }

            query.setFirstResult(page * size);
            query.setMaxResults(size);

            List<PurchaseOrder> orders = query.getResultList();
            long totalElements = countQuery.getSingleResult();

            List<PurchaseOrderResponse> content = orders.stream()
                    .map(this::toResponse)
                    .collect(Collectors.toList());

            return new PageResult<>(content, totalElements, page, size);
        } catch (Exception e) {
            LOG.error("Error fetching purchase orders", e);
            return new PageResult<>(Collections.emptyList(), 0, page, size);
        }
    }

    private PurchaseOrderResponse toResponse(PurchaseOrder po) {
        PurchaseOrderResponse resp = new PurchaseOrderResponse();
        resp.setId(po.getId());
        resp.setOrderNumber(po.getPoNumber());
        resp.setStatus(po.getStatus());
        if (po.getOrderDate() != null) {
            resp.setOrderDate(po.getOrderDate());
        } else if (po.getCreatedAt() != null) {
            resp.setOrderDate(Date.from(po.getCreatedAt().atZone(ZoneId.systemDefault()).toInstant()));
        }
        resp.setExpectedDeliveryDate(po.getExpectedDeliveryDate());
        if (po.getSupplier() != null) {
            resp.setSupplierId(po.getSupplier().getId());
            resp.setSupplierName(po.getSupplier().getName());
        }
        resp.setTotalAmount(po.getTotalAmount());
        resp.setCurrency(po.getCurrency());

        if (po.getItems() != null) {
            List<PurchaseOrderItemResponse> itemResponses = po.getItems().stream()
                    .map(this::toItemResponse)
                    .collect(Collectors.toList());
            resp.setItems(itemResponses);
        } else {
            resp.setItems(Collections.emptyList());
        }
        return resp;
    }

    private PurchaseOrderItemResponse toItemResponse(PurchaseOrderItem item) {
        PurchaseOrderItemResponse resp = new PurchaseOrderItemResponse();
        resp.setId(item.getId());
        if (item.getProduct() != null) {
            resp.setProductId(item.getProduct().getId());
            resp.setProductName(item.getProduct().getName());
            resp.setSkuCode(item.getProduct().getSku());
        }
        resp.setQuantity(item.getQuantity() != null ? item.getQuantity().intValue() : 0);
        resp.setReceivedQuantity(item.getReceivedQuantity() != null ? item.getReceivedQuantity().intValue() : 0);
        resp.setUnitPrice(item.getUnitPrice());
        resp.setSubtotal(item.getSubtotal());
        return resp;
    }
}
