import ProductForm from '../ProductForm';

const API_BASE = process.env.API_BASE_URL || 'http://localhost:8081';

export default async function NewProductPage() {
  const [categoriesRes, manufacturersRes] = await Promise.all([
    fetch(`${API_BASE}/api/products/categories`, { cache: 'no-store' }),
    fetch(`${API_BASE}/api/products/manufacturers`, { cache: 'no-store' }),
  ]);
  const [categories, manufacturers] = await Promise.all([
    categoriesRes.json(),
    manufacturersRes.json(),
  ]);

  return <ProductForm categories={categories} manufacturers={manufacturers} />;
}
