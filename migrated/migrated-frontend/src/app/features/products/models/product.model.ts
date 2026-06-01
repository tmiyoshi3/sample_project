export interface ProductResponse {
  id: number;
  sku: string;
  skuCode: string;
  name: string;
  description: string | null;
  categoryId: number | null;
  categoryName: string | null;
  manufacturerId: number | null;
  manufacturerName: string | null;
  unitPrice: number | null;
  status: string;
  stockQuantity: number | null;
  unit: string | null;
  minimumOrderQuantity: number | null;
  leadTimeDays: number | null;
  weight: number | null;
}

export interface CategoryResponse {
  id: number;
  code: string;
  name: string;
  description: string | null;
  parentId: number | null;
  productCount: number;
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

export interface ManufacturerOption {
  id: number;
  name: string;
}

export interface ProductDetailResponse {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  categoryId: number | null;
  categoryName: string | null;
  manufacturerId: number | null;
  manufacturerName: string | null;
  unitPrice: number | null;
  status: string;
  unit: string | null;
  minimumOrderQuantity: number | null;
  leadTimeDays: number | null;
  weight: number | null;
  dimensions: string | null;
  width: number | null;
  height: number | null;
  depth: number | null;
  notes: string | null;
  specifications: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  totalStock: number | null;
  totalReserved: number | null;
  totalAvailable: number | null;
  inventoryItems: InventoryItemDto[];
  images: ImageDto[];
  documents: DocumentDto[];
}

export interface InventoryItemDto {
  warehouseId: number;
  warehouseName: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
}

export interface ImageDto {
  id: number;
  fileName: string;
  primary: boolean;
}

export interface DocumentDto {
  id: number;
  fileName: string;
  filePath: string;
}

export interface ChangeLogResponse {
  id: number;
  changeType: string;
  field: string;
  oldValue: string;
  newValue: string;
  changedAt: string;
  changedBy: string;
}

export const STATUS_LABELS: Record<string, string> = {
  ACTIVE: '有効',
  INACTIVE: '無効',
  DISCONTINUED: '廃番',
  PENDING: '保留',
};

export const STATUS_OPTIONS = [
  { value: '', label: 'すべて' },
  { value: 'ACTIVE', label: '有効' },
  { value: 'INACTIVE', label: '無効' },
  { value: 'DISCONTINUED', label: '廃番' },
  { value: 'PENDING', label: '保留' },
];

export interface BundleProductItem {
  productId: number;
  productName: string;
  productSku: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface ProductBundle {
  id: number;
  name: string;
  description: string;
  status: string;
  discountPercentage: number;
  bundlePrice: number;
  createdAt: string;
  products: BundleProductItem[];
  totalPrice: number;
}
