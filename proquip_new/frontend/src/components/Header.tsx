'use client'

import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <span className={styles.logoText}>ProQuip</span>
          <span className={styles.logoSubtitle}>調達・在庫管理</span>
        </div>
      </div>
      <div className={styles.center}>
        <input
          type="search"
          placeholder="製品・サプライヤー・注文番号を検索..."
          className={styles.searchInput}
        />
      </div>
      <div className={styles.right}>
        <span className={styles.userName}>管理者</span>
      </div>
    </header>
  )
}
