'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import styles from './ProductList.module.css'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8280'

interface Product {
  id: number
  sku: string
  name: string
  categoryName: string
  manufacturerName: string
  unitPrice: number
  status: string
  stockQuantity: number
  categoryId: number | null
  manufacturerId: number | null
}

interface Category {
  id: number
  name: string
}

interface Manufacturer {
  id: number
  name: string
}

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: '有効',
  INACTIVE: '無効',
  DISCONTINUED: '廃止',
  PENDING_APPROVAL: '承認待ち',
  DRAFT: '下書き',
}

const STATUS_CLASSES: Record<string, string> = {
  ACTIVE: 'statusActive',
  INACTIVE: 'statusInactive',
  DISCONTINUED: 'statusDiscontinued',
  PENDING_APPROVAL: 'statusPending',
  DRAFT: 'statusDraft',
}

function formatCurrency(amount: number | null): string {
  if (amount == null) return '¥0'
  return '¥' + amount.toLocaleString('ja-JP')
}

export function ProductList() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize] = useState(20)
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedManufacturer, setSelectedManufacturer] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([])

  const loadProducts = useCallback(() => {
    setLoading(true)
    const params = new URLSearchParams()
    params.set('page', String(currentPage))
    params.set('size', String(pageSize))
    if (keyword) params.set('keyword', keyword)
    if (selectedCategory) params.set('categoryId', selectedCategory)
    if (selectedManufacturer) params.set('manufacturerId', selectedManufacturer)
    if (selectedStatus) params.set('status', selectedStatus)

    fetch(`${API_BASE}/api/products?${params}`)
      .then(r => r.json())
      .then(data => {
        setProducts(data.content || [])
        setTotalCount(data.totalElements || 0)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [currentPage, pageSize, keyword, selectedCategory, selectedManufacturer, selectedStatus])

  useEffect(() => {
    fetch(`${API_BASE}/api/products/categories`).then(r => r.json()).then(setCategories).catch(() => {})
    fetch(`${API_BASE}/api/products/manufacturers`).then(r => r.json()).then(setManufacturers).catch(() => {})
  }, [])

  useEffect(() => { loadProducts() }, [loadProducts])

  const totalPages = Math.ceil(totalCount / pageSize)
  const from = currentPage * pageSize + 1
  const to = Math.min((currentPage + 1) * pageSize, totalCount)

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCurrentPage(0)
      loadProducts()
    }
  }

  const resetFilters = () => {
    setKeyword('')
    setSelectedCategory('')
    setSelectedManufacturer('')
    setSelectedStatus('')
    setCurrentPage(0)
  }

  const hasFilters = keyword || selectedCategory || selectedManufacturer || selectedStatus

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>製品カタログ</h1>
        <p className={styles.pageDescription}>製品の一覧表示と管理</p>
      </div>

      {/* アクションバー */}
      <div className={styles.actionBar}>
        <div className={styles.actionLeft}>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="SKU、製品名で検索..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      {/* フィルターエリア */}
      <div className={styles.filterArea}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>カテゴリ</label>
          <select className={styles.filterSelect} value={selectedCategory}
            onChange={e => { setSelectedCategory(e.target.value); setCurrentPage(0) }}>
            <option value="">すべて</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>メーカー</label>
          <select className={styles.filterSelect} value={selectedManufacturer}
            onChange={e => { setSelectedManufacturer(e.target.value); setCurrentPage(0) }}>
            <option value="">すべて</option>
            {manufacturers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>ステータス</label>
          <select className={styles.filterSelect} value={selectedStatus}
            onChange={e => { setSelectedStatus(e.target.value); setCurrentPage(0) }}>
            <option value="">すべて</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
        {hasFilters && (
          <button className={styles.btnReset} onClick={resetFilters}>フィルターをリセット</button>
        )}
      </div>

      {/* テーブル */}
      {loading ? (
        <div className={styles.loading}>読み込み中...</div>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            {products.length > 0 ? (
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th style={{ width: 120 }}>SKU</th>
                    <th>製品名</th>
                    <th style={{ width: 140 }}>カテゴリ</th>
                    <th style={{ width: 140 }}>メーカー</th>
                    <th style={{ width: 120 }}>単価</th>
                    <th style={{ width: 100 }}>ステータス</th>
                    <th style={{ width: 80 }}>在庫数</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className={styles.clickableRow}
                      onClick={() => router.push(`/products/${p.id}`)}>
                      <td className={styles.mono}>{p.sku}</td>
                      <td>{p.name}</td>
                      <td>{p.categoryName}</td>
                      <td>{p.manufacturerName}</td>
                      <td className={styles.amount}>{formatCurrency(p.unitPrice)}</td>
                      <td>
                        <span className={`${styles.statusTag} ${styles[STATUS_CLASSES[p.status] || 'statusDefault']}`}>
                          {STATUS_LABELS[p.status] || p.status}
                        </span>
                      </td>
                      <td className={styles.number}>{p.stockQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.emptyState}>製品が見つかりませんでした</div>
            )}
          </div>

          {/* ページネーション */}
          {totalCount > 0 && (
            <div className={styles.pagination}>
              <span className={styles.resultCount}>
                全 {totalCount} 件中 {from} - {to} 件を表示
              </span>
              <div className={styles.pageButtons}>
                <button disabled={currentPage === 0}
                  onClick={() => setCurrentPage(p => p - 1)}>前へ</button>
                <span className={styles.pageInfo}>{currentPage + 1} / {totalPages}</span>
                <button disabled={currentPage >= totalPages - 1}
                  onClick={() => setCurrentPage(p => p + 1)}>次へ</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
