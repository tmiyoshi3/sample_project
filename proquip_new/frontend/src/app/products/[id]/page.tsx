import ProductDetailClient from './ProductDetailClient';

const API_BASE = process.env.API_BASE_URL || 'http://localhost:8081';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${API_BASE}/api/products/${params.id}`, { cache: 'no-store' });
  if (!res.ok) {
    return <div style={{ padding: '60px 20px', textAlign: 'center', color: '#9ca3af' }}>製品が見つかりません</div>;
  }
  const product = await res.json();
  return <ProductDetailClient product={product} />;
}
