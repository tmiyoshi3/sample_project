export interface Supplier {
  id: number;
  code: string;
  name: string;
  status: string;
  rating: number;
  email: string;
  phone: string;
  nameKana?: string;
  address?: string;
  website?: string;
  paymentTerms?: string;
  notes?: string;
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

export const STATUS_LABELS: Record<string, string> = {
  ACTIVE: '有効',
  INACTIVE: '無効',
  SUSPENDED: '停止中',
  PENDING_APPROVAL: '承認待ち',
};

export interface RatingEntry {
  id: number;
  qualityScore: number;
  deliveryScore: number;
  priceScore: number;
  serviceScore: number;
  overallScore: number;
  comments: string;
  ratingDate: string;
  ratingPeriod: string;
  ratedBy: number;
}

export interface SupplierPerformanceReport {
  supplierName: string;
  supplierCode: string;
  status: string;
  currentRating: number | null;
  totalOrders: number;
  totalAmount: number;
  activeContractCount: number;
  completionRate: number;
  recentRatings: RatingEntry[];
}

export interface SupplierContact {
  id: number;
  supplierId: number;
  name: string;
  department: string;
  position: string;
  phone: string;
  email: string;
  isPrimary: boolean;
}

export interface SupplierProduct {
  id: number;
  supplierSku: string;
  unitCost: number;
  leadTimeDays: number;
  minOrderQty: number;
  isPreferred: boolean;
  productId: number;
  productName: string;
  productSku: string;
}

export interface SupplierContract {
  id: number;
  contractNumber: string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  terms: string;
}

export interface SupplierCertification {
  id: number;
  certType: string;
  certNumber: string;
  issuedDate: string;
  expiryDate: string;
  status: string;
}

export interface SupplierRatingEntry {
  id: number;
  ratingDate: string;
  qualityScore: number;
  deliveryScore: number;
  priceScore: number;
  serviceScore: number;
  overallScore: number;
  ratedBy: number;
  comments: string;
  ratingPeriod: string;
}

export const CONTRACT_STATUS_LABELS: Record<string, string> = {
  ACTIVE: '有効',
  EXPIRED: '期限切れ',
  TERMINATED: '解約済み',
  PENDING: '締結待ち',
};

export const CERT_STATUS_LABELS: Record<string, string> = {
  VALID: '有効',
  EXPIRED: '期限切れ',
  EXPIRING_SOON: '期限間近',
  REVOKED: '取消済み',
};
