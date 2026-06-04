'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../products.module.css';

interface ProductDetail {
  id: number;
  sku: string;
  name: string;
  description: string;
  categoryName: string;
  manufacturerName: string;
  unitPrice: number;
  unit: string;
  status: string;
  minimumOrderQuantity: number;
  leadTimeDays: number;
  notes: string;
  weight: number;
  dimensions: string;
  createdAt: string;
  updatedAt: string;
  suppliers: Array<{
    supplierId: number;
    supplierName: string;
    supplierSku: string;
    unitPrice: number;
    leadTimeDays: number;
    isPreferred: boolean;
  }>;
  inventoryItems: Array<{
    warehouseId: number;
    warehouseName: string;
    quantity: number;
    reservedQuantity: number;
    availableQuantity: number;
  }>;
}

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: '有効', INACTIVE: '無効', DISCONTINUED: '廃止', PENDING: '保留',
};

const STATUS_CLASSES: Record<string, string> = {
  ACTIVE: 'statusActive', INACTIVE: 'statusInactive', DISCONTINUED: 'statusDiscontinued', PENDING: 'statusPending',
};

function formatCurrency(amount: number | null): string {
  if (amount == null) return '-';
  return '¥' + amount.toLocaleString('ja-JP');
}

export default function ProductDetailClient({ product }: { product: ProductDetail }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const handleDelete = async () => {
    if (!confirm(`「${product.name}」を廃止しますか？`)) return;
    await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
    router.push('/products');
  };

  const totalStock = product.inventoryItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalAvailable = product.inventoryItems.reduce((sum, i) => sum + i.availableQuantity, 0);

  const tabs = ['基本情報', 'サプライヤー', '在庫情報'];

  return (
    <div>
      <span className={styles.backLink} onClick={() => router.push('/products')}>
        ← 製品一覧に戻る
      </span>
      <div className={styles.detailHeader}>
        <div>
          <h1 className={styles.pageTitle}>{product.name}</h1>
          <p className={styles.pageDescription}>
            <span className={styles.skuCell}>{product.sku}</span>
            {' '}
            <span className={`${styles.statusBadge} ${styles[STATUS_CLASSES[product.status] || 'statusDefault'] || ''}`}>
              {STATUS_LABELS[product.status] || product.status}
            </span>
          </p>
        </div>
        <div className={styles.detailActions}>
          <button className={styles.btnSecondary} onClick={() => router.push(`/products/${product.id}/edit`)}>
            編集
          </button>
          <button className={styles.btnDanger} onClick={handleDelete}>廃止</button>
        </div>
      </div>

      <div className={styles.tabs}>
        {tabs.map((tab, i) => (
          <button key={tab}
                  className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(i)}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 0 && (
        <div className={styles.tabContent}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>SKU</span>
              <span className={styles.infoValueMono}>{product.sku}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>ステータス</span>
              <span className={styles.infoValue}>{STATUS_LABELS[product.status] || product.status}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>カテゴリ</span>
              <span className={styles.infoValue}>{product.categoryName || '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>メーカー</span>
              <span className={styles.infoValue}>{product.manufacturerName || '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>単価</span>
              <span className={styles.infoValueMono}>{formatCurrency(product.unitPrice)}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>単位</span>
              <span className={styles.infoValue}>{product.unit || '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>最小発注数量</span>
              <span className={styles.infoValueMono}>{product.minimumOrderQuantity ?? '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>リードタイム</span>
              <span className={styles.infoValue}>{product.leadTimeDays ? `${product.leadTimeDays}日` : '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>重量</span>
              <span className={styles.infoValue}>{product.weight ? `${product.weight} kg` : '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>寸法</span>
              <span className={styles.infoValue}>{product.dimensions || '-'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>総在庫</span>
              <span className={styles.infoValueMono}>{totalStock}（利用可能: {totalAvailable}）</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>登録日</span>
              <span className={styles.infoValue}>{product.createdAt || '-'}</span>
            </div>
          </div>
          {product.description && (
            <div style={{ marginTop: 24 }}>
              <span className={styles.infoLabel}>説明</span>
              <p style={{ marginTop: 6, color: '#374151', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {product.description}
              </p>
            </div>
          )}
          {product.notes && (
            <div style={{ marginTop: 16 }}>
              <span className={styles.infoLabel}>備考</span>
              <p style={{ marginTop: 6, color: '#6b7280', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {product.notes}
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 1 && (
        <div className={styles.tabContent}>
          {product.suppliers.length > 0 ? (
            <table className={styles.supplierTable}>
              <thead>
                <tr>
                  <th>サプライヤー</th>
                  <th>サプライヤーSKU</th>
                  <th>単価</th>
                  <th>リードタイム</th>
                </tr>
              </thead>
              <tbody>
                {product.suppliers.map((s) => (
                  <tr key={s.supplierId}>
                    <td>
                      {s.supplierName}
                      {s.isPreferred && <span className={styles.preferredBadge}>優先</span>}
                    </td>
                    <td style={{ fontFamily: 'monospace' }}>{s.supplierSku || '-'}</td>
                    <td style={{ fontFamily: 'monospace' }}>{formatCurrency(s.unitPrice)}</td>
                    <td>{s.leadTimeDays ? `${s.leadTimeDays}日` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.emptyState}>サプライヤー情報がありません</div>
          )}
        </div>
      )}

      {activeTab === 2 && (
        <div className={styles.tabContent}>
          {product.inventoryItems.length > 0 ? (
            <div className={styles.inventoryGrid}>
              {product.inventoryItems.map((inv) => (
                <div key={inv.warehouseId} className={styles.inventoryCard}>
                  <div className={styles.inventoryCardTitle}>{inv.warehouseName}</div>
                  <div className={styles.inventoryRow}>
                    <span className={styles.inventoryLabel}>在庫数</span>
                    <span className={styles.inventoryValue}>{inv.quantity}</span>
                  </div>
                  <div className={styles.inventoryRow}>
                    <span className={styles.inventoryLabel}>予約済み</span>
                    <span className={styles.inventoryValue}>{inv.reservedQuantity}</span>
                  </div>
                  <div className={styles.inventoryRow}>
                    <span className={styles.inventoryLabel}>利用可能</span>
                    <span className={styles.inventoryValue}>{inv.availableQuantity}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>在庫情報がありません</div>
          )}
        </div>
      )}
    </div>
  );
}
