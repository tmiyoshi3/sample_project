package com.proquip.resource;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Path("/api/products")
@Produces(MediaType.APPLICATION_JSON)
public class ProductResource {

    @Inject
    EntityManager em;

    @GET
    @SuppressWarnings("unchecked")
    public Response listProducts(
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("20") int size,
            @QueryParam("keyword") String keyword,
            @QueryParam("categoryId") Long categoryId,
            @QueryParam("manufacturerId") Long manufacturerId,
            @QueryParam("status") String status) {

        StringBuilder where = new StringBuilder("WHERE 1=1");
        StringBuilder countWhere = new StringBuilder("WHERE 1=1");
        List<Object> params = new ArrayList<>();
        int paramIdx = 1;

        if (keyword != null && !keyword.trim().isEmpty()) {
            String clause = " AND (p.name LIKE ?" + paramIdx + " OR p.sku LIKE ?" + paramIdx + ")";
            where.append(clause);
            countWhere.append(clause);
            params.add("%" + keyword.trim() + "%");
            paramIdx++;
        }
        if (categoryId != null) {
            String clause = " AND p.category_id = ?" + paramIdx;
            where.append(clause);
            countWhere.append(clause);
            params.add(categoryId);
            paramIdx++;
        }
        if (manufacturerId != null) {
            String clause = " AND p.manufacturer_id = ?" + paramIdx;
            where.append(clause);
            countWhere.append(clause);
            params.add(manufacturerId);
            paramIdx++;
        }
        if (status != null && !status.isEmpty()) {
            String clause = " AND p.status = ?" + paramIdx;
            where.append(clause);
            countWhere.append(clause);
            params.add(status);
            paramIdx++;
        }

        String countSql = "SELECT COUNT(*) FROM product p " + countWhere;
        var countQuery = em.createNativeQuery(countSql);
        for (int i = 0; i < params.size(); i++) {
            countQuery.setParameter(i + 1, params.get(i));
        }
        long totalCount = ((Number) countQuery.getSingleResult()).longValue();

        String dataSql = "SELECT p.id, p.sku, p.name, c.name AS category_name, " +
                "m.name AS manufacturer_name, p.unit_price, p.status, " +
                "COALESCE((SELECT SUM(ii.quantity_on_hand) FROM inventory_item ii WHERE ii.product_id = p.id), 0) AS stock_qty, " +
                "p.category_id, p.manufacturer_id " +
                "FROM product p " +
                "LEFT JOIN category c ON p.category_id = c.id " +
                "LEFT JOIN manufacturer m ON p.manufacturer_id = m.id " +
                where + " ORDER BY p.name ASC LIMIT " + size + " OFFSET " + (page * size);

        var dataQuery = em.createNativeQuery(dataSql);
        for (int i = 0; i < params.size(); i++) {
            dataQuery.setParameter(i + 1, params.get(i));
        }

        List<Object[]> rows = dataQuery.getResultList();
        List<Map<String, Object>> content = new ArrayList<>();
        for (Object[] row : rows) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("id", ((Number) row[0]).longValue());
            item.put("sku", row[1]);
            item.put("name", row[2]);
            item.put("categoryName", row[3]);
            item.put("manufacturerName", row[4]);
            item.put("unitPrice", row[5]);
            item.put("status", row[6]);
            item.put("stockQuantity", ((Number) row[7]).intValue());
            item.put("categoryId", row[8] != null ? ((Number) row[8]).longValue() : null);
            item.put("manufacturerId", row[9] != null ? ((Number) row[9]).longValue() : null);
            content.add(item);
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("content", content);
        result.put("totalElements", totalCount);
        result.put("page", page);
        result.put("size", size);
        result.put("totalPages", (totalCount + size - 1) / size);

        return Response.ok(result).build();
    }

    @GET
    @Path("/{id}")
    @SuppressWarnings("unchecked")
    public Response getProduct(@PathParam("id") Long id) {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT p.id, p.sku, p.name, p.description, " +
                "c.name AS category_name, m.name AS manufacturer_name, " +
                "p.unit_price, p.status, u.name AS unit_name, " +
                "p.min_order_qty, p.lead_time_days, p.weight_kg, " +
                "p.width_mm, p.height_mm, p.depth_mm, p.notes, " +
                "p.created_at, p.updated_at, p.reorder_point, p.reorder_qty, " +
                "p.category_id, p.manufacturer_id, p.model_number, p.barcode " +
                "FROM product p " +
                "LEFT JOIN category c ON p.category_id = c.id " +
                "LEFT JOIN manufacturer m ON p.manufacturer_id = m.id " +
                "LEFT JOIN unit_of_measure u ON p.unit_id = u.id " +
                "WHERE p.id = ?1")
                .setParameter(1, id)
                .getResultList();

        if (rows.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(Map.of("error", "商品が見つかりません。ID=" + id)).build();
        }

        Object[] row = rows.get(0);
        Map<String, Object> product = new LinkedHashMap<>();
        product.put("id", ((Number) row[0]).longValue());
        product.put("sku", row[1]);
        product.put("name", row[2]);
        product.put("description", row[3]);
        product.put("categoryName", row[4]);
        product.put("manufacturerName", row[5]);
        product.put("unitPrice", row[6]);
        product.put("status", row[7]);
        product.put("unit", row[8]);
        product.put("minimumOrderQuantity", row[9] != null ? ((Number) row[9]).intValue() : 1);
        product.put("leadTimeDays", row[10] != null ? ((Number) row[10]).intValue() : 0);
        product.put("weight", row[11]);
        String dimensions = null;
        if (row[12] != null && row[13] != null && row[14] != null) {
            dimensions = row[12] + " x " + row[13] + " x " + row[14] + " mm";
        }
        product.put("dimensions", dimensions);
        product.put("notes", row[15]);
        product.put("createdAt", row[16] != null ? row[16].toString() : null);
        product.put("updatedAt", row[17] != null ? row[17].toString() : null);
        product.put("reorderPoint", row[18] != null ? ((Number) row[18]).intValue() : 0);
        product.put("reorderQty", row[19] != null ? ((Number) row[19]).intValue() : 0);
        product.put("categoryId", row[20] != null ? ((Number) row[20]).longValue() : null);
        product.put("manufacturerId", row[21] != null ? ((Number) row[21]).longValue() : null);
        product.put("modelNumber", row[22]);
        product.put("barcode", row[23]);

        // Specifications
        List<Object[]> specRows = em.createNativeQuery(
                "SELECT spec_name, spec_value, spec_unit FROM product_specification WHERE product_id = ?1 ORDER BY sort_order")
                .setParameter(1, id).getResultList();
        List<Map<String, String>> specs = new ArrayList<>();
        for (Object[] sr : specRows) {
            Map<String, String> spec = new LinkedHashMap<>();
            spec.put("key", (String) sr[0]);
            String val = (String) sr[1];
            if (sr[2] != null && !((String) sr[2]).isEmpty()) val += " " + sr[2];
            spec.put("value", val);
            specs.add(spec);
        }
        product.put("specifications", specs);

        // Images
        List<Object[]> imgRows = em.createNativeQuery(
                "SELECT id, image_url, alt_text, is_primary FROM product_image WHERE product_id = ?1 ORDER BY sort_order")
                .setParameter(1, id).getResultList();
        List<Map<String, Object>> images = new ArrayList<>();
        for (Object[] ir : imgRows) {
            Map<String, Object> img = new LinkedHashMap<>();
            img.put("id", ((Number) ir[0]).longValue());
            img.put("url", ir[1]);
            img.put("altText", ir[2]);
            img.put("isPrimary", ir[3]);
            images.add(img);
        }
        product.put("images", images);

        // Inventory
        List<Object[]> invRows = em.createNativeQuery(
                "SELECT w.name, ii.quantity_on_hand, ii.quantity_reserved " +
                "FROM inventory_item ii JOIN warehouse w ON ii.warehouse_id = w.id " +
                "WHERE ii.product_id = ?1 ORDER BY w.name")
                .setParameter(1, id).getResultList();
        List<Map<String, Object>> inventory = new ArrayList<>();
        for (Object[] ir : invRows) {
            Map<String, Object> inv = new LinkedHashMap<>();
            inv.put("warehouseName", ir[0]);
            int qty = ((Number) ir[1]).intValue();
            int reserved = ((Number) ir[2]).intValue();
            inv.put("quantity", qty);
            inv.put("reservedQuantity", reserved);
            inv.put("availableQuantity", qty - reserved);
            inventory.add(inv);
        }
        product.put("inventoryItems", inventory);

        // Suppliers
        List<Object[]> supRows = em.createNativeQuery(
                "SELECT s.id, s.name, sp.supplier_sku, sp.unit_price, sp.lead_time_days, sp.is_preferred " +
                "FROM supplier_product sp JOIN supplier s ON sp.supplier_id = s.id " +
                "WHERE sp.product_id = ?1 ORDER BY sp.is_preferred DESC, s.name")
                .setParameter(1, id).getResultList();
        List<Map<String, Object>> suppliers = new ArrayList<>();
        for (Object[] sr : supRows) {
            Map<String, Object> sup = new LinkedHashMap<>();
            sup.put("supplierId", ((Number) sr[0]).longValue());
            sup.put("supplierName", sr[1]);
            sup.put("supplierSku", sr[2]);
            sup.put("unitPrice", sr[3]);
            sup.put("leadTimeDays", sr[4] != null ? ((Number) sr[4]).intValue() : 0);
            sup.put("isPreferred", sr[5]);
            suppliers.add(sup);
        }
        product.put("suppliers", suppliers);

        // Change log
        List<Object[]> logRows = em.createNativeQuery(
                "SELECT cl.id, cl.change_type, cl.field_name, cl.old_value, cl.new_value, cl.created_at, " +
                "COALESCE(u.last_name || u.first_name, '-') " +
                "FROM product_change_log cl LEFT JOIN user_profile u ON cl.changed_by = u.id " +
                "WHERE cl.product_id = ?1 ORDER BY cl.created_at DESC LIMIT 50")
                .setParameter(1, id).getResultList();
        List<Map<String, Object>> changeLog = new ArrayList<>();
        for (Object[] lr : logRows) {
            Map<String, Object> entry = new LinkedHashMap<>();
            entry.put("id", ((Number) lr[0]).longValue());
            entry.put("changeType", lr[1]);
            entry.put("field", lr[2]);
            entry.put("oldValue", lr[3]);
            entry.put("newValue", lr[4]);
            entry.put("changedAt", lr[5] != null ? lr[5].toString() : null);
            entry.put("changedBy", lr[6]);
            changeLog.add(entry);
        }
        product.put("changeLog", changeLog);

        return Response.ok(product).build();
    }

    @GET
    @Path("/categories")
    @SuppressWarnings("unchecked")
    public Response listCategories() {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT c.id, c.category_code, c.name, c.description, c.parent_id, " +
                "COALESCE((SELECT COUNT(*) FROM product p WHERE p.category_id = c.id), 0) AS product_count " +
                "FROM category c ORDER BY c.name")
                .getResultList();

        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] row : rows) {
            Map<String, Object> cat = new LinkedHashMap<>();
            cat.put("id", ((Number) row[0]).longValue());
            cat.put("code", row[1]);
            cat.put("name", row[2]);
            cat.put("description", row[3] != null ? row[3] : "");
            cat.put("parentId", row[4] != null ? ((Number) row[4]).longValue() : null);
            cat.put("productCount", ((Number) row[5]).longValue());
            result.add(cat);
        }

        return Response.ok(result).build();
    }

    @GET
    @Path("/manufacturers")
    @SuppressWarnings("unchecked")
    public Response listManufacturers() {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT m.id, m.manufacturer_code, m.name, m.country, m.website " +
                "FROM manufacturer m WHERE m.is_active = true ORDER BY m.name")
                .getResultList();

        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] row : rows) {
            Map<String, Object> mfr = new LinkedHashMap<>();
            mfr.put("id", ((Number) row[0]).longValue());
            mfr.put("code", row[1]);
            mfr.put("name", row[2]);
            mfr.put("country", row[3]);
            mfr.put("website", row[4]);
            result.add(mfr);
        }

        return Response.ok(result).build();
    }
}
