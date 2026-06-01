export interface Supplier {
  id: number;
  code: string;
  name: string;
  status: string;
  rating: number;
  email: string;
  phone: string;
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
