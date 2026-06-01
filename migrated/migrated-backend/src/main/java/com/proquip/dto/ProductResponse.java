package com.proquip.dto;

import java.math.BigDecimal;

public class ProductResponse {

	private Long id;
	private String sku;
	private String skuCode;
	private String name;
	private String description;
	private Long categoryId;
	private String categoryName;
	private Long manufacturerId;
	private String manufacturerName;
	private BigDecimal unitPrice;
	private String status;
	private Long stockQuantity;
	private String unit;
	private Integer minimumOrderQuantity;
	private Integer leadTimeDays;
	private BigDecimal weight;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSku() {
		return sku;
	}
	public void setSku(String sku) {
		this.sku = sku;
	}
	public String getSkuCode() {
		return skuCode;
	}
	public void setSkuCode(String skuCode) {
		this.skuCode = skuCode;
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
	public Long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public Long getManufacturerId() {
		return manufacturerId;
	}
	public void setManufacturerId(Long manufacturerId) {
		this.manufacturerId = manufacturerId;
	}
	public String getManufacturerName() {
		return manufacturerName;
	}
	public void setManufacturerName(String manufacturerName) {
		this.manufacturerName = manufacturerName;
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
	public Long getStockQuantity() {
		return stockQuantity;
	}
	public void setStockQuantity(Long stockQuantity) {
		this.stockQuantity = stockQuantity;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public Integer getMinimumOrderQuantity() {
		return minimumOrderQuantity;
	}
	public void setMinimumOrderQuantity(Integer minimumOrderQuantity) {
		this.minimumOrderQuantity = minimumOrderQuantity;
	}
	public Integer getLeadTimeDays() {
		return leadTimeDays;
	}
	public void setLeadTimeDays(Integer leadTimeDays) {
		this.leadTimeDays = leadTimeDays;
	}
	public BigDecimal getWeight() {
		return weight;
	}
	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}
}
