import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductDetailResponse, ProductResponse, STATUS_LABELS } from '../models/product.model';

interface SpecificationRow {
  key: string;
  value: string;
}

interface ProductImage {
  id: number;
  url: string;
  altText: string;
  isPrimary: boolean;
}

interface AlternativeProduct {
  id: number;
  sku: string;
  name: string;
  unitPrice: number;
  status: string;
  manufacturerName: string;
}

interface ProductDocumentView {
  id: number;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: string;
}

interface ChangeLogEntry {
  id: number;
  field: string;
  oldValue: string;
  newValue: string;
  changedBy: string;
  changedAt: string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product: ProductDetailResponse | null = null;
  isLoading = true;
  errorMessage = '';
  activeTab = 0;

  tabs = [
    { label: '基本情報' },
    { label: '仕様' },
    { label: '画像' },
    { label: '代替品' },
    { label: 'サプライヤー' },
    { label: 'ドキュメント' },
    { label: '変更履歴' },
  ];

  specifications: SpecificationRow[] = [];
  productImages: ProductImage[] = [];
  alternativeProducts: AlternativeProduct[] = [];
  productSuppliers: any[] = [];
  documents: ProductDocumentView[] = [];
  changeLog: ChangeLogEntry[] = [];
  showDeleteConfirm = false;

  totalStock = 0;
  totalReserved = 0;
  totalAvailable = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
  }

  private loadProduct(): void {
    this.isLoading = true;
    this.productService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.parseSpecifications(product);
        this.loadImages(product);
        this.loadDocuments(product);
        this.loadAlternativeProducts();
        this.loadChangeLog();
        this.totalStock = product.totalStock ?? 0;
        this.totalReserved = product.totalReserved ?? 0;
        this.totalAvailable = product.totalAvailable ?? 0;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = '製品情報の取得に失敗しました。';
        this.isLoading = false;
      },
    });
  }

  private parseSpecifications(product: ProductDetailResponse): void {
    try {
      if (product.specifications) {
        const specs = JSON.parse(product.specifications);
        this.specifications = Object.keys(specs).map((key) => ({
          key,
          value: specs[key],
        }));
      }
    } catch {
      this.specifications = [];
    }
  }

  private loadImages(product: ProductDetailResponse): void {
    if (product.images && product.images.length > 0) {
      this.productImages = product.images.map((img, i) => ({
        id: img.id || i + 1,
        url: img.fileName || '/assets/images/no-image.png',
        altText:
          product.name + (img.primary ? ' - メイン画像' : ' - サブ画像'),
        isPrimary: img.primary || false,
      }));
    } else {
      this.productImages = [{
        id: 0,
        url: '/assets/images/no-image.png',
        altText: '画像なし - No Image',
        isPrimary: true,
      }];
    }
  }

  private loadDocuments(product: ProductDetailResponse): void {
    if (product.documents && product.documents.length > 0) {
      this.documents = product.documents.map((doc, i) => ({
        id: doc.id || i + 1,
        fileName: doc.fileName || 'unknown',
        filePath: doc.filePath || '',
        fileType: doc.fileName?.endsWith('.pdf')
          ? 'application/pdf'
          : 'application/octet-stream',
        fileSize: 0,
        uploadedBy: '-',
        uploadedAt: '',
      }));
    } else {
      this.documents = [];
    }
  }

  private loadAlternativeProducts(): void {
    this.productService.getProducts({ page: 0, size: 5 }).subscribe({
      next: (result) => {
        this.alternativeProducts = result.content
          .filter(p => p.id !== this.productId)
          .map(p => ({
            id: p.id,
            sku: p.sku,
            name: p.name,
            unitPrice: p.unitPrice ?? 0,
            status: p.status,
            manufacturerName: p.manufacturerName ?? '',
          }));
      },
      error: () => {},
    });
  }

  private loadChangeLog(): void {
    this.productService.getProductChangeLog(this.productId).subscribe({
      next: (entries) => {
        this.changeLog = entries.map((e) => ({
          id: e.id,
          field: e.field,
          oldValue: e.oldValue ?? '-',
          newValue: e.newValue ?? '-',
          changedBy: e.changedBy ?? '-',
          changedAt: e.changedAt ?? '',
        }));
      },
      error: () => {},
    });
  }

  switchTab(index: number): void {
    this.activeTab = index;
  }

  navigateToList(): void {
    this.router.navigate(['/products']);
  }

  navigateToEdit(): void {
    this.router.navigate(['/products', this.productId, 'edit']);
  }

  navigateToAlternative(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  navigateToSupplier(supplierId: number): void {
    this.router.navigate(['/suppliers', supplierId]);
  }

  confirmDelete(): void {
    this.showDeleteConfirm = true;
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.productId).subscribe({
      next: () => this.navigateToList(),
      error: () => {
        this.errorMessage = '製品の削除に失敗しました。';
      },
    });
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
  }

  downloadDocument(doc: ProductDocumentView): void {
    if (doc.filePath) {
      const a = document.createElement('a');
      a.href = doc.filePath;
      a.download = doc.fileName || 'document.pdf';
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
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

  get dimensions(): string {
    if (!this.product) return '-';
    const w = this.product.width;
    const h = this.product.height;
    const d = this.product.depth;
    if (w == null && h == null && d == null) return '-';
    return `${w ?? '-'} × ${h ?? '-'} × ${d ?? '-'} mm`;
  }

  formatCurrency(amount: number | null): string {
    if (amount == null) return '¥0';
    return '¥' + amount.toLocaleString('ja-JP');
  }

  formatDateTime(dateStr: string | null): string {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return (
      d.getFullYear() +
      '/' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '/' +
      ('0' + d.getDate()).slice(-2) +
      ' ' +
      ('0' + d.getHours()).slice(-2) +
      ':' +
      ('0' + d.getMinutes()).slice(-2)
    );
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return (
      d.getFullYear() +
      '/' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '/' +
      ('0' + d.getDate()).slice(-2)
    );
  }
}
