package com.proquip.entity.product;

import com.proquip.entity.base.AuditableEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "product")
public class Product extends AuditableEntity {

	@NotNull
	@Size(max = 50)
	@Column(name = "sku", length = 50, unique = true, nullable = false)
	private String sku;

	@NotNull
	@Size(max = 300)
	@Column(name = "name", length = 300, nullable = false)
	private String name;

	@Column(name = "description", columnDefinition = "TEXT")
	private String description;

	@Column(name = "unit_price", precision = 15, scale = 2, nullable = false)
	private BigDecimal unitPrice = BigDecimal.ZERO;

	@Size(max = 20)
	@Column(name = "status", length = 20, nullable = false)
	private String status = "ACTIVE";

	@Column(name = "min_order_qty", nullable = false)
	private Integer minOrderQty = 1;

	@Column(name = "reorder_point", nullable = false)
	private Integer reorderPoint = 0;

	@Column(name = "reorder_qty", nullable = false)
	private Integer reorderQty = 0;

	@Column(name = "weight_kg", precision = 10, scale = 3)
	private BigDecimal weight;

	@Column(name = "width_mm", precision = 10, scale = 2)
	private BigDecimal width;

	@Column(name = "height_mm", precision = 10, scale = 2)
	private BigDecimal height;

	@Column(name = "depth_mm", precision = 10, scale = 2)
	private BigDecimal depth;

	@Column(name = "lead_time_days", nullable = false)
	private Integer leadTimeDays = 0;

	@Column(name = "notes", columnDefinition = "TEXT")
	private String notes;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;

	@Column(name = "manufacturer_id")
	private Long manufacturerId;

	@Column(name = "unit_id")
	private Long unitId;

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getMinOrderQty() {
		return minOrderQty;
	}

	public void setMinOrderQty(Integer minOrderQty) {
		this.minOrderQty = minOrderQty;
	}

	public Integer getReorderPoint() {
		return reorderPoint;
	}

	public void setReorderPoint(Integer reorderPoint) {
		this.reorderPoint = reorderPoint;
	}

	public Integer getReorderQty() {
		return reorderQty;
	}

	public void setReorderQty(Integer reorderQty) {
		this.reorderQty = reorderQty;
	}

	public BigDecimal getWeight() {
		return weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}

	public BigDecimal getWidth() {
		return width;
	}

	public void setWidth(BigDecimal width) {
		this.width = width;
	}

	public BigDecimal getHeight() {
		return height;
	}

	public void setHeight(BigDecimal height) {
		this.height = height;
	}

	public BigDecimal getDepth() {
		return depth;
	}

	public void setDepth(BigDecimal depth) {
		this.depth = depth;
	}

	public Integer getLeadTimeDays() {
		return leadTimeDays;
	}

	public void setLeadTimeDays(Integer leadTimeDays) {
		this.leadTimeDays = leadTimeDays;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Long getManufacturerId() {
		return manufacturerId;
	}

	public void setManufacturerId(Long manufacturerId) {
		this.manufacturerId = manufacturerId;
	}

	public Long getUnitId() {
		return unitId;
	}

	public void setUnitId(Long unitId) {
		this.unitId = unitId;
	}
}
