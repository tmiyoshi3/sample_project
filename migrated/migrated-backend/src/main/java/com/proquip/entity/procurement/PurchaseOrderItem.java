package com.proquip.entity.procurement;

import com.proquip.entity.base.BaseEntity;
import com.proquip.entity.product.Product;

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
@Table(name = "purchase_order_item")
public class PurchaseOrderItem extends BaseEntity {

	@NotNull
	@Column(name = "quantity_ordered", precision = 15, scale = 3, nullable = false)
	private BigDecimal quantity;

	@NotNull
	@Column(name = "unit_price", precision = 15, scale = 2, nullable = false)
	private BigDecimal unitPrice;

	@Column(name = "tax_rate_pct", precision = 5, scale = 4)
	private BigDecimal taxRate;

	@Column(name = "discount_pct", precision = 5, scale = 4)
	private BigDecimal discount;

	@Column(name = "total_price", precision = 18, scale = 2)
	private BigDecimal subtotal;

	@Column(name = "quantity_received", precision = 15, scale = 3)
	private BigDecimal receivedQuantity;

	@Size(max = 30)
	@Column(name = "status", length = 30)
	private String status;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id")
	private PurchaseOrder purchaseOrder;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	private Product product;

	public BigDecimal getQuantity() {
		return quantity;
	}

	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}

	public BigDecimal getTaxRate() {
		return taxRate;
	}

	public void setTaxRate(BigDecimal taxRate) {
		this.taxRate = taxRate;
	}

	public BigDecimal getDiscount() {
		return discount;
	}

	public void setDiscount(BigDecimal discount) {
		this.discount = discount;
	}

	public BigDecimal getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(BigDecimal subtotal) {
		this.subtotal = subtotal;
	}

	public BigDecimal getReceivedQuantity() {
		return receivedQuantity;
	}

	public void setReceivedQuantity(BigDecimal receivedQuantity) {
		this.receivedQuantity = receivedQuantity;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public PurchaseOrder getPurchaseOrder() {
		return purchaseOrder;
	}

	public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
		this.purchaseOrder = purchaseOrder;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}
}
