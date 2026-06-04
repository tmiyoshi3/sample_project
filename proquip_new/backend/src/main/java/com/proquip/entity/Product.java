package com.proquip.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "product")
public class Product extends AuditableEntity {

    @Column(name = "sku", unique = true, nullable = false, length = 50)
    private String sku;

    @Column(name = "name", nullable = false, length = 300)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "unit_price", precision = 18, scale = 4)
    private BigDecimal unitPrice;

    @Column(name = "status", length = 30)
    private String status;

    @Column(name = "min_order_qty")
    private Integer minOrderQty;

    @Column(name = "lead_time_days")
    private Integer leadTimeDays;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Integer getMinOrderQty() { return minOrderQty; }
    public void setMinOrderQty(Integer minOrderQty) { this.minOrderQty = minOrderQty; }
    public Integer getLeadTimeDays() { return leadTimeDays; }
    public void setLeadTimeDays(Integer leadTimeDays) { this.leadTimeDays = leadTimeDays; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
}
