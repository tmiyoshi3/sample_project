'use client'

import { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8280'

interface Summary {
  totalProducts: number
  activeSuppliers: number
  pendingOrders: number
  lowStockItems: number
  pendingApprovals: number
}

interface RecentOrder {
  id: number
  orderNumber: string
  supplierName: string
  totalAmount: number
  status: string
  orderDate: string
}

interface SpendingTrend {
  month: string
  amount: number
}

interface CategorySpending {
  categoryName: string
  orderCount: number
  totalAmount: number
}

interface LowStockItem {
  id: number
  productId: number
  productName: string
  productSku: string
  quantity: number
  minimumStock: number
  status: string
}

interface Budget {
  id: number
  name: string
  totalAmount: number
  usedAmount: number
}

const STATUS_LABELS: Record<string, string> = {
  DRAFT: '下書き',
  SUBMITTED: '提出済',
  PENDING_APPROVAL: '承認待ち',
  APPROVED: '承認済',
  REJECTED: '却下',
  ORDERED: '発注済',
  RECEIVED: '受入済',
  CANCELLED: 'キャンセル',
  CLOSED: '完了',
}

const STATUS_CLASSES: Record<string, string> = {
  DRAFT: 'statusDraft',
  SUBMITTED: 'statusPending',
  PENDING_APPROVAL: 'statusPending',
  APPROVED: 'statusApproved',
  REJECTED: 'statusRejected',
  ORDERED: 'statusOrdered',
  RECEIVED: 'statusCompleted',
  CANCELLED: 'statusCancelled',
  CLOSED: 'statusCompleted',
}

function formatCurrency(amount: number | null): string {
  if (amount == null) return '¥0'
  return '¥' + amount.toLocaleString('ja-JP')
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return '-'
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}年${m}月${day}日`
}

export function Dashboard() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [spendingTrend, setSpendingTrend] = useState<SpendingTrend[]>([])
  const [categorySpending, setCategorySpending] = useState<CategorySpending[]>([])
  const [lowStockItems, setLowStockItems] = useState<LowStockItem[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = () => {
    setLoading(true)
    setError('')

    Promise.all([
      fetch(`${API_BASE}/api/dashboard/summary`).then(r => r.json()),
      fetch(`${API_BASE}/api/dashboard/recent-orders`).then(r => r.json()),
      fetch(`${API_BASE}/api/dashboard/spending-trend`).then(r => r.json()),
      fetch(`${API_BASE}/api/dashboard/category-spending`).then(r => r.json()),
      fetch(`${API_BASE}/api/dashboard/low-stock-items`).then(r => r.json()),
      fetch(`${API_BASE}/api/dashboard/budgets`).then(r => r.json()),
    ])
      .then(([s, orders, trend, cats, stock, b]) => {
        setSummary(s)
        setRecentOrders(orders)
        setSpendingTrend(trend)
        setCategorySpending(cats)
        setLowStockItems(stock)
        setBudgets(b)
        setLoading(false)
      })
      .catch(() => {
        setError('データの取得に失敗しました。再度お試しください。')
        setLoading(false)
      })
  }

  useEffect(() => { loadData() }, [])

  const budgetTotal = budgets.reduce((s, b) => s + (b.totalAmount || 0), 0)
  const budgetSpent = budgets.reduce((s, b) => s + (b.usedAmount || 0), 0)
  const budgetUtilization = budgetTotal > 0 ? Math.round((budgetSpent / budgetTotal) * 100) : 0

  const maxSpending = Math.max(...spendingTrend.map(d => d.amount || 0), 1)
  const totalCategoryAmount = categorySpending.reduce((s, c) => s + (c.totalAmount || 0), 0)

  if (loading) {
    return <div className={styles.loading}>読み込み中...</div>
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>ダッシュボード</h1>
        <p className={styles.pageDescription}>調達・在庫管理の概況</p>
      </div>

      {error && (
        <div className={styles.errorBanner}>
          <span>⚠ {error}</span>
          <button className={styles.btnRetry} onClick={loadData}>再試行</button>
        </div>
      )}

      {/* サマリーカード */}
      <section className={styles.summaryCards}>
        <div className={`${styles.summaryCard} ${styles.cardOrders}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>商品数</h3>
          </div>
          <div className={styles.cardMainValue}>{summary?.totalProducts ?? 0}</div>
          <div className={styles.cardDescription}>有効な商品数</div>
        </div>

        <div className={`${styles.summaryCard} ${styles.cardStock}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>在庫アラート</h3>
          </div>
          <div className={`${styles.cardMainValue} ${(summary?.lowStockItems ?? 0) > 0 ? styles.alertValue : ''}`}>
            {summary?.lowStockItems ?? 0}
          </div>
          <div className={styles.cardDescription}>在庫不足の製品</div>
        </div>

        <div className={`${styles.summaryCard} ${styles.cardApprovals}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>承認待ち</h3>
          </div>
          <div className={`${styles.cardMainValue} ${(summary?.pendingApprovals ?? 0) > 0 ? styles.pendingValue : ''}`}>
            {summary?.pendingApprovals ?? 0}
          </div>
          <div className={styles.cardDescription}>承認が必要なタスク</div>
        </div>

        <div className={`${styles.summaryCard} ${styles.cardBudget}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>予算消化率</h3>
          </div>
          <div className={styles.cardMainValue}>{budgetUtilization}%</div>
          <div className={styles.budgetBar}>
            <div
              className={`${styles.budgetBarFill} ${budgetUtilization > 95 ? styles.budgetDanger : budgetUtilization > 80 ? styles.budgetWarning : ''}`}
              style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
            />
          </div>
          <div className={styles.budgetDetail}>
            {formatCurrency(budgetSpent)} / {formatCurrency(budgetTotal)}
          </div>
        </div>
      </section>

      {/* チャートセクション */}
      <section className={styles.chartsSection}>
        <div className={styles.chartContainer}>
          <h3 className={styles.sectionTitle}>月別発注金額推移</h3>
          <div className={styles.chartBars}>
            {spendingTrend.map((item) => (
              <div key={item.month} className={styles.chartBarWrapper}>
                <div
                  className={styles.chartBar}
                  style={{ height: `${(item.amount / maxSpending) * 200}px` }}
                  title={`${item.month}: ${formatCurrency(item.amount)}`}
                />
                <span className={styles.chartBarLabel}>
                  {item.month ? item.month.slice(5) : ''}
                </span>
              </div>
            ))}
            {spendingTrend.length === 0 && (
              <div className={styles.emptyState}>データがありません</div>
            )}
          </div>
        </div>

        <div className={styles.chartContainer}>
          <h3 className={styles.sectionTitle}>カテゴリ別支出割合</h3>
          <div className={styles.categoryList}>
            {categorySpending.map((item) => {
              const pct = totalCategoryAmount > 0
                ? Math.round((item.totalAmount / totalCategoryAmount) * 100) : 0
              return (
                <div key={item.categoryName} className={styles.categoryItem}>
                  <span className={styles.categoryName}>{item.categoryName}</span>
                  <div className={styles.categoryBar}>
                    <div className={styles.categoryBarFill} style={{ width: `${pct}%` }} />
                  </div>
                  <span className={styles.categoryPct}>{pct}%</span>
                  <span className={styles.categoryAmount}>{formatCurrency(item.totalAmount)}</span>
                </div>
              )
            })}
            {categorySpending.length === 0 && (
              <div className={styles.emptyState}>データがありません</div>
            )}
          </div>
        </div>
      </section>

      {/* 詳細セクション */}
      <section className={styles.detailSection}>
        <div className={styles.detailPanel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.sectionTitle}>最近の発注</h3>
          </div>
          <div className={styles.panelBody}>
            {recentOrders.length > 0 ? (
              <table className={styles.simpleTable}>
                <thead>
                  <tr>
                    <th>発注番号</th>
                    <th>サプライヤー</th>
                    <th>発注日</th>
                    <th>金額</th>
                    <th>ステータス</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className={styles.clickableRow}>
                      <td className={styles.orderNumber}>{order.orderNumber}</td>
                      <td>{order.supplierName}</td>
                      <td>{formatDate(order.orderDate)}</td>
                      <td className={styles.amount}>{formatCurrency(order.totalAmount)}</td>
                      <td>
                        <span className={`${styles.statusTag} ${styles[STATUS_CLASSES[order.status] || 'statusDefault']}`}>
                          {STATUS_LABELS[order.status] || order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.emptyState}>最近の発注はありません</div>
            )}
          </div>
        </div>

        <div className={styles.detailPanel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.sectionTitle}>在庫アラート</h3>
          </div>
          <div className={styles.panelBody}>
            {lowStockItems.length > 0 ? (
              <div className={styles.alertList}>
                {lowStockItems.map((item) => (
                  <div key={item.id} className={styles.alertItem}>
                    <div className={styles.alertItemInfo}>
                      <span className={styles.alertProductName}>{item.productName}</span>
                      <span className={styles.alertProductSku}>{item.productSku}</span>
                    </div>
                    <div className={styles.alertItemStock}>
                      <div className={styles.stockValues}>
                        <span className={`${styles.currentStock} ${item.quantity <= item.minimumStock / 2 ? styles.critical : ''}`}>
                          現在: {item.quantity}
                        </span>
                        <span className={styles.minimumStock}>最低: {item.minimumStock}</span>
                      </div>
                      <div className={styles.stockBar}>
                        <div
                          className={`${styles.stockBarFill} ${item.quantity <= item.minimumStock / 2 ? styles.stockCritical : styles.stockWarning}`}
                          style={{ width: `${item.minimumStock > 0 ? Math.min((item.quantity / item.minimumStock) * 100, 100) : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>在庫アラートはありません</div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
