import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardSummary {
  totalProducts: number;
  activeSuppliers: number;
  pendingOrders: number;
  lowStockItems: number;
  pendingApprovals: number;
}

export interface SpendingTrendItem {
  month: string;
  amount: number;
}

export interface CategorySpendingItem {
  categoryName: string;
  orderCount: number;
  totalAmount: number;
}

export interface PurchaseOrderResponse {
  id: number;
  orderNumber: string;
  status: string;
  orderDate: string;
  expectedDeliveryDate: string;
  supplierId: number;
  supplierName: string;
  totalAmount: number;
  currency: string;
  items: any[];
}

export interface PageResult<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface InventoryAlertItem {
  id: number;
  productId: number;
  productName: string;
  productSku: string;
  quantityOnHand: number;
  minimumStock: number;
  warehouseName: string;
}

export interface BudgetDto {
  id: number;
  departmentId: number;
  departmentName: string;
  fiscalYear: number;
  totalAmount: number;
  usedAmount: number;
  status: string;
}

export interface PurchaseRequisitionDto {
  id: number;
  reqNumber: string;
  requesterName: string;
  departmentName: string;
  totalAmount: number;
  status: string;
  requiredDate: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>('/api/dashboard/summary');
  }

  getSpendingTrend(months: number = 12): Observable<SpendingTrendItem[]> {
    const params = new HttpParams().set('months', months.toString());
    return this.http.get<SpendingTrendItem[]>('/api/dashboard/spending-trend', { params });
  }

  getCategorySpending(): Observable<CategorySpendingItem[]> {
    return this.http.get<CategorySpendingItem[]>('/api/dashboard/category-spending');
  }

  getPurchaseOrders(page: number = 0, size: number = 100): Observable<PageResult<PurchaseOrderResponse>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageResult<PurchaseOrderResponse>>('/api/purchase-orders', { params });
  }

  getLowStockAlerts(): Observable<InventoryAlertItem[]> {
    return this.http.get<InventoryAlertItem[]>('/api/inventory/alerts/low-stock');
  }

  getBudgets(fiscalYear: number = 2026): Observable<BudgetDto[]> {
    const params = new HttpParams().set('fiscalYear', fiscalYear.toString());
    return this.http.get<BudgetDto[]>('/api/budgets', { params });
  }

  getRequisitions(page: number = 0, size: number = 100, status?: string): Observable<PageResult<PurchaseRequisitionDto>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<PageResult<PurchaseRequisitionDto>>('/api/requisitions', { params });
  }
}
