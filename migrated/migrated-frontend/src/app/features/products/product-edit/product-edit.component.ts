import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryResponse, ManufacturerOption, ProductDetailResponse } from '../models/product.model';

interface ExistingImage {
  id: number;
  url: string;
  isPrimary: boolean;
}

interface ExistingDocument {
  id: number;
  fileName: string;
  filePath: string;
}

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productId!: number;
  product: ProductDetailResponse | null = null;
  isLoading = true;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  editForm!: FormGroup;
  specForm!: FormGroup;

  categories: CategoryResponse[] = [];
  manufacturers: ManufacturerOption[] = [];

  statusOptions = [
    { value: 'ACTIVE', label: '有効' },
    { value: 'INACTIVE', label: '無効' },
    { value: 'DISCONTINUED', label: '廃番' },
    { value: 'PENDING', label: '保留' }
  ];

  skuExists = false;
  skuCheckLoading = false;
  originalSku = '';

  existingImages: ExistingImage[] = [];
  existingDocuments: ExistingDocument[] = [];

  imageUploading = false;
  docUploading = false;

  docTypeOptions = [
    { value: 'DATASHEET', label: '仕様書' },
    { value: 'BROCHURE', label: 'カタログ' },
    { value: 'MANUAL', label: 'マニュアル' },
    { value: 'DRAWING', label: '図面' },
    { value: 'OTHER', label: 'その他' }
  ];

  newDocType = 'DATASHEET';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.initializeForm();
    this.loadCategories();
    this.loadManufacturers();
    this.loadProduct();
  }

  private initializeForm(): void {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      sku: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{2,4}-\d{3,8}$/)]],
      description: ['', [Validators.maxLength(2000)]],
      categoryId: [null, [Validators.required]],
      manufacturerId: [null, [Validators.required]],
      status: ['ACTIVE', [Validators.required]],
      unitPrice: [null, [Validators.required, Validators.min(0)]],
      unit: ['個', [Validators.required]],
      minimumOrderQuantity: [1, [Validators.required, Validators.min(1)]],
      leadTimeDays: [7, [Validators.required, Validators.min(1)]],
      weight: [null, [Validators.min(0)]],
      dimensions: [''],
      notes: ['']
    });

    this.specForm = this.fb.group({
      specifications: this.fb.array([])
    });
  }

  private loadCategories(): void {
    this.productService.getCategories().subscribe(
      (categories) => { this.categories = categories; },
      (error) => { console.error('カテゴリ取得エラー:', error); }
    );
  }

  private loadManufacturers(): void {
    this.productService.getManufacturers().subscribe(
      (data) => { this.manufacturers = data; },
      (error) => { console.error('メーカー取得エラー:', error); }
    );
  }

  private loadProduct(): void {
    this.isLoading = true;
    this.productService.getProduct(this.productId).subscribe(
      (product) => {
        this.product = product;
        this.originalSku = product.sku;
        this.populateForm(product);
        this.isLoading = false;
      },
      (error) => {
        console.error('製品データ取得エラー:', error);
        this.errorMessage = '製品データの取得に失敗しました。';
        this.isLoading = false;
      }
    );
  }

  private populateForm(product: ProductDetailResponse): void {
    this.editForm.patchValue({
      name: product.name,
      sku: product.sku,
      description: product.description,
      categoryId: product.categoryId,
      manufacturerId: product.manufacturerId,
      status: product.status,
      unitPrice: product.unitPrice,
      unit: product.unit,
      minimumOrderQuantity: product.minimumOrderQuantity,
      leadTimeDays: product.leadTimeDays,
      weight: product.weight,
      dimensions: product.dimensions,
      notes: product.notes
    });

    this.populateSpecifications(product.specifications || '');

    if (product.images) {
      this.existingImages = product.images.map((img: any) => ({
        id: img.id,
        url: img.fileName || '/assets/images/no-image.png',
        isPrimary: img.primary || false
      }));
    }
    if (product.documents) {
      this.existingDocuments = product.documents.map((doc: any) => ({
        id: doc.id,
        fileName: doc.fileName || 'unknown',
        filePath: doc.filePath || ''
      }));
    }
  }

  private populateSpecifications(specJson: string): void {
    const specArray = this.specForm.get('specifications') as FormArray;
    specArray.clear();

    try {
      if (specJson) {
        const specs = JSON.parse(specJson);
        Object.keys(specs).forEach(key => {
          specArray.push(this.fb.group({
            key: [key, [Validators.required]],
            value: [specs[key], [Validators.required]]
          }));
        });
      }
    } catch (e) {
      // パース失敗時は空行を1つ追加
    }

    if (specArray.length === 0) {
      this.addSpecificationRow();
    }
  }

  get specificationRows(): FormArray {
    return this.specForm.get('specifications') as FormArray;
  }

  addSpecificationRow(): void {
    const row = this.fb.group({
      key: ['', [Validators.required]],
      value: ['', [Validators.required]]
    });
    this.specificationRows.push(row);
  }

  removeSpecificationRow(index: number): void {
    if (this.specificationRows.length > 1) {
      this.specificationRows.removeAt(index);
    }
  }

  checkSkuDuplicate(): void {
    const sku = this.editForm.get('sku')?.value;
    if (!sku || this.editForm.get('sku')?.invalid) return;

    if (sku === this.originalSku) {
      this.skuExists = false;
      return;
    }

    this.skuCheckLoading = true;
    this.productService.checkSkuExists(sku).subscribe(
      (exists) => {
        this.skuExists = exists;
        this.skuCheckLoading = false;
      },
      (error) => {
        console.error('SKU重複チェックエラー:', error);
        this.skuCheckLoading = false;
      }
    );
  }

  getSkuErrorMessage(): string {
    const skuControl = this.editForm.get('sku');
    if (!skuControl?.touched) return '';
    if (skuControl?.errors?.['required']) return 'SKUは必須です';
    if (skuControl?.errors?.['pattern']) return 'SKU形式が不正です（例: AB-12345）';
    if (this.skuExists) return 'このSKUは既に使用されています';
    return '';
  }

  formatCurrency(amount: number): string {
    if (amount == null) return '¥0';
    return '¥' + amount.toLocaleString('ja-JP');
  }

  submit(): void {
    this.editForm.markAllAsTouched();

    if (this.editForm.invalid || this.skuExists || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const specs: any = {};
    this.specificationRows.controls.forEach((control: AbstractControl) => {
      const key = control.get('key')?.value;
      const value = control.get('value')?.value;
      if (key && value) {
        specs[key] = value;
      }
    });

    const productData = {
      ...this.editForm.value,
      specifications: JSON.stringify(specs)
    };

    this.productService.updateProduct(this.productId, productData).subscribe(
      () => {
        this.isSubmitting = false;
        this.successMessage = '製品情報が更新されました。';
        setTimeout(() => {
          this.router.navigate(['/products', this.productId]);
        }, 1500);
      },
      (error) => {
        console.error('製品更新エラー:', error);
        this.isSubmitting = false;
        this.errorMessage = '製品の更新に失敗しました。入力内容を確認してください。';
      }
    );
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.imageUploading = true;
    const file = input.files[0];
    const isPrimary = this.existingImages.length === 0;

    this.productService.uploadImage(this.productId, file, isPrimary).subscribe(
      (result) => {
        this.existingImages.push({
          id: result.id,
          url: result.url,
          isPrimary: result.isPrimary
        });
        this.imageUploading = false;
      },
      (error) => {
        console.error('画像アップロードエラー:', error);
        this.errorMessage = '画像のアップロードに失敗しました。';
        this.imageUploading = false;
      }
    );
    input.value = '';
  }

  deleteImage(index: number): void {
    const img = this.existingImages[index];
    this.productService.deleteImage(this.productId, img.id).subscribe(
      () => {
        this.existingImages.splice(index, 1);
      },
      (error) => {
        console.error('画像削除エラー:', error);
        this.errorMessage = '画像の削除に失敗しました。';
      }
    );
  }

  onDocumentSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.docUploading = true;
    const file = input.files[0];

    this.productService.uploadDocument(this.productId, file, this.newDocType).subscribe(
      (result) => {
        this.existingDocuments.push({
          id: result.id,
          fileName: result.fileName,
          filePath: result.filePath
        });
        this.docUploading = false;
      },
      (error) => {
        console.error('ドキュメントアップロードエラー:', error);
        this.errorMessage = 'ドキュメントのアップロードに失敗しました。';
        this.docUploading = false;
      }
    );
    input.value = '';
  }

  deleteDocument(index: number): void {
    const doc = this.existingDocuments[index];
    this.productService.deleteDocument(this.productId, doc.id).subscribe(
      () => {
        this.existingDocuments.splice(index, 1);
      },
      (error) => {
        console.error('ドキュメント削除エラー:', error);
        this.errorMessage = 'ドキュメントの削除に失敗しました。';
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/products', this.productId]);
  }
}
