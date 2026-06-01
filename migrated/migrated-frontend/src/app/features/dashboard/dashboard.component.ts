import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  DashboardService,
  DashboardSummary,
  SpendingTrendItem,
  CategorySpendingItem,
  PurchaseOrderResponse,
  InventoryAlertItem,
  BudgetDto,
} from '../../core/services/dashboard.service';

interface CategorySpendingDisplay extends CategorySpendingItem {
  percentage: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isLoading = true;

  // Summary
  totalOrders = 0;
  pendingOrderCount = 0;
  approvedOrderCount = 0;
  lowStockCount = 0;
  pendingApprovals = 0;

  // Budget
  budgetTotal = 0;
  budgetSpent = 0;
  budgetUtilization = 0;

  // Charts
  monthlySpending: SpendingTrendItem[] = [];
  categorySpending: CategorySpendingDisplay[] = [];

  // Tables
  recentOrders: PurchaseOrderResponse[] = [];
  lowStockItems: InventoryAlertItem[] = [];

  private readonly STATUS_LABELS: Record<string, string> = {
    DRAFT: '下書き',
    SUBMITTED: '申請中',
    APPROVED: '承認済み',
    ORDERED: '発注済み',
    REJECTED: '却下',
    CANCELLED: 'キャンセル',
    DELIVERED: '納品済み',
    COMPLETED: '完了',
  };

  private readonly STATUS_CLASSES: Record<string, string> = {
    DRAFT: 'status-draft',
    SUBMITTED: 'status-pending',
    APPROVED: 'status-approved',
    ORDERED: 'status-ordered',
    REJECTED: 'status-rejected',
    CANCELLED: 'status-cancelled',
    DELIVERED: 'status-delivered',
    COMPLETED: 'status-completed',
  };

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.isLoading = true;

    // Load summary
    this.dashboardService.getSummary().subscribe({
      next: (summary) => {
        this.lowStockCount = summary.lowStockItems;
        this.pendingApprovals = summary.pendingApprovals;
      },
      error: () => {},
    });

    // Load spending trend
    this.dashboardService.getSpendingTrend().subscribe({
      next: (data) => {
        this.monthlySpending = data;
      },
      error: () => {
        this.monthlySpending = [];
      },
    });

    // Load category spending
    this.dashboardService.getCategorySpending().subscribe({
      next: (data) => {
        const totalCategorySpending = data.reduce((sum, cat) => sum + cat.totalAmount, 0);
        this.categorySpending = data.map((cat) => ({
          ...cat,
          percentage: totalCategorySpending > 0
            ? Math.round((cat.totalAmount / totalCategorySpending) * 100)
            : 0,
        }));
      },
      error: () => {
        this.categorySpending = [];
      },
    });

    // Load purchase orders
    this.dashboardService.getPurchaseOrders().subscribe({
      next: (result) => {
        this.totalOrders = result.totalElements;
        this.pendingOrderCount = result.content.filter((o) => o.status === 'SUBMITTED').length;
        this.approvedOrderCount = result.content.filter((o) => o.status === 'APPROVED').length;
        this.recentOrders = result.content
          .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
          .slice(0, 10);
      },
      error: () => {
        this.recentOrders = [];
      },
    });

    // Load low stock alerts
    this.dashboardService.getLowStockAlerts().subscribe({
      next: (data) => {
        this.lowStockItems = data;
        this.lowStockCount = data.length;
      },
      error: () => {
        this.lowStockItems = [];
      },
    });

    // Load budgets
    this.dashboardService.getBudgets().subscribe({
      next: (budgets) => {
        this.budgetTotal = budgets.reduce((sum, b) => sum + b.totalAmount, 0);
        this.budgetSpent = budgets.reduce((sum, b) => sum + b.usedAmount, 0);
        this.budgetUtilization = this.budgetTotal > 0
          ? Math.round((this.budgetSpent / this.budgetTotal) * 100)
          : 0;
      },
      error: () => {},
    });

    // Load requisitions (used by current system's dashboard network calls)
    this.dashboardService.getRequisitions(0, 100, 'PENDING_APPROVAL').subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
  }

  formatCurrency(amount: number): string {
    if (amount == null) return '¥0';
    return '¥' + amount.toLocaleString('ja-JP');
  }

  getStatusLabel(status: string): string {
    return this.STATUS_LABELS[status] || status;
  }

  getStatusClass(status: string): string {
    return this.STATUS_CLASSES[status] || 'status-default';
  }

  getBarHeight(amount: number): number {
    if (!this.monthlySpending || this.monthlySpending.length === 0) return 0;
    const maxAmount = Math.max(...this.monthlySpending.map((s) => s.amount));
    if (maxAmount === 0) return 0;
    return Math.round((amount / maxAmount) * 150);
  }

  navigateToOrders(): void {
    this.router.navigate(['/procurement/orders']);
  }

  navigateToOrder(orderId: number): void {
    this.router.navigate(['/procurement/orders', orderId]);
  }

  navigateToInventory(): void {
    this.router.navigate(['/inventory']);
  }

  navigateToTasks(): void {
    this.router.navigate(['/dashboard/tasks']);
  }

  navigateToProduct(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}
