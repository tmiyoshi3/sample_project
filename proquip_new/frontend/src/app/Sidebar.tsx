'use client';

import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

const sidebarItems = [
  { label: 'ダッシュボード', href: '/dashboard', icon: '📊' },
  { label: '製品カタログ', href: '/products', icon: '📦' },
  { label: 'サプライヤー', href: '/suppliers', icon: '🏭' },
  { label: '調達管理', href: '/procurement', icon: '📋' },
  { label: '在庫管理', href: '/inventory', icon: '🏪' },
  { label: '倉庫管理', href: '/warehouses', icon: '🏢' },
  { label: '価格管理', href: '/pricing', icon: '💰' },
  { label: 'レポート', href: '/reports', icon: '📈' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebar}>
      <ul className={styles.navList}>
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <li key={item.href}>
              <a href={item.href}
                 className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}>
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <div className={styles.sidebarVersion}>v2.0.0</div>
    </nav>
  );
}
