'use client';

import styles from './dashboard.module.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardData {
  summary: {
    totalProducts: number;
    activeSuppliers: number;
    pendingOrders: number;
    lowStockItems: number;
    pendingApprovals: number;
  };
  recentOrders: Array<{
    id: number;
    orderNumber: string;
    supplierName: string;
    totalAmount: number;
    status: string;
    orderDate: string;
  }>;
  spendingTrend: Array<{ month: string; amount: number }>;
  categorySpending: Array<{ categoryName: string; orderCount: number; totalAmount: number }>;
  alerts: Array<{
    productId: number;
    productName: string;
    productSku: string;
    quantity: number;
    minimumStock: number;
  }>;
  budget: {
    totalAmount: number;
    spentAmount: number;
    utilization: number;
  };
}

const STATUS_LABELS: Record<string, string> = {
  DRAFT: '下書き',
  SUBMITTED: '提出済み',
  PENDING: '保留中',
  PENDING_APPROVAL: '承認待ち',
  APPROVED: '承認済み',
  REJECTED: '却下',
  ORDERED: '発注済み',
  SENT: '送付済み',
  PARTIALLY_RECEIVED: '一部受領',
  RECEIVED: '受領済み',
  DELIVERED: '配送済み',
  COMPLETED: '完了',
  CANCELLED: 'キャンセル',
  PAID: '支払済み',
  CLOSED: 'クローズ',
};

const STATUS_CLASSES: Record<string, string> = {
  DRAFT: 'statusDraft',
  SUBMITTED: 'statusPending',
  PENDING: 'statusPending',
  PENDING_APPROVAL: 'statusPending',
  APPROVED: 'statusApproved',
  REJECTED: 'statusRejected',
  ORDERED: 'statusOrdered',
  SENT: 'statusOrdered',
  PARTIALLY_RECEIVED: 'statusOrdered',
  RECEIVED: 'statusDelivered',
  DELIVERED: 'statusDelivered',
  COMPLETED: 'statusCompleted',
  CANCELLED: 'statusCancelled',
  PAID: 'statusCompleted',
  CLOSED: 'statusDraft',
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '-';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
}

function formatCurrency(amount: number | null): string {
  if (amount == null) return '¥0';
  return '¥' + amount.toLocaleString('ja-JP');
}

function formatChartMonth(month: string): string {
  const parts = month.split('-');
  if (parts.length === 2) {
    return `${parseInt(parts[1], 10)}月`;
  }
  return month;
}

export default function DashboardClient({ data }: { data: DashboardData }) {
  const { summary, recentOrders, spendingTrend, categorySpending, alerts, budget } = data;

  const totalCategoryAmount = categorySpending.reduce((sum, c) => sum + c.totalAmount, 0);

  const chartData = spendingTrend.map((item) => ({
    month: formatChartMonth(item.month),
    amount: item.amount,
  }));

  const pendingOrders = recentOrders.filter(
    (o) => o.status === 'PENDING' || o.status === 'PENDING_APPROVAL' || o.status === 'SUBMITTED'
  ).length;
  const approvedOrders = recentOrders.filter((o) => o.status === 'APPROVED').length;

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>ダッシュボード</h1>
        <p className={styles.pageDescription}>調達・在庫管理の概況</p>
      </div>

      <div className={styles.dashboardContainer}>
        {/* サマリーカード */}
        <section className={styles.summaryCards}>
          <div className={`${styles.summaryCard} ${styles.cardOrders}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>発注件数</h3>
              <span className={`${styles.cardIcon} ${styles.iconOrders}`} />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardMainValue}>{summary.pendingOrders + approvedOrders + pendingOrders}</div>
              <div className={styles.cardSubValues}>
                <div className={styles.subValue}>
                  <span className={styles.subLabel}>保留中</span>
                  <span className={`${styles.subCount} ${styles.pending}`}>{pendingOrders}</span>
                </div>
                <div className={styles.subValue}>
                  <span className={styles.subLabel}>承認済み</span>
                  <span className={`${styles.subCount} ${styles.approved}`}>{approvedOrders}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.summaryCard} ${styles.cardStock}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>在庫アラート</h3>
              <span className={`${styles.cardIcon} ${styles.iconAlert}`} />
            </div>
            <div className={styles.cardBody}>
              <div className={`${styles.cardMainValue} ${summary.lowStockItems > 0 ? styles.alertValue : ''}`}>
                {summary.lowStockItems}
              </div>
              <div className={styles.cardDescription}>在庫不足の製品があります</div>
            </div>
          </div>

          <div className={`${styles.summaryCard} ${styles.cardApprovals}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>承認待ち</h3>
              <span className={`${styles.cardIcon} ${styles.iconApproval}`} />
            </div>
            <div className={styles.cardBody}>
              <div className={`${styles.cardMainValue} ${summary.pendingApprovals > 0 ? styles.hasPending : ''}`}>
                {summary.pendingApprovals}
              </div>
              <div className={styles.cardDescription}>承認が必要なタスク</div>
            </div>
          </div>

          <div className={`${styles.summaryCard} ${styles.cardBudget}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>予算消化率</h3>
              <span className={`${styles.cardIcon} ${styles.iconBudget}`} />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardMainValue}>{budget.utilization}%</div>
              <div className={styles.budgetBar}>
                <div
                  className={`${styles.budgetBarFill} ${
                    budget.utilization > 95
                      ? styles.budgetDanger
                      : budget.utilization > 80
                        ? styles.budgetWarning
                        : ''
                  }`}
                  style={{ width: `${Math.min(budget.utilization, 100)}%` }}
                />
              </div>
              <div className={styles.budgetDetail}>
                {formatCurrency(budget.spentAmount)} / {formatCurrency(budget.totalAmount)}
              </div>
            </div>
          </div>
        </section>

        {/* チャートセクション */}
        <section className={styles.chartsSection}>
          <div className={styles.chartContainer}>
            <h3 className={styles.sectionTitle}>月別発注金額推移</h3>
            <div className={styles.chartArea}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={(v) => `¥${(v / 10000).toFixed(0)}万`} />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), '金額']}
                    labelStyle={{ color: '#374151' }}
                  />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={styles.chartContainer}>
            <h3 className={styles.sectionTitle}>カテゴリ別支出割合</h3>
            <div className={styles.categoryList}>
              {categorySpending.map((item) => {
                const percentage =
                  totalCategoryAmount > 0
                    ? Math.round((item.totalAmount / totalCategoryAmount) * 100)
                    : 0;
                return (
                  <div key={item.categoryName} className={styles.categoryItem}>
                    <div className={styles.categoryBarContainer}>
                      <span className={styles.categoryName}>{item.categoryName}</span>
                      <div className={styles.categoryBar}>
                        <div className={styles.categoryBarFill} style={{ width: `${percentage}%` }} />
                      </div>
                      <span className={styles.categoryPercentage}>{percentage}%</span>
                    </div>
                    <span className={styles.categoryAmount}>{formatCurrency(item.totalAmount)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 詳細セクション */}
        <section className={styles.detailSection}>
          <div className={`${styles.detailPanel} ${styles.recentOrders}`}>
            <div className={styles.panelHeader}>
              <h3 className={styles.sectionTitle}>最近の発注</h3>
              <span className={styles.linkMore}>すべて表示 →</span>
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
                          <span
                            className={`${styles.statusTag} ${
                              styles[STATUS_CLASSES[order.status] || 'statusDefault'] || ''
                            }`}
                          >
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

          <div className={`${styles.detailPanel} ${styles.stockAlerts}`}>
            <div className={styles.panelHeader}>
              <h3 className={styles.sectionTitle}>在庫アラート</h3>
              <span className={styles.linkMore}>すべて表示 →</span>
            </div>
            <div className={styles.panelBody}>
              {alerts.length > 0 ? (
                <div className={styles.alertList}>
                  {alerts.map((item) => {
                    const ratio = item.minimumStock > 0 ? (item.quantity / item.minimumStock) * 100 : 0;
                    const isCritical = item.quantity <= item.minimumStock / 2;
                    return (
                      <div key={item.productId} className={styles.alertItem}>
                        <div className={styles.alertItemInfo}>
                          <span className={styles.alertProductName}>{item.productName}</span>
                          <span className={styles.alertProductSku}>{item.productSku}</span>
                        </div>
                        <div className={styles.alertItemStock}>
                          <div className={styles.stockValues}>
                            <span className={`${styles.currentStock} ${isCritical ? styles.critical : ''}`}>
                              現在: {item.quantity}
                            </span>
                            <span className={styles.minimumStock}>最低: {item.minimumStock}</span>
                          </div>
                          <div className={styles.stockBar}>
                            <div
                              className={`${styles.stockBarFill} ${
                                isCritical ? styles.stockCritical : styles.stockWarning
                              }`}
                              style={{ width: `${Math.min(ratio, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.emptyState}>在庫アラートはありません</div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
