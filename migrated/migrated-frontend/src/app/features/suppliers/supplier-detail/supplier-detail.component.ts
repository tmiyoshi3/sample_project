import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../services/supplier.service';
import {
  Supplier,
  SupplierContact,
  SupplierContract,
  CONTRACT_STATUS_LABELS,
  CERT_STATUS_LABELS,
} from '../models/supplier.model';

interface RatingHistory {
  id: number;
  evaluationDate: string;
  quality: number;
  delivery: number;
  price: number;
  communication: number;
  overallRating: number;
  evaluatedBy: string;
  comment: string;
}

interface Certification {
  id: number;
  name: string;
  issuingBody: string;
  certificationNumber: string;
  issueDate: string;
  expiryDate: string;
  status: string;
}

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss'],
})
export class SupplierDetailComponent implements OnInit {
  supplierId!: number;
  supplier: Supplier | null = null;
  isLoading = true;
  errorMessage = '';
  activeTab = 0;

  tabs = [
    { label: '基本情報' },
    { label: '製品' },
    { label: '契約' },
    { label: '評価履歴' },
    { label: '認証' },
  ];

  contacts: SupplierContact[] = [];
  supplierProducts: any[] = [];
  contracts: SupplierContract[] = [];
  ratingHistory: RatingHistory[] = [];
  averageRating = 0;
  certifications: Certification[] = [];

  showDeleteConfirm = false;
  showRatingModal = false;
  isSavingRating = false;
  newQualityScore = 3;
  newDeliveryScore = 3;
  newPriceScore = 3;
  newServiceScore = 3;
  newComments = '';
  ratingSuccessMessage = '';

  showContractModal = false;
  isSavingContract = false;
  editingContract: any = null;
  contractForm = {
    contractNumber: '',
    title: '',
    startDate: '',
    endDate: '',
    status: 'DRAFT',
    terms: '',
  };

  showCertModal = false;
  isSavingCert = false;
  editingCert: any = null;
  certForm = {
    certType: 'ISO_9001',
    certNumber: '',
    issuedDate: '',
    expiryDate: '',
    status: 'ACTIVE',
  };

  showProductModal = false;
  isSavingProduct = false;
  productForm = {
    productId: 0,
    supplierSku: '',
    unitCost: 0,
    leadTimeDays: 0,
    minOrderQty: 1,
    isPreferred: false,
  };

  successMessage = '';
  pendingDeleteType = '';
  pendingDeleteId = 0;
  showItemDeleteConfirm = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierService,
  ) {}

  ngOnInit(): void {
    this.supplierId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAllData();
  }

  private loadAllData(): void {
    this.isLoading = true;
    this.supplierService.getSupplier(this.supplierId).subscribe(
      (supplier) => {
        this.supplier = supplier;
        this.loadContacts();
        this.loadProducts();
        this.loadContracts();
        this.loadRatingHistory();
        this.loadCertifications();
        this.isLoading = false;
      },
      () => {
        this.errorMessage = 'サプライヤー情報の取得に失敗しました。';
        this.isLoading = false;
      },
    );
  }

  private loadContacts(): void {
    this.supplierService.getContacts(this.supplierId).subscribe(
      (contacts) => {
        this.contacts = contacts;
      },
      () => {},
    );
  }

  private loadProducts(): void {
    this.supplierService.getSupplierProducts(this.supplierId).subscribe(
      (products) => {
        this.supplierProducts = products.map((p: any) => ({
          spId: p.id,
          id: p.productId,
          sku: p.productSku,
          name: p.productName,
          unitPrice: p.unitCost,
          supplierSku: p.supplierSku,
          leadTimeDays: p.leadTimeDays,
          minOrderQty: p.minOrderQty,
          isPreferred: p.isPreferred,
        }));
      },
      () => {},
    );
  }

  private loadContracts(): void {
    this.supplierService.getContracts(this.supplierId).subscribe(
      (contracts) => {
        this.contracts = contracts;
      },
      () => {},
    );
  }

  private loadRatingHistory(): void {
    this.supplierService.getRatings(this.supplierId).subscribe(
      (ratings) => {
        this.ratingHistory = ratings.map((r: any) => ({
          id: r.id,
          evaluationDate: r.ratingDate,
          quality: r.qualityScore,
          delivery: r.deliveryScore,
          price: r.priceScore,
          communication: r.serviceScore || 0,
          overallRating: r.overallScore,
          evaluatedBy: r.ratedBy,
          comment: r.comments,
        }));
        if (this.ratingHistory.length > 0) {
          const sum = this.ratingHistory.reduce((acc, r) => acc + r.overallRating, 0);
          this.averageRating = Math.round((sum / this.ratingHistory.length) * 10) / 10;
        }
      },
      () => {},
    );
  }

  private loadCertifications(): void {
    this.supplierService.getCertifications(this.supplierId).subscribe(
      (certs) => {
        this.certifications = certs.map((c: any) => ({
          id: c.id,
          name: c.certType,
          issuingBody: '',
          certificationNumber: c.certNumber,
          issueDate: c.issuedDate,
          expiryDate: c.expiryDate,
          status: c.status,
        }));
      },
      () => {},
    );
  }

  switchTab(index: number): void {
    this.activeTab = index;
  }

  navigateToEdit(): void {
    this.router.navigate(['/suppliers', this.supplierId, 'edit']);
  }

  navigateToList(): void {
    this.router.navigate(['/suppliers']);
  }

  navigateToProduct(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  confirmDelete(): void {
    this.showDeleteConfirm = true;
  }

  deleteSupplier(): void {
    this.supplierService.deleteSupplier(this.supplierId).subscribe(
      () => {
        this.navigateToList();
      },
      () => {
        this.errorMessage = 'サプライヤーの削除に失敗しました。';
      },
    );
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
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

  formatCurrency(amount: number): string {
    if (amount == null) return '¥0';
    return '¥' + amount.toLocaleString('ja-JP');
  }

  getRatingStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return '★'.repeat(fullStars) + (halfStar ? '☆' : '') + '☆'.repeat(emptyStars);
  }

  getCertStatusLabel(status: string): string {
    return CERT_STATUS_LABELS[status] || status;
  }

  getCertStatusClass(status: string): string {
    const classMap: any = {
      VALID: 'cert-valid',
      EXPIRED: 'cert-expired',
      EXPIRING_SOON: 'cert-expiring',
      REVOKED: 'cert-revoked',
    };
    return classMap[status] || '';
  }

  getContractStatusLabel(status: string): string {
    return CONTRACT_STATUS_LABELS[status] || status;
  }

  openRatingModal(): void {
    this.newQualityScore = 3;
    this.newDeliveryScore = 3;
    this.newPriceScore = 3;
    this.newServiceScore = 3;
    this.newComments = '';
    this.showRatingModal = true;
  }

  closeRatingModal(): void {
    this.showRatingModal = false;
  }

  submitRating(): void {
    this.isSavingRating = true;
    const ratingData = {
      qualityScore: this.newQualityScore,
      deliveryScore: this.newDeliveryScore,
      priceScore: this.newPriceScore,
      serviceScore: this.newServiceScore,
      comments: this.newComments,
    };
    this.supplierService.rateSupplier(this.supplierId, ratingData).subscribe(
      () => {
        this.isSavingRating = false;
        this.showRatingModal = false;
        this.loadRatingHistory();
        this.ratingSuccessMessage = '評価を登録しました。';
        setTimeout(() => {
          this.ratingSuccessMessage = '';
        }, 3000);
      },
      () => {
        this.isSavingRating = false;
        this.errorMessage = '評価の登録に失敗しました。';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      },
    );
  }

  openContractModal(contract?: any): void {
    this.editingContract = contract || null;
    this.contractForm = contract
      ? {
          contractNumber: contract.contractNumber,
          title: contract.title || '',
          startDate: this.toInputDate(contract.startDate),
          endDate: this.toInputDate(contract.endDate),
          status: contract.status,
          terms: contract.terms || '',
        }
      : { contractNumber: '', title: '', startDate: '', endDate: '', status: 'DRAFT', terms: '' };
    this.showContractModal = true;
  }

  closeContractModal(): void {
    this.showContractModal = false;
  }

  submitContract(): void {
    this.isSavingContract = true;
    const obs = this.editingContract
      ? this.supplierService.updateContract(
          this.supplierId,
          this.editingContract.id,
          this.contractForm,
        )
      : this.supplierService.createContract(this.supplierId, this.contractForm);

    obs.subscribe(
      () => {
        this.isSavingContract = false;
        this.showContractModal = false;
        this.loadContracts();
        this.showSuccess(this.editingContract ? '契約を更新しました。' : '契約を作成しました。');
      },
      () => {
        this.isSavingContract = false;
        this.showError('契約の保存に失敗しました。');
      },
    );
  }

  confirmDeleteContract(contractId: number): void {
    this.pendingDeleteType = 'contract';
    this.pendingDeleteId = contractId;
    this.showItemDeleteConfirm = true;
  }

  openCertModal(cert?: any): void {
    this.editingCert = cert || null;
    this.certForm = cert
      ? {
          certType: cert.name || cert.certType,
          certNumber: cert.certificationNumber || cert.certNumber || '',
          issuedDate: this.toInputDate(cert.issueDate || cert.issuedDate),
          expiryDate: this.toInputDate(cert.expiryDate),
          status: cert.status || 'ACTIVE',
        }
      : { certType: 'ISO_9001', certNumber: '', issuedDate: '', expiryDate: '', status: 'ACTIVE' };
    this.showCertModal = true;
  }

  closeCertModal(): void {
    this.showCertModal = false;
  }

  submitCert(): void {
    this.isSavingCert = true;
    const obs = this.editingCert
      ? this.supplierService.updateCertification(
          this.supplierId,
          this.editingCert.id,
          this.certForm,
        )
      : this.supplierService.createCertification(this.supplierId, this.certForm);

    obs.subscribe(
      () => {
        this.isSavingCert = false;
        this.showCertModal = false;
        this.loadCertifications();
        this.showSuccess(this.editingCert ? '認証を更新しました。' : '認証を登録しました。');
      },
      () => {
        this.isSavingCert = false;
        this.showError('認証の保存に失敗しました。');
      },
    );
  }

  confirmDeleteCert(certId: number): void {
    this.pendingDeleteType = 'cert';
    this.pendingDeleteId = certId;
    this.showItemDeleteConfirm = true;
  }

  openProductModal(): void {
    this.productForm = {
      productId: 0,
      supplierSku: '',
      unitCost: 0,
      leadTimeDays: 0,
      minOrderQty: 1,
      isPreferred: false,
    };
    this.showProductModal = true;
  }

  closeProductModal(): void {
    this.showProductModal = false;
  }

  submitProduct(): void {
    this.isSavingProduct = true;
    this.supplierService.addSupplierProduct(this.supplierId, this.productForm).subscribe(
      () => {
        this.isSavingProduct = false;
        this.showProductModal = false;
        this.loadProducts();
        this.showSuccess('製品紐付けを追加しました。');
      },
      () => {
        this.isSavingProduct = false;
        this.showError('製品紐付けに失敗しました。');
      },
    );
  }

  confirmDeleteProduct(spId: number): void {
    this.pendingDeleteType = 'product';
    this.pendingDeleteId = spId;
    this.showItemDeleteConfirm = true;
  }

  executeItemDelete(): void {
    this.showItemDeleteConfirm = false;
    let obs;
    switch (this.pendingDeleteType) {
      case 'contract':
        obs = this.supplierService.deleteContract(this.supplierId, this.pendingDeleteId);
        break;
      case 'cert':
        obs = this.supplierService.deleteCertification(this.supplierId, this.pendingDeleteId);
        break;
      case 'product':
        obs = this.supplierService.removeSupplierProduct(this.supplierId, this.pendingDeleteId);
        break;
      default:
        return;
    }
    obs.subscribe(
      () => {
        if (this.pendingDeleteType === 'contract') this.loadContracts();
        else if (this.pendingDeleteType === 'cert') this.loadCertifications();
        else this.loadProducts();
        this.showSuccess('削除しました。');
      },
      () => {
        this.showError('削除に失敗しました。');
      },
    );
  }

  cancelItemDelete(): void {
    this.showItemDeleteConfirm = false;
  }

  private toInputDate(dateStr: any): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return (
      d.getFullYear() +
      '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + d.getDate()).slice(-2)
    );
  }

  private showSuccess(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  private showError(msg: string): void {
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
