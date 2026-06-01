import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ProductBundle, ProductResponse } from '../models/product.model';

@Component({
  selector: 'app-bundle-management',
  templateUrl: './bundle-management.component.html',
  styleUrls: ['./bundle-management.component.scss'],
})
export class BundleManagementComponent implements OnInit {
  bundles: ProductBundle[] = [];
  availableProducts: ProductResponse[] = [];
  editMode: 'create' | 'edit' | null = null;
  editingBundleId: number | null = null;
  bundleForm!: FormGroup;

  productSearchKeyword = '';
  searchResults: ProductResponse[] = [];

  calculatedTotalPrice = 0;
  calculatedDiscountAmount = 0;
  calculatedBundlePrice = 0;

  showDeleteConfirm = false;
  deletingBundle: ProductBundle | null = null;

  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadBundles();
    this.loadProducts();
  }

  initForm(): void {
    this.bundleForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.maxLength(1000)]],
      discountPercentage: [0, [Validators.min(0), Validators.max(100)]],
      status: ['ACTIVE'],
      items: this.fb.array([]),
    });

    this.bundleForm.get('discountPercentage')!.valueChanges.subscribe(() => {
      this.recalculatePrices();
    });
  }

  get items(): FormArray {
    return this.bundleForm.get('items') as FormArray;
  }

  loadBundles(): void {
    this.productService.getBundles().subscribe({
      next: (bundles) => {
        this.bundles = bundles;
      },
      error: () => {
        this.errorMessage = 'バンドルの取得に失敗しました。';
      },
    });
  }

  loadProducts(): void {
    this.productService.getProducts({ page: 0, size: 100 }).subscribe({
      next: (result) => {
        this.availableProducts = result.content;
      },
      error: () => {
        this.errorMessage = '製品の取得に失敗しました。';
      },
    });
  }

  startCreate(): void {
    this.editMode = 'create';
    this.editingBundleId = null;
    this.bundleForm.reset({
      name: '',
      description: '',
      discountPercentage: 0,
      status: 'ACTIVE',
    });
    this.clearItems();
    this.clearSearch();
    this.calculatedTotalPrice = 0;
    this.calculatedDiscountAmount = 0;
    this.calculatedBundlePrice = 0;
    this.errorMessage = '';
    this.successMessage = '';
  }

  startEdit(bundle: ProductBundle): void {
    this.editMode = 'edit';
    this.editingBundleId = bundle.id;
    this.bundleForm.patchValue({
      name: bundle.name,
      description: bundle.description,
      discountPercentage: bundle.discountPercentage,
      status: bundle.status,
    });
    this.clearItems();
    if (bundle.products) {
      bundle.products.forEach((p) => {
        const group = this.fb.group({
          productId: [p.productId],
          productName: [p.productName],
          productSku: [p.productSku],
          unitPrice: [p.unitPrice],
          quantity: [p.quantity, [Validators.required, Validators.min(1)]],
        });
        group.get('quantity')!.valueChanges.subscribe(() => {
          this.recalculatePrices();
        });
        this.items.push(group);
      });
    }
    this.recalculatePrices();
    this.clearSearch();
    this.errorMessage = '';
    this.successMessage = '';
  }

  private clearItems(): void {
    while (this.items.length > 0) {
      this.items.removeAt(0);
    }
  }

  searchProducts(): void {
    const keyword = this.productSearchKeyword.trim().toLowerCase();
    if (!keyword) {
      this.searchResults = [];
      return;
    }
    this.searchResults = this.availableProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(keyword) ||
          (p.sku && p.sku.toLowerCase().includes(keyword)),
      )
      .slice(0, 10);
  }

  clearSearch(): void {
    this.productSearchKeyword = '';
    this.searchResults = [];
  }

  addProductToBundle(product: ProductResponse): void {
    const existingIndex = this.items.controls.findIndex(
      (ctrl) => ctrl.get('productId')!.value === product.id,
    );
    if (existingIndex >= 0) {
      const existing = this.items.at(existingIndex);
      const currentQty = existing.get('quantity')!.value || 0;
      existing.get('quantity')!.setValue(currentQty + 1);
    } else {
      const group = this.fb.group({
        productId: [product.id],
        productName: [product.name],
        productSku: [product.sku],
        unitPrice: [product.unitPrice || 0],
        quantity: [1, [Validators.required, Validators.min(1)]],
      });
      group.get('quantity')!.valueChanges.subscribe(() => {
        this.recalculatePrices();
      });
      this.items.push(group);
    }
    this.recalculatePrices();
    this.clearSearch();
  }

  removeProductFromBundle(index: number): void {
    this.items.removeAt(index);
    this.recalculatePrices();
  }

  recalculatePrices(): void {
    let totalPrice = 0;
    for (let i = 0; i < this.items.length; i++) {
      const ctrl = this.items.at(i);
      const unitPrice = ctrl.get('unitPrice')!.value || 0;
      const quantity = ctrl.get('quantity')!.value || 0;
      totalPrice += unitPrice * quantity;
    }
    this.calculatedTotalPrice = totalPrice;
    const discountPct = this.bundleForm.get('discountPercentage')!.value || 0;
    this.calculatedDiscountAmount = Math.floor((totalPrice * discountPct) / 100);
    this.calculatedBundlePrice = totalPrice - this.calculatedDiscountAmount;
  }

  saveBundle(): void {
    this.bundleForm.markAllAsTouched();
    if (this.bundleForm.invalid) {
      return;
    }

    if (this.items.length === 0) {
      this.errorMessage = 'バンドルには少なくとも1つの製品を追加してください。';
      return;
    }

    const formData = this.bundleForm.value;
    const payload = {
      name: formData.name,
      description: formData.description || '',
      discountPercentage: formData.discountPercentage || 0,
      status: formData.status,
      items: formData.items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    this.errorMessage = '';

    if (this.editMode === 'create') {
      this.productService.createBundle(payload).subscribe({
        next: () => {
          this.successMessage = 'バンドルを作成しました。';
          this.editMode = null;
          this.loadBundles();
        },
        error: () => {
          this.errorMessage = 'バンドルの作成に失敗しました。';
        },
      });
    } else if (this.editMode === 'edit' && this.editingBundleId) {
      this.productService.updateBundle(this.editingBundleId, payload).subscribe({
        next: () => {
          this.successMessage = 'バンドルを更新しました。';
          this.editMode = null;
          this.loadBundles();
        },
        error: () => {
          this.errorMessage = 'バンドルの更新に失敗しました。';
        },
      });
    }
  }

  cancelEdit(): void {
    this.bundleForm.reset();
    this.clearItems();
    this.editMode = null;
    this.editingBundleId = null;
    this.clearSearch();
    this.calculatedTotalPrice = 0;
    this.calculatedDiscountAmount = 0;
    this.calculatedBundlePrice = 0;
  }

  confirmDelete(bundle: ProductBundle): void {
    this.deletingBundle = bundle;
    this.showDeleteConfirm = true;
  }

  deleteBundle(): void {
    if (!this.deletingBundle) return;

    const id = this.deletingBundle.id;
    this.productService.deleteBundle(id).subscribe({
      next: () => {
        this.successMessage = 'バンドルを削除しました。';
        this.showDeleteConfirm = false;
        this.deletingBundle = null;
        this.loadBundles();
      },
      error: () => {
        this.errorMessage = 'バンドルの削除に失敗しました。';
        this.showDeleteConfirm = false;
        this.deletingBundle = null;
      },
    });
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.deletingBundle = null;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return '有効';
      case 'INACTIVE':
        return '無効';
      case 'DRAFT':
        return '下書き';
      default:
        return status;
    }
  }

  formatPrice(price: number): string {
    if (price == null) return '\u00a50';
    return '\u00a5' + price.toLocaleString('ja-JP');
  }
}
