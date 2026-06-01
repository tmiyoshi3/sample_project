import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierService } from '../services/supplier.service';
import { Supplier, PageResult } from '../models/supplier.model';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss'],
})
export class SupplierListComponent implements OnInit {
  suppliers: Supplier[] = [];
  totalCount = 0;
  isLoading = false;

  searchKeyword = '';
  selectedStatus = '';
  minRating: number | null = null;

  statusOptions = [
    { value: '', label: 'すべて' },
    { value: 'ACTIVE', label: '取引中' },
    { value: 'INACTIVE', label: '取引停止' },
    { value: 'PENDING', label: '審査中' },
    { value: 'BLOCKED', label: 'ブロック済み' },
  ];

  ratingOptions: { value: number | null; label: string }[] = [
    { value: null, label: '指定なし' },
    { value: 1, label: '1以上' },
    { value: 2, label: '2以上' },
    { value: 3, label: '3以上' },
    { value: 4, label: '4以上' },
    { value: 5, label: '5' },
  ];

  selectedForCompare: number[] = [];

  constructor(
    private supplierService: SupplierService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.isLoading = true;
    this.supplierService.getSuppliers(0, 20).subscribe({
      next: (result: PageResult<Supplier>) => {
        let filtered = result.content;

        if (this.searchKeyword) {
          const keyword = this.searchKeyword.toLowerCase();
          filtered = filtered.filter(
            (s) =>
              s.name.toLowerCase().includes(keyword) ||
              s.code.toLowerCase().includes(keyword) ||
              (s.email && s.email.toLowerCase().includes(keyword)),
          );
        }

        if (this.selectedStatus) {
          filtered = filtered.filter((s) => s.status === this.selectedStatus);
        }

        if (this.minRating !== null) {
          filtered = filtered.filter((s) => s.rating >= (this.minRating as number));
        }

        this.suppliers = filtered;
        this.totalCount = result.totalElements;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onSearch(event: Event): void {
    this.searchKeyword = (event.target as HTMLInputElement).value;
    this.loadSuppliers();
  }

  onSearchInput(value: string): void {
    this.searchKeyword = value;
    this.loadSuppliers();
  }

  onFilterChange(): void {
    this.loadSuppliers();
  }

  onRowClick(supplier: Supplier): void {
    this.router.navigate(['/suppliers', supplier.id]);
  }

  navigateToCreate(): void {
    this.router.navigate(['/suppliers', 'new']);
  }

  navigateToCompare(): void {
    if (this.selectedForCompare.length >= 2) {
      const ids = this.selectedForCompare.join(',');
      this.router.navigate(['/suppliers', 'compare'], {
        queryParams: { ids },
      });
    }
  }

  toggleCompareSelection(supplierId: number, event: Event): void {
    event.stopPropagation();
    const index = this.selectedForCompare.indexOf(supplierId);
    if (index >= 0) {
      this.selectedForCompare.splice(index, 1);
    } else if (this.selectedForCompare.length < 3) {
      this.selectedForCompare.push(supplierId);
    }
  }

  isSelectedForCompare(supplierId: number): boolean {
    return this.selectedForCompare.includes(supplierId);
  }

  resetFilters(): void {
    this.searchKeyword = '';
    this.selectedStatus = '';
    this.minRating = null;
    this.loadSuppliers();
  }

  getRatingStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return '★'.repeat(fullStars) + (halfStar ? '☆' : '') + '☆'.repeat(emptyStars);
  }
}
