import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  searchKeyword = '';
  showUserMenu = false;
  username = 'ゲスト';
  userRole = '';

  constructor(
    private router: Router,
    public authService: AuthService,
    public notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.notificationService.startPolling();
    this.loadUserInfo();
  }

  private async loadUserInfo(): Promise<void> {
    try {
      const profile = await this.authService.getUserProfile();
      if (profile.lastName || profile.firstName) {
        this.username = `${profile.lastName || ''} ${profile.firstName || ''}`.trim();
      } else {
        this.username = this.authService.getUsername();
      }
    } catch {
      this.username = 'ゲスト';
    }
    const roles = this.authService.getRoles();
    this.userRole = roles.length > 0 ? roles[0] : '一般ユーザー';
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onSearch(): void {
    const keyword = this.searchKeyword.trim();
    if (!keyword) return;
    const lower = keyword.toLowerCase();
    let route: string;
    if (lower.startsWith('po-') || (lower.startsWith('po') && /\d/.test(lower))) {
      route = '/procurement';
    } else if (lower.includes('サプライヤー') || lower.includes('仕入')) {
      route = '/suppliers';
    } else {
      route = '/products';
    }
    this.router.navigate([route], { queryParams: { search: keyword } });
    this.searchKeyword = '';
  }

  onToggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  onCloseUserMenu(): void {
    this.showUserMenu = false;
  }

  async onLogout(): Promise<void> {
    await this.authService.logout();
  }
}
