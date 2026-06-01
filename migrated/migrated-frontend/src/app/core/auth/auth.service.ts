import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private keycloak: KeycloakService) {}

  async getUserProfile(): Promise<{ firstName?: string; lastName?: string; email?: string }> {
    try {
      const profile = await this.keycloak.loadUserProfile();
      return profile;
    } catch {
      return {};
    }
  }

  getUsername(): string {
    try {
      return this.keycloak.getUsername() || 'ゲスト';
    } catch {
      return 'ゲスト';
    }
  }

  getRoles(): string[] {
    try {
      return this.keycloak.getUserRoles(true);
    } catch {
      return [];
    }
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  async logout(): Promise<void> {
    await this.keycloak.logout(window.location.origin);
  }
}
