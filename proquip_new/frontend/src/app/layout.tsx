import './globals.css';
import styles from './layout.module.css';
import Sidebar from './Sidebar';

export const metadata = {
  title: 'ProQuip - 調達・在庫管理システム',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <div className={styles.appWrapper}>
          <header className={styles.header}>
            <div className={styles.headerLogo}>ProQuip 調達・在庫管理</div>
          </header>
          <div className={styles.mainContent}>
            <Sidebar />
            <main className={styles.pageContent}>
              {children}
            </main>
          </div>
          <footer className={styles.footer}>
            © 2026 ProQuip - 調達・在庫管理システム v2.0.0
          </footer>
        </div>
      </body>
    </html>
  );
}
