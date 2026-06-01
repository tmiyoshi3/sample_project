import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() collapsed = false;

  menuItems: MenuItem[] = [
    { icon: '\u25A0', label: 'ダッシュボード', route: '/dashboard' },
    { icon: '\u2605', label: '製品カタログ', route: '/products' },
    { icon: '\u2666', label: 'サプライヤー', route: '/suppliers' },
    { icon: '\u270E', label: '調達管理', route: '/procurement' },
    { icon: '\u25A3', label: '在庫管理', route: '/inventory' },
    { icon: '\u2302', label: '倉庫管理', route: '/warehouses' },
    { icon: '\u00A5', label: '価格管理', route: '/pricing' },
    { icon: '\u2630', label: 'レポート', route: '/reports' },
    { icon: '\u2699', label: '管理者設定', route: '/admin' },
    { icon: '\u21F5', label: 'インポート/エクスポート', route: '/import-export' },
  ];

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}
