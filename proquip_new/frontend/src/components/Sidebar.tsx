'use client'

import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'

const menuItems = [
  { label: 'ダッシュボード', route: '/', icon: '■' },
  { label: '製品カタログ', route: '/products', icon: '★' },
  { label: 'サプライヤー', route: '/suppliers', icon: '◆' },
  { label: '調達管理', route: '/procurement', icon: '✎' },
  { label: '在庫管理', route: '/inventory', icon: '▣' },
  { label: '倉庫管理', route: '/warehouses', icon: '⌂' },
  { label: '価格管理', route: '/pricing', icon: '¥' },
  { label: 'レポート', route: '/reports', icon: '☰' },
  { label: '管理者設定', route: '/admin', icon: '⚙' },
]

function isActive(route: string, pathname: string): boolean {
  if (route === '/') return pathname === '/'
  return pathname.startsWith(route)
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className={styles.sidebar}>
      <ul className={styles.navList}>
        {menuItems.map((item) => (
          <li key={item.route} className={`${styles.navItem} ${isActive(item.route, pathname) ? styles.active : ''}`}>
            <a href={item.route} className={styles.navLink}>
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.sidebarFooter}>
        <span className={styles.version}>v2.0.0</span>
      </div>
    </nav>
  )
}
