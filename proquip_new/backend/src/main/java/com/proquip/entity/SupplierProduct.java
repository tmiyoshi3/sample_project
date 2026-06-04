package com.proquip.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "supplier_product")
public class SupplierProduct extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "supplier_sku", length = 100)
    private String supplierSku;

    @Column(name = "unit_price", precision = 18, scale = 4)
    private BigDecimal unitPrice;

    @Column(name = "lead_time_days")
    private Integer leadTimeDays;

    @Column(name = "is_preferred")
    private Boolean isPreferred;

    @Column(name = "minimum_order_quantity")
    private Integer minimumOrderQuantity;

    public Supplier getSupplier() { return supplier; }
    public void setSupplier(Supplier supplier) { this.supplier = supplier; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public String getSupplierSku() { return supplierSku; }
    public void setSupplierSku(String supplierSku) { this.supplierSku = supplierSku; }
    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }
    public Integer getLeadTimeDays() { return leadTimeDays; }
    public void setLeadTimeDays(Integer leadTimeDays) { this.leadTimeDays = leadTimeDays; }
    public Boolean getIsPreferred() { return isPreferred; }
    public void setIsPreferred(Boolean isPreferred) { this.isPreferred = isPreferred; }
    public Integer getMinimumOrderQuantity() { return minimumOrderQuantity; }
    public void setMinimumOrderQuantity(Integer minimumOrderQuantity) { this.minimumOrderQuantity = minimumOrderQuantity; }
}
