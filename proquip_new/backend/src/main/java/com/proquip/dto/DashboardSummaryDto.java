package com.proquip.dto;

import java.math.BigDecimal;
import java.util.List;

public class DashboardSummaryDto {

    public long totalProducts;
    public long activeSuppliers;
    public long pendingOrders;
    public long lowStockItems;
    public long pendingApprovals;

    public static class RecentOrderDto {
        public Long id;
        public String orderNumber;
        public String supplierName;
        public BigDecimal totalAmount;
        public String status;
        public String orderDate;
    }

    public static class SpendingTrendDto {
        public String month;
        public BigDecimal amount;
    }

    public static class CategorySpendingDto {
        public String categoryName;
        public long orderCount;
        public BigDecimal totalAmount;
    }

    public static class LowStockAlertDto {
        public Long productId;
        public String productName;
        public String productSku;
        public int quantity;
        public int minimumStock;
    }

    public static class BudgetSummaryDto {
        public BigDecimal totalAmount;
        public BigDecimal spentAmount;
        public int utilization;
    }
}
