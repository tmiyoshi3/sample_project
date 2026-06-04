import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { ProductList } from '@/components/ProductList'

export default function ProductsPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, padding: '24px' }}>
          <ProductList />
        </main>
      </div>
    </div>
  )
}
