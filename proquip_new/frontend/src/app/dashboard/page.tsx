import DashboardClient from './DashboardClient';

const API_BASE = process.env.API_BASE_URL || 'http://localhost:8081';

async function fetchDashboardData() {
  const [summaryRes, recentOrdersRes, spendingTrendRes, categorySpendingRes, alertsRes, budgetRes] =
    await Promise.all([
      fetch(`${API_BASE}/api/dashboard/summary`, { cache: 'no-store' }),
      fetch(`${API_BASE}/api/dashboard/recent-orders`, { cache: 'no-store' }),
      fetch(`${API_BASE}/api/dashboard/spending-trend?months=24`, { cache: 'no-store' }),
      fetch(`${API_BASE}/api/dashboard/category-spending`, { cache: 'no-store' }),
      fetch(`${API_BASE}/api/dashboard/alerts`, { cache: 'no-store' }),
      fetch(`${API_BASE}/api/dashboard/budget?year=2024`, { cache: 'no-store' }),
    ]);

  const [summary, recentOrders, spendingTrend, categorySpending, alerts, budget] =
    await Promise.all([
      summaryRes.json(),
      recentOrdersRes.json(),
      spendingTrendRes.json(),
      categorySpendingRes.json(),
      alertsRes.json(),
      budgetRes.json(),
    ]);

  return { summary, recentOrders, spendingTrend, categorySpending, alerts, budget };
}

export default async function DashboardPage() {
  const data = await fetchDashboardData();
  return <DashboardClient data={data} />;
}
