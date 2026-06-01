import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import {
  CategoryResponse,
  ManufacturerOption,
  PageResult,
  ProductResponse,
  STATUS_LABELS,
  STATUS_OPTIONS,
} from '../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: ProductResponse[] = [];
  categories: CategoryResponse[] = [];
  manufacturers: ManufacturerOption[] = [];
  statusOptions = STATUS_OPTIONS;

  keyword = '';
  selectedCategoryId: number | null = null;
  selectedManufacturerId: number | null = null;
  selectedStatus = '';

  currentPage = 0;
  pageSize = 20;
  totalElements = 0;
  totalPages = 0;

  sortColumn = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  loading = false;

  readonly columnHeaders = [
    'SKU',
    '製品名',
    'カテゴリ',
    'メーカー',
    '単価',
    'ステータス',
    '在庫数',
  ];
  readonly sortableColumns: Record<string, string> = {
    SKU: 'sku',
    製品名: 'name',
    カテゴリ: 'categoryName',
    メーカー: 'manufacturerName',
    単価: 'unitPrice',
    ステータス: 'status',
  };

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadManufacturers();
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService
      .getProducts({
        page: this.currentPage,
        size: this.pageSize,
        keyword: this.keyword || undefined,
        categoryId: this.selectedCategoryId ?? undefined,
        manufacturerId: this.selectedManufacturerId ?? undefined,
        status: this.selectedStatus || undefined,
        sort: `${this.sortColumn},${this.sortDirection}`,
      })
      .subscribe({
        next: (result: PageResult<ProductResponse>) => {
          this.products = result.content;
          this.totalElements = result.totalElements;
          this.totalPages = result.totalPages;
          this.currentPage = result.number;
          this.loading = false;
        },
        error: () => {
          this.products = [];
          this.totalElements = 0;
          this.totalPages = 0;
          this.loading = false;
        },
      });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => (this.categories = categories),
    });
  }

  loadManufacturers(): void {
    this.productService.getManufacturers().subscribe({
      next: (manufacturers) => (this.manufacturers = manufacturers),
    });
  }

  onSearchChange(): void {
    this.currentPage = 0;
    this.loadProducts();
  }

  onClearSearch(): void {
    this.keyword = '';
    this.currentPage = 0;
    this.loadProducts();
  }

  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategoryId = value ? Number(value) : null;
    this.currentPage = 0;
    this.loadProducts();
  }

  onManufacturerChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedManufacturerId = value ? Number(value) : null;
    this.currentPage = 0;
    this.loadProducts();
  }

  onStatusChange(event: Event): void {
    this.selectedStatus = (event.target as HTMLSelectElement).value;
    this.currentPage = 0;
    this.loadProducts();
  }

  resetFilters(): void {
    this.keyword = '';
    this.selectedCategoryId = null;
    this.selectedManufacturerId = null;
    this.selectedStatus = '';
    this.currentPage = 0;
    this.loadProducts();
  }

  get isFilterActive(): boolean {
    return !!(
      this.keyword ||
      this.selectedCategoryId ||
      this.selectedManufacturerId ||
      this.selectedStatus
    );
  }

  onSortChange(headerLabel: string): void {
    const column = this.sortableColumns[headerLabel];
    if (!column) return;
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.loadProducts();
  }

  getSortIcon(headerLabel: string): string {
    const column = this.sortableColumns[headerLabel];
    if (!column || this.sortColumn !== column) return '';
    return this.sortDirection === 'asc' ? '▲' : '▼';
  }

  isSortable(headerLabel: string): boolean {
    return !!this.sortableColumns[headerLabel];
  }

  onPageChange(page: number): void {
    if (page < 0 || page >= this.totalPages) return;
    this.currentPage = page;
    this.loadProducts();
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get startItem(): number {
    return this.currentPage * this.pageSize + 1;
  }

  get endItem(): number {
    return Math.min((this.currentPage + 1) * this.pageSize, this.totalElements);
  }

  onProductClick(product: ProductResponse): void {
    this.router.navigate(['/products', product.id]);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  exportCsv(): void {
    this.productService.exportCsv().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const today = new Date().toISOString().split('T')[0];
        a.download = `products_${today}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
    });
  }

  formatPrice(price: number | null): string {
    if (price == null) return '';
    return '¥' + price.toLocaleString('ja-JP');
  }

  getStatusLabel(status: string): string {
    return STATUS_LABELS[status] || status;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'status-active';
      case 'INACTIVE':
        return 'status-inactive';
      case 'DISCONTINUED':
        return 'status-discontinued';
      case 'PENDING':
        return 'status-pending';
      default:
        return '';
    }
  }
}
