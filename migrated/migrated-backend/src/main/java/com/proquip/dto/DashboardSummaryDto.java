package com.proquip.dto;

public class DashboardSummaryDto {

	private long totalProducts;
	private long activeSuppliers;
	private long pendingOrders;
	private long lowStockItems;
	private long pendingApprovals;

	public DashboardSummaryDto() {
	}

	public long getTotalProducts() {
		return totalProducts;
	}

	public void setTotalProducts(long totalProducts) {
		this.totalProducts = totalProducts;
	}

	public long getActiveSuppliers() {
		return activeSuppliers;
	}

	public void setActiveSuppliers(long activeSuppliers) {
		this.activeSuppliers = activeSuppliers;
	}

	public long getPendingOrders() {
		return pendingOrders;
	}

	public void setPendingOrders(long pendingOrders) {
		this.pendingOrders = pendingOrders;
	}

	public long getLowStockItems() {
		return lowStockItems;
	}

	public void setLowStockItems(long lowStockItems) {
		this.lowStockItems = lowStockItems;
	}

	public long getPendingApprovals() {
		return pendingApprovals;
	}

	public void setPendingApprovals(long pendingApprovals) {
		this.pendingApprovals = pendingApprovals;
	}
}
