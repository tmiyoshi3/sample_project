package com.proquip.dto;

import java.math.BigDecimal;

public class CategorySpendingItem {

    private String categoryName;
    private long orderCount;
    private BigDecimal totalAmount;

    public CategorySpendingItem() {
    }

    public CategorySpendingItem(String categoryName, long orderCount, BigDecimal totalAmount) {
        this.categoryName = categoryName;
        this.orderCount = orderCount;
        this.totalAmount = totalAmount;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public long getOrderCount() {
        return orderCount;
    }

    public void setOrderCount(long orderCount) {
        this.orderCount = orderCount;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }
}
