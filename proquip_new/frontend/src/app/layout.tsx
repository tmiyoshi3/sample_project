import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ProQuip - 調達・在庫管理',
  description: 'エンタープライズ調達・在庫管理システム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
