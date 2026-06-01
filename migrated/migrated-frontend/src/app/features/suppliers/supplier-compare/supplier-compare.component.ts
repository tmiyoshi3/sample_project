import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../services/supplier.service';
import { SupplierPerformanceReport, RatingEntry } from '../models/supplier.model';

@Component({
  selector: 'app-supplier-compare',
  templateUrl: './supplier-compare.component.html',
  styleUrls: ['./supplier-compare.component.scss'],
})
export class SupplierCompareComponent implements OnInit {
  supplierIds: number[] = [];
  reports: SupplierPerformanceReport[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierService,
  ) {}

  ngOnInit(): void {
    const idsParam = this.route.snapshot.queryParamMap.get('ids');
    if (idsParam) {
      this.supplierIds = idsParam
        .split(',')
        .map((id) => Number(id))
        .filter((id) => !isNaN(id));
    }

    if (this.supplierIds.length >= 2) {
      this.loadComparisonData();
    } else {
      this.isLoading = false;
    }
  }

  private loadComparisonData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.supplierService.compareSuppliers(this.supplierIds).subscribe({
      next: (results: SupplierPerformanceReport[]) => {
        this.reports = results;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = '比較データの取得に失敗しました。';
        this.reports = [];
        this.isLoading = false;
      },
    });
  }

  getAverageRating(report: SupplierPerformanceReport): number {
    if (!report.recentRatings || report.recentRatings.length === 0) return 0;
    const sum = report.recentRatings.reduce((acc, r) => acc + (r.overallScore || 0), 0);
    return sum / report.recentRatings.length;
  }

  getAverageScore(report: SupplierPerformanceReport, field: keyof RatingEntry): number {
    if (!report.recentRatings || report.recentRatings.length === 0) return 0;
    const sum = report.recentRatings.reduce((acc, r) => acc + (Number(r[field]) || 0), 0);
    return sum / report.recentRatings.length;
  }

  getRatingStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return '★'.repeat(fullStars) + (halfStar ? '☆' : '') + '☆'.repeat(emptyStars);
  }

  getRatingBarWidth(value: number): number {
    return Math.min(100, (value / 5) * 100);
  }

  formatCurrency(value: number): string {
    return '¥' + value.toLocaleString('ja-JP');
  }

  navigateToList(): void {
    this.router.navigate(['/suppliers']);
  }

  navigateToSupplier(report: SupplierPerformanceReport): void {
    const id = this.supplierIds[this.reports.indexOf(report)];
    if (id) {
      this.router.navigate(['/suppliers', id]);
    }
  }
}
