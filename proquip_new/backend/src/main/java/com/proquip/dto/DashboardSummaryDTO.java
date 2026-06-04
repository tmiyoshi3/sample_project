package com.proquip.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class DashboardSummaryDTO {

    public long totalProducts;
    public long activeSuppliers;
    public long pendingOrders;
    public long lowStockItems;
    public long pendingApprovals;

    public static class RecentOrderDTO {
        public Long id;
        public String orderNumber;
        public String supplierName;
        public BigDecimal totalAmount;
        public String status;
        public LocalDate orderDate;
    }

    public static class SpendingTrendDTO {
        public String month;
        public BigDecimal amount;
    }

    public static class CategorySpendingDTO {
        public String categoryName;
        public long orderCount;
        public BigDecimal totalAmount;
    }

    public static class LowStockItemDTO {
        public Long id;
        public Long productId;
        public String productName;
        public String productSku;
        public int quantity;
        public int minimumStock;
        public String status;
    }

    public static class BudgetDTO {
        public Long id;
        public String name;
        public BigDecimal totalAmount;
        public BigDecimal usedAmount;
    }
}
