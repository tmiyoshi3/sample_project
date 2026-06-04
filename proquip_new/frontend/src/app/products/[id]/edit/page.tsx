import ProductForm from '../../ProductForm';

const API_BASE = process.env.API_BASE_URL || 'http://localhost:8081';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [productRes, categoriesRes, manufacturersRes] = await Promise.all([
    fetch(`${API_BASE}/api/products/${params.id}`, { cache: 'no-store' }),
    fetch(`${API_BASE}/api/products/categories`, { cache: 'no-store' }),
    fetch(`${API_BASE}/api/products/manufacturers`, { cache: 'no-store' }),
  ]);

  if (!productRes.ok) {
    return <div style={{ padding: '60px 20px', textAlign: 'center', color: '#9ca3af' }}>製品が見つかりません</div>;
  }

  const [product, categories, manufacturers] = await Promise.all([
    productRes.json(),
    categoriesRes.json(),
    manufacturersRes.json(),
  ]);

  const initialData = {
    id: product.id,
    sku: product.sku || '',
    name: product.name || '',
    description: product.description || '',
    categoryId: product.categoryId ? String(product.categoryId) : '',
    manufacturerId: product.manufacturerId ? String(product.manufacturerId) : '',
    unitPrice: product.unitPrice ? String(product.unitPrice) : '',
    status: product.status || 'ACTIVE',
    minimumOrderQuantity: product.minimumOrderQuantity ? String(product.minimumOrderQuantity) : '',
    leadTimeDays: product.leadTimeDays ? String(product.leadTimeDays) : '',
    notes: product.notes || '',
  };

  return <ProductForm categories={categories} manufacturers={manufacturers} initialData={initialData} isEdit />;
}
