import ProductListClient from './ProductListClient';

const API_BASE = process.env.API_BASE_URL || 'http://localhost:8081';

async function fetchInitialData() {
  const [categoriesRes, manufacturersRes] = await Promise.all([
    fetch(`${API_BASE}/api/products/categories`, { cache: 'no-store' }),
    fetch(`${API_BASE}/api/products/manufacturers`, { cache: 'no-store' }),
  ]);

  const [categories, manufacturers] = await Promise.all([
    categoriesRes.json(),
    manufacturersRes.json(),
  ]);

  return { categories, manufacturers };
}

export default async function ProductsPage() {
  const { categories, manufacturers } = await fetchInitialData();
  return <ProductListClient categories={categories} manufacturers={manufacturers} />;
}
