package com.proquip.entity.supplier;

import com.proquip.entity.base.BaseEntity;
import com.proquip.entity.product.Product;

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

	@Column(name = "supplier_sku", length = 50)
	private String supplierSku;

	@Column(name = "unit_price", nullable = false, precision = 18, scale = 4)
	private BigDecimal unitCost;

	@Column(name = "lead_time_days")
	private Integer leadTimeDays;

	@Column(name = "min_order_qty")
	private Integer minOrderQty;

	@Column(name = "is_preferred", nullable = false)
	private boolean isPreferred;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "supplier_id", nullable = false)
	private Supplier supplier;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	public String getSupplierSku() {
		return supplierSku;
	}

	public void setSupplierSku(String supplierSku) {
		this.supplierSku = supplierSku;
	}

	public BigDecimal getUnitCost() {
		return unitCost;
	}

	public void setUnitCost(BigDecimal unitCost) {
		this.unitCost = unitCost;
	}

	public Integer getLeadTimeDays() {
		return leadTimeDays;
	}

	public void setLeadTimeDays(Integer leadTimeDays) {
		this.leadTimeDays = leadTimeDays;
	}

	public Integer getMinOrderQty() {
		return minOrderQty;
	}

	public void setMinOrderQty(Integer minOrderQty) {
		this.minOrderQty = minOrderQty;
	}

	public boolean isPreferred() {
		return isPreferred;
	}

	public void setPreferred(boolean preferred) {
		this.isPreferred = preferred;
	}

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}
}
