package com.proquip.dto;

import java.math.BigDecimal;
import java.util.List;

public class ProductDto {

    public Long id;
    public String sku;
    public String name;
    public String description;
    public Long categoryId;
    public String categoryName;
    public Long manufacturerId;
    public String manufacturerName;
    public BigDecimal unitPrice;
    public String unit;
    public String status;
    public Integer minimumOrderQuantity;
    public Integer leadTimeDays;
    public String createdAt;
    public String updatedAt;
    public int totalStock;
    public String notes;

    public static class ProductDetailDto extends ProductDto {
        public BigDecimal weight;
        public String dimensions;
        public List<SupplierInfo> suppliers;
        public List<InventoryInfo> inventoryItems;
    }

    public static class SupplierInfo {
        public Long supplierId;
        public String supplierName;
        public String supplierSku;
        public BigDecimal unitPrice;
        public Integer leadTimeDays;
        public Boolean isPreferred;
    }

    public static class InventoryInfo {
        public Long warehouseId;
        public String warehouseName;
        public int quantity;
        public int reservedQuantity;
        public int availableQuantity;
    }

    public static class CategoryDto {
        public Long id;
        public String name;
        public String code;
        public String description;
        public Long parentId;
        public int productCount;
    }

    public static class ManufacturerDto {
        public Long id;
        public String name;
        public String country;
    }

    public static class PageResult<T> {
        public List<T> content;
        public long totalElements;
        public int totalPages;
        public int page;
        public int size;
    }
}
