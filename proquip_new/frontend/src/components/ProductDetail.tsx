'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './ProductDetail.module.css'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8280'

interface ProductData {
  id: number; sku: string; name: string; description: string
  categoryName: string; manufacturerName: string; unitPrice: number
  status: string; unit: string; minimumOrderQuantity: number
  leadTimeDays: number; weight: number | null; dimensions: string | null
  notes: string | null; createdAt: string; updatedAt: string
  modelNumber: string | null; barcode: string | null
  specifications: { key: string; value: string }[]
  images: { id: number; url: string; altText: string; isPrimary: boolean }[]
  inventoryItems: { warehouseName: string; quantity: number; reservedQuantity: number; availableQuantity: number }[]
  suppliers: { supplierId: number; supplierName: string; supplierSku: string; unitPrice: number; leadTimeDays: number; isPreferred: boolean }[]
  changeLog: { id: number; changeType: string; field: string; oldValue: string; newValue: string; changedAt: string; changedBy: string }[]
}

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: '有効', INACTIVE: '無効', DISCONTINUED: '廃止', PENDING_APPROVAL: '承認待ち', DRAFT: '下書き',
}
const STATUS_CLASSES: Record<string, string> = {
  ACTIVE: 'statusActive', INACTIVE: 'statusInactive', DISCONTINUED: 'statusDiscontinued',
  PENDING_APPROVAL: 'statusPending', DRAFT: 'statusDraft',
}

function formatCurrency(n: number | null) { return n == null ? '¥0' : '¥' + n.toLocaleString('ja-JP') }
function formatDateTime(s: string | null) {
  if (!s) return '-'
  const d = new Date(s)
  if (isNaN(d.getTime())) return '-'
  return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

const TABS = ['基本情報', '仕様', '画像', '在庫状況', 'サプライヤー', '変更履歴']

export function ProductDetail({ productId }: { productId: string }) {
  const router = useRouter()
  const [product, setProduct] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    fetch(`${API_BASE}/api/products/${productId}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(setProduct)
      .catch(() => setError('製品情報の取得に失敗しました。'))
      .finally(() => setLoading(false))
  }, [productId])

  if (loading) return <div className={styles.loading}>読み込み中...</div>
  if (error) return (
    <div className={styles.errorBanner}>
      <span>{error}</span>
      <button className={styles.btnBack} onClick={() => router.push('/products')}>一覧に戻る</button>
    </div>
  )
  if (!product) return null

  const totalStock = product.inventoryItems.reduce((s, i) => s + i.quantity, 0)
  const totalReserved = product.inventoryItems.reduce((s, i) => s + i.reservedQuantity, 0)
  const totalAvailable = product.inventoryItems.reduce((s, i) => s + i.availableQuantity, 0)

  return (
    <div>
      {/* ヘッダー */}
      <div className={styles.detailHeader}>
        <div className={styles.headerInfo}>
          <div className={styles.titleRow}>
            <h2 className={styles.productName}>{product.name}</h2>
            <span className={`${styles.statusTag} ${styles[STATUS_CLASSES[product.status] || 'statusDefault']}`}>
              {STATUS_LABELS[product.status] || product.status}
            </span>
          </div>
          <div className={styles.metaRow}>
            <span>SKU: {product.sku}</span>
            <span>カテゴリ: {product.categoryName}</span>
            <span>メーカー: {product.manufacturerName}</span>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnSecondary} onClick={() => router.push('/products')}>← 一覧に戻る</button>
        </div>
      </div>

      {/* タブ */}
      <div className={styles.tabNav}>
        {TABS.map((t, i) => (
          <button key={t} className={`${styles.tabBtn} ${activeTab === i ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(i)}>{t}</button>
        ))}
      </div>

      <div className={styles.tabContent}>
        {/* 基本情報 */}
        {activeTab === 0 && (
          <div className={styles.infoGrid}>
            <div className={styles.infoSection}>
              <h4 className={styles.sectionSubtitle}>基本情報</h4>
              <table className={styles.infoTable}>
                <tbody>
                  <tr><th>製品名</th><td>{product.name}</td></tr>
                  <tr><th>SKU</th><td className={styles.mono}>{product.sku}</td></tr>
                  <tr><th>説明</th><td>{product.description || '-'}</td></tr>
                  <tr><th>カテゴリ</th><td>{product.categoryName}</td></tr>
                  <tr><th>メーカー</th><td>{product.manufacturerName}</td></tr>
                  <tr><th>ステータス</th><td>
                    <span className={`${styles.statusTag} ${styles[STATUS_CLASSES[product.status] || 'statusDefault']}`}>
                      {STATUS_LABELS[product.status] || product.status}
                    </span>
                  </td></tr>
                </tbody>
              </table>
            </div>
            <div className={styles.infoSection}>
              <h4 className={styles.sectionSubtitle}>価格・数量</h4>
              <table className={styles.infoTable}>
                <tbody>
                  <tr><th>単価</th><td className={styles.amount}>{formatCurrency(product.unitPrice)}</td></tr>
                  <tr><th>単位</th><td>{product.unit || '-'}</td></tr>
                  <tr><th>最低発注数</th><td>{product.minimumOrderQuantity}</td></tr>
                  <tr><th>リードタイム</th><td>{product.leadTimeDays} 日</td></tr>
                </tbody>
              </table>
            </div>
            <div className={styles.infoSection}>
              <h4 className={styles.sectionSubtitle}>物理情報</h4>
              <table className={styles.infoTable}>
                <tbody>
                  <tr><th>重量</th><td>{product.weight ? product.weight + ' kg' : '-'}</td></tr>
                  <tr><th>寸法</th><td>{product.dimensions || '-'}</td></tr>
                  {product.modelNumber && <tr><th>型番</th><td>{product.modelNumber}</td></tr>}
                  {product.barcode && <tr><th>バーコード</th><td className={styles.mono}>{product.barcode}</td></tr>}
                </tbody>
              </table>
            </div>
            <div className={styles.infoSection}>
              <h4 className={styles.sectionSubtitle}>在庫状況</h4>
              <div className={styles.stockSummary}>
                <div className={styles.stockItem}><span className={styles.stockLabel}>合計在庫</span><span className={styles.stockValue}>{totalStock}</span></div>
                <div className={styles.stockItem}><span className={styles.stockLabel}>予約済み</span><span className={`${styles.stockValue} ${styles.reserved}`}>{totalReserved}</span></div>
                <div className={styles.stockItem}><span className={styles.stockLabel}>利用可能</span><span className={`${styles.stockValue} ${styles.available}`}>{totalAvailable}</span></div>
              </div>
            </div>
            <div className={`${styles.infoSection} ${styles.fullWidth}`}>
              <h4 className={styles.sectionSubtitle}>管理情報</h4>
              <table className={styles.infoTable}>
                <tbody>
                  <tr><th>登録日</th><td>{formatDateTime(product.createdAt)}</td></tr>
                  <tr><th>最終更新日</th><td>{formatDateTime(product.updatedAt)}</td></tr>
                  <tr><th>備考</th><td>{product.notes || '-'}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 仕様 */}
        {activeTab === 1 && (
          product.specifications.length > 0 ? (
            <table className={styles.specTable}>
              <thead><tr><th>項目</th><th>値</th></tr></thead>
              <tbody>
                {product.specifications.map((s, i) => (
                  <tr key={i}><td className={styles.specKey}>{s.key}</td><td>{s.value}</td></tr>
                ))}
              </tbody>
            </table>
          ) : <div className={styles.emptyState}>仕様情報は登録されていません</div>
        )}

        {/* 画像 */}
        {activeTab === 2 && (
          product.images.length > 0 ? (
            <div className={styles.imageGrid}>
              {product.images.map(img => (
                <div key={img.id} className={`${styles.imageCard} ${img.isPrimary ? styles.primary : ''}`}>
                  <div className={styles.imageWrapper}>
                    <div className={styles.imagePlaceholder}>{img.altText || 'No Image'}</div>
                    {img.isPrimary && <span className={styles.primaryBadge}>メイン</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : <div className={styles.emptyState}>画像は登録されていません</div>
        )}

        {/* 在庫状況 */}
        {activeTab === 3 && (
          product.inventoryItems.length > 0 ? (
            <table className={styles.dataTable}>
              <thead><tr><th>倉庫</th><th>在庫数</th><th>予約</th><th>利用可能</th></tr></thead>
              <tbody>
                {product.inventoryItems.map((inv, i) => (
                  <tr key={i}>
                    <td>{inv.warehouseName}</td>
                    <td className={styles.number}>{inv.quantity}</td>
                    <td className={styles.number}>{inv.reservedQuantity}</td>
                    <td className={styles.number}>{inv.availableQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <div className={styles.emptyState}>在庫情報はありません</div>
        )}

        {/* サプライヤー */}
        {activeTab === 4 && (
          product.suppliers.length > 0 ? (
            <table className={styles.dataTable}>
              <thead><tr><th>サプライヤー名</th><th>サプライヤーSKU</th><th>単価</th><th>リードタイム</th><th>優先</th></tr></thead>
              <tbody>
                {product.suppliers.map((s, i) => (
                  <tr key={i} className={s.isPreferred ? styles.preferred : ''}>
                    <td>{s.supplierName}</td>
                    <td className={styles.mono}>{s.supplierSku}</td>
                    <td className={styles.amount}>{formatCurrency(s.unitPrice)}</td>
                    <td>{s.leadTimeDays} 日</td>
                    <td>{s.isPreferred && <span className={styles.preferredBadge}>優先</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <div className={styles.emptyState}>サプライヤー情報は登録されていません</div>
        )}

        {/* 変更履歴 */}
        {activeTab === 5 && (
          product.changeLog.length > 0 ? (
            <div className={styles.changelog}>
              {product.changeLog.map(entry => (
                <div key={entry.id} className={styles.changelogEntry}>
                  <div className={styles.timeline}>
                    <div className={styles.timelineDot} />
                    <div className={styles.timelineLine} />
                  </div>
                  <div className={styles.changelogContent}>
                    <div className={styles.changelogHeader}>
                      <span className={styles.changelogField}>{entry.field}</span>
                      <span className={styles.changelogDate}>{formatDateTime(entry.changedAt)}</span>
                    </div>
                    <div className={styles.changelogValues}>
                      {entry.oldValue && entry.oldValue !== '-' && (
                        <><span className={styles.oldValue}>{entry.oldValue}</span><span className={styles.arrow}>→</span></>
                      )}
                      <span className={styles.newValue}>{entry.newValue}</span>
                    </div>
                    <span className={styles.changelogUser}>{entry.changedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : <div className={styles.emptyState}>変更履歴はありません</div>
        )}
      </div>
    </div>
  )
}
