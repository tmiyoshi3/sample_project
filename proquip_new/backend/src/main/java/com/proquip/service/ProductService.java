package com.proquip.service;

import com.proquip.dto.ProductDto;
import com.proquip.dto.ProductDto.CategoryDto;
import com.proquip.dto.ProductDto.InventoryInfo;
import com.proquip.dto.ProductDto.ManufacturerDto;
import com.proquip.dto.ProductDto.PageResult;
import com.proquip.dto.ProductDto.ProductDetailDto;
import com.proquip.dto.ProductDto.SupplierInfo;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class ProductService {

    @Inject
    EntityManager em;

    @SuppressWarnings("unchecked")
    public PageResult<ProductDto> listProducts(String keyword, Long categoryId, Long manufacturerId,
                                                String status, int page, int size, String sort) {
        StringBuilder where = new StringBuilder("WHERE 1=1 ");
        List<Object> params = new ArrayList<>();
        int paramIdx = 1;

        if (keyword != null && !keyword.isBlank()) {
            where.append("AND (LOWER(p.name) LIKE LOWER(?" + paramIdx + ") OR LOWER(p.sku) LIKE LOWER(?" + (paramIdx + 1) + ")) ");
            params.add("%" + keyword + "%");
            params.add("%" + keyword + "%");
            paramIdx += 2;
        }
        if (categoryId != null) {
            where.append("AND p.category_id = ?" + paramIdx + " ");
            params.add(categoryId);
            paramIdx++;
        }
        if (manufacturerId != null) {
            where.append("AND p.manufacturer_id = ?" + paramIdx + " ");
            params.add(manufacturerId);
            paramIdx++;
        }
        if (status != null && !status.isBlank()) {
            where.append("AND p.status = ?" + paramIdx + " ");
            params.add(status);
            paramIdx++;
        }

        String orderBy = "ORDER BY p.name ASC";
        if (sort != null && !sort.isBlank()) {
            String[] parts = sort.split(",");
            String col = switch (parts[0]) {
                case "sku" -> "p.sku";
                case "name" -> "p.name";
                case "unitPrice" -> "p.unit_price";
                case "status" -> "p.status";
                case "categoryName" -> "c.name";
                default -> "p.name";
            };
            String dir = parts.length > 1 && "desc".equalsIgnoreCase(parts[1]) ? "DESC" : "ASC";
            orderBy = "ORDER BY " + col + " " + dir;
        }

        String countSql = "SELECT COUNT(*) FROM product p " + where;
        Query countQuery = em.createNativeQuery(countSql);
        for (int i = 0; i < params.size(); i++) countQuery.setParameter(i + 1, params.get(i));
        long total = ((Number) countQuery.getSingleResult()).longValue();

        String dataSql = "SELECT p.id, p.sku, p.name, p.unit_price, p.status, p.min_order_qty, " +
                "p.lead_time_days, c.name as cat_name, c.id as cat_id, m.name as mfr_name, m.id as mfr_id, " +
                "u.symbol, p.created_at, p.updated_at, " +
                "COALESCE((SELECT SUM(ii.quantity_on_hand) FROM inventory_item ii WHERE ii.product_id = p.id), 0) as total_stock " +
                "FROM product p " +
                "LEFT JOIN category c ON c.id = p.category_id " +
                "LEFT JOIN manufacturer m ON m.id = p.manufacturer_id " +
                "LEFT JOIN unit_of_measure u ON u.id = p.unit_id " +
                where + orderBy;
        Query dataQuery = em.createNativeQuery(dataSql);
        for (int i = 0; i < params.size(); i++) dataQuery.setParameter(i + 1, params.get(i));
        dataQuery.setFirstResult(page * size);
        dataQuery.setMaxResults(size);

        List<Object[]> rows = dataQuery.getResultList();
        List<ProductDto> products = new ArrayList<>();
        for (Object[] r : rows) {
            ProductDto dto = new ProductDto();
            dto.id = ((Number) r[0]).longValue();
            dto.sku = (String) r[1];
            dto.name = (String) r[2];
            dto.unitPrice = r[3] != null ? new BigDecimal(r[3].toString()) : null;
            dto.status = (String) r[4];
            dto.minimumOrderQuantity = r[5] != null ? ((Number) r[5]).intValue() : null;
            dto.leadTimeDays = r[6] != null ? ((Number) r[6]).intValue() : null;
            dto.categoryName = (String) r[7];
            dto.categoryId = r[8] != null ? ((Number) r[8]).longValue() : null;
            dto.manufacturerName = (String) r[9];
            dto.manufacturerId = r[10] != null ? ((Number) r[10]).longValue() : null;
            dto.unit = (String) r[11];
            dto.createdAt = r[12] != null ? r[12].toString() : null;
            dto.updatedAt = r[13] != null ? r[13].toString() : null;
            dto.totalStock = ((Number) r[14]).intValue();
            products.add(dto);
        }

        PageResult<ProductDto> result = new PageResult<>();
        result.content = products;
        result.totalElements = total;
        result.totalPages = (int) Math.ceil((double) total / size);
        result.page = page;
        result.size = size;
        return result;
    }

    @SuppressWarnings("unchecked")
    public ProductDetailDto getProductDetail(Long id) {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT p.id, p.sku, p.name, p.description, p.unit_price, p.status, " +
                "p.min_order_qty, p.lead_time_days, p.notes, p.weight_kg, " +
                "p.width_mm, p.height_mm, p.depth_mm, " +
                "c.name, c.id, m.name, m.id, u.symbol, p.created_at, p.updated_at " +
                "FROM product p " +
                "LEFT JOIN category c ON c.id = p.category_id " +
                "LEFT JOIN manufacturer m ON m.id = p.manufacturer_id " +
                "LEFT JOIN unit_of_measure u ON u.id = p.unit_id " +
                "WHERE p.id = ?1")
                .setParameter(1, id)
                .getResultList();

        if (rows.isEmpty()) return null;
        Object[] r = rows.get(0);

        ProductDetailDto dto = new ProductDetailDto();
        dto.id = ((Number) r[0]).longValue();
        dto.sku = (String) r[1];
        dto.name = (String) r[2];
        dto.description = (String) r[3];
        dto.unitPrice = r[4] != null ? new BigDecimal(r[4].toString()) : null;
        dto.status = (String) r[5];
        dto.minimumOrderQuantity = r[6] != null ? ((Number) r[6]).intValue() : null;
        dto.leadTimeDays = r[7] != null ? ((Number) r[7]).intValue() : null;
        dto.notes = (String) r[8];
        dto.weight = r[9] != null ? new BigDecimal(r[9].toString()) : null;
        BigDecimal w = r[10] != null ? new BigDecimal(r[10].toString()) : null;
        BigDecimal h = r[11] != null ? new BigDecimal(r[11].toString()) : null;
        BigDecimal d = r[12] != null ? new BigDecimal(r[12].toString()) : null;
        if (w != null && h != null && d != null) {
            dto.dimensions = w + " x " + h + " x " + d + " mm";
        }
        dto.categoryName = (String) r[13];
        dto.categoryId = r[14] != null ? ((Number) r[14]).longValue() : null;
        dto.manufacturerName = (String) r[15];
        dto.manufacturerId = r[16] != null ? ((Number) r[16]).longValue() : null;
        dto.unit = (String) r[17];
        dto.createdAt = r[18] != null ? r[18].toString() : null;
        dto.updatedAt = r[19] != null ? r[19].toString() : null;

        dto.suppliers = getProductSuppliers(id);
        dto.inventoryItems = getProductInventory(id);

        return dto;
    }

    @SuppressWarnings("unchecked")
    private List<SupplierInfo> getProductSuppliers(Long productId) {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT s.id, s.name, sp.supplier_sku, sp.unit_price, sp.lead_time_days, sp.is_preferred " +
                "FROM supplier_product sp " +
                "JOIN supplier s ON s.id = sp.supplier_id " +
                "WHERE sp.product_id = ?1 " +
                "ORDER BY sp.is_preferred DESC NULLS LAST, s.name")
                .setParameter(1, productId)
                .getResultList();

        List<SupplierInfo> result = new ArrayList<>();
        for (Object[] r : rows) {
            SupplierInfo info = new SupplierInfo();
            info.supplierId = ((Number) r[0]).longValue();
            info.supplierName = (String) r[1];
            info.supplierSku = (String) r[2];
            info.unitPrice = r[3] != null ? new BigDecimal(r[3].toString()) : null;
            info.leadTimeDays = r[4] != null ? ((Number) r[4]).intValue() : null;
            info.isPreferred = r[5] != null ? (Boolean) r[5] : false;
            result.add(info);
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    private List<InventoryInfo> getProductInventory(Long productId) {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT w.id, w.name, ii.quantity_on_hand, ii.quantity_reserved, " +
                "(ii.quantity_on_hand - ii.quantity_reserved) as available " +
                "FROM inventory_item ii " +
                "JOIN warehouse w ON w.id = ii.warehouse_id " +
                "WHERE ii.product_id = ?1 " +
                "ORDER BY w.name")
                .setParameter(1, productId)
                .getResultList();

        List<InventoryInfo> result = new ArrayList<>();
        for (Object[] r : rows) {
            InventoryInfo info = new InventoryInfo();
            info.warehouseId = ((Number) r[0]).longValue();
            info.warehouseName = (String) r[1];
            info.quantity = ((Number) r[2]).intValue();
            info.reservedQuantity = ((Number) r[3]).intValue();
            info.availableQuantity = ((Number) r[4]).intValue();
            result.add(info);
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    public List<CategoryDto> listCategories() {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT c.id, c.name, c.category_code, c.description, c.parent_id, " +
                "(SELECT COUNT(*) FROM product p WHERE p.category_id = c.id AND p.status = 'ACTIVE') " +
                "FROM category c ORDER BY c.level, c.name")
                .getResultList();

        List<CategoryDto> result = new ArrayList<>();
        for (Object[] r : rows) {
            CategoryDto dto = new CategoryDto();
            dto.id = ((Number) r[0]).longValue();
            dto.name = (String) r[1];
            dto.code = (String) r[2];
            dto.description = (String) r[3];
            dto.parentId = r[4] != null ? ((Number) r[4]).longValue() : null;
            dto.productCount = ((Number) r[5]).intValue();
            result.add(dto);
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    public List<ManufacturerDto> listManufacturers() {
        List<Object[]> rows = em.createNativeQuery(
                "SELECT id, name, country FROM manufacturer ORDER BY name")
                .getResultList();

        List<ManufacturerDto> result = new ArrayList<>();
        for (Object[] r : rows) {
            ManufacturerDto dto = new ManufacturerDto();
            dto.id = ((Number) r[0]).longValue();
            dto.name = (String) r[1];
            dto.country = (String) r[2];
            result.add(dto);
        }
        return result;
    }

    @Transactional
    public ProductDto createProduct(ProductDto input) {
        em.createNativeQuery(
                "INSERT INTO product (sku, name, description, unit_price, status, min_order_qty, " +
                "lead_time_days, category_id, manufacturer_id, notes, created_at, updated_at, version) " +
                "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, NOW(), NOW(), 0)")
                .setParameter(1, input.sku)
                .setParameter(2, input.name)
                .setParameter(3, input.description)
                .setParameter(4, input.unitPrice)
                .setParameter(5, input.status != null ? input.status : "ACTIVE")
                .setParameter(6, input.minimumOrderQuantity)
                .setParameter(7, input.leadTimeDays)
                .setParameter(8, input.categoryId)
                .setParameter(9, input.manufacturerId)
                .setParameter(10, input.notes)
                .executeUpdate();

        Number id = (Number) em.createNativeQuery("SELECT currval('product_id_seq')").getSingleResult();
        input.id = id.longValue();
        return input;
    }

    @Transactional
    public ProductDto updateProduct(Long id, ProductDto input) {
        em.createNativeQuery(
                "UPDATE product SET name = ?1, description = ?2, unit_price = ?3, status = ?4, " +
                "min_order_qty = ?5, lead_time_days = ?6, category_id = ?7, manufacturer_id = ?8, " +
                "notes = ?9, updated_at = NOW(), version = version + 1 WHERE id = ?10")
                .setParameter(1, input.name)
                .setParameter(2, input.description)
                .setParameter(3, input.unitPrice)
                .setParameter(4, input.status)
                .setParameter(5, input.minimumOrderQuantity)
                .setParameter(6, input.leadTimeDays)
                .setParameter(7, input.categoryId)
                .setParameter(8, input.manufacturerId)
                .setParameter(9, input.notes)
                .setParameter(10, id)
                .executeUpdate();
        input.id = id;
        return input;
    }

    @Transactional
    public void deleteProduct(Long id) {
        em.createNativeQuery("UPDATE product SET status = 'DISCONTINUED', updated_at = NOW() WHERE id = ?1")
                .setParameter(1, id)
                .executeUpdate();
    }

    public boolean isSkuTaken(String sku, Long excludeId) {
        String sql = "SELECT COUNT(*) FROM product WHERE sku = ?1";
        if (excludeId != null) sql += " AND id != ?2";
        Query q = em.createNativeQuery(sql).setParameter(1, sku);
        if (excludeId != null) q.setParameter(2, excludeId);
        return ((Number) q.getSingleResult()).intValue() > 0;
    }
}
