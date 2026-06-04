'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './products.module.css';

interface Product {
  id: number;
  sku: string;
  name: string;
  categoryName: string;
  manufacturerName: string;
  unitPrice: number;
  status: string;
  totalStock: number;
  unit: string;
}

interface PageResult {
  content: Product[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

interface Category { id: number; name: string; parentId: number | null; }
interface Manufacturer { id: number; name: string; }

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

export default function ProductListClient({
  categories,
  manufacturers,
}: {
  categories: Category[];
  manufacturers: Manufacturer[];
}) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [manufacturerId, setManufacturerId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [sort, setSort] = useState('name,asc');
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('size', String(size));
    if (sort) params.set('sort', sort);
    if (keyword) params.set('keyword', keyword);
    if (categoryId) params.set('categoryId', categoryId);
    if (manufacturerId) params.set('manufacturerId', manufacturerId);
    if (status) params.set('status', status);

    const res = await fetch(`/api/products?${params.toString()}`);
    const data: PageResult = await res.json();
    setProducts(data.content);
    setTotalElements(data.totalElements);
    setTotalPages(data.totalPages);
    setLoading(false);
  }, [page, size, sort, keyword, categoryId, manufacturerId, status]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleSort = (col: string) => {
    const [currentCol, currentDir] = sort.split(',');
    if (currentCol === col) {
      setSort(`${col},${currentDir === 'asc' ? 'desc' : 'asc'}`);
    } else {
      setSort(`${col},asc`);
    }
    setPage(0);
  };

  const getSortIndicator = (col: string) => {
    const [currentCol, currentDir] = sort.split(',');
    if (currentCol !== col) return '';
    return currentDir === 'asc' ? ' ▲' : ' ▼';
  };

  const handleSearch = () => { setPage(0); fetchProducts(); };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>製品カタログ</h1>
          <p className={styles.pageDescription}>
            {totalElements}件の製品
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary} onClick={() => router.push('/products/new')}>
            + 新規登録
          </button>
        </div>
      </div>

      <div className={styles.filterBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="製品名またはSKUで検索..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <select className={styles.filterSelect} value={categoryId}
                onChange={(e) => { setCategoryId(e.target.value); setPage(0); }}>
          <option value="">すべてのカテゴリ</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select className={styles.filterSelect} value={manufacturerId}
                onChange={(e) => { setManufacturerId(e.target.value); setPage(0); }}>
          <option value="">すべてのメーカー</option>
          {manufacturers.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
        <select className={styles.filterSelect} value={status}
                onChange={(e) => { setStatus(e.target.value); setPage(0); }}>
          <option value="">すべてのステータス</option>
          <option value="ACTIVE">有効</option>
          <option value="INACTIVE">無効</option>
          <option value="DISCONTINUED">廃止</option>
        </select>
        <button className={styles.btnSearch} onClick={handleSearch}>検索</button>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loadingState}>読み込み中...</div>
        ) : products.length === 0 ? (
          <div className={styles.emptyState}>該当する製品がありません</div>
        ) : (
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th className={styles.sortable} onClick={() => handleSort('sku')}>
                  SKU{getSortIndicator('sku')}
                </th>
                <th className={styles.sortable} onClick={() => handleSort('name')}>
                  製品名{getSortIndicator('name')}
                </th>
                <th className={styles.sortable} onClick={() => handleSort('categoryName')}>
                  カテゴリ{getSortIndicator('categoryName')}
                </th>
                <th>メーカー</th>
                <th className={styles.sortable} onClick={() => handleSort('unitPrice')}>
                  単価{getSortIndicator('unitPrice')}
                </th>
                <th>在庫</th>
                <th className={styles.sortable} onClick={() => handleSort('status')}>
                  ステータス{getSortIndicator('status')}
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className={styles.clickableRow}
                    onClick={() => router.push(`/products/${p.id}`)}>
                  <td className={styles.skuCell}>{p.sku}</td>
                  <td className={styles.nameCell}>{p.name}</td>
                  <td>{p.categoryName || '-'}</td>
                  <td>{p.manufacturerName || '-'}</td>
                  <td className={styles.priceCell}>{formatCurrency(p.unitPrice)}</td>
                  <td className={styles.stockCell}>{p.totalStock}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[STATUS_CLASSES[p.status] || 'statusDefault'] || ''}`}>
                      {STATUS_LABELS[p.status] || p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button className={styles.pageBtn} disabled={page === 0}
                  onClick={() => setPage(page - 1)}>← 前へ</button>
          <span className={styles.pageInfo}>
            {page + 1} / {totalPages} ページ（{totalElements}件）
          </span>
          <button className={styles.pageBtn} disabled={page >= totalPages - 1}
                  onClick={() => setPage(page + 1)}>次へ →</button>
        </div>
      )}
    </div>
  );
}
