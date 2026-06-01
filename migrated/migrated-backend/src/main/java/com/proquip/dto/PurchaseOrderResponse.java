package com.proquip.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class PurchaseOrderResponse {

	private Long id;
	private String orderNumber;
	private String status;
	private Date orderDate;
	private Date expectedDeliveryDate;
	private Long supplierId;
	private String supplierName;
	private BigDecimal totalAmount;
	private String currency;
	private List<PurchaseOrderItemResponse> items;

	public PurchaseOrderResponse() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Date getExpectedDeliveryDate() {
		return expectedDeliveryDate;
	}

	public void setExpectedDeliveryDate(Date expectedDeliveryDate) {
		this.expectedDeliveryDate = expectedDeliveryDate;
	}

	public Long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public BigDecimal getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public List<PurchaseOrderItemResponse> getItems() {
		return items;
	}

	public void setItems(List<PurchaseOrderItemResponse> items) {
		this.items = items;
	}
}
