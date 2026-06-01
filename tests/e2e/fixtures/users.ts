export interface TestUser {
  username: string;
  password: string;
  role: string;
}

export const TEST_USERS: Record<string, TestUser> = {
  ADMIN: { username: 'admin', password: 'admin123', role: 'ADMIN' },
  MANAGER: { username: 'manager', password: 'manager123', role: 'MANAGER' },
  BUYER: { username: 'buyer', password: 'buyer123', role: 'BUYER' },
  WAREHOUSE_STAFF: { username: 'warehouse', password: 'warehouse123', role: 'WAREHOUSE_STAFF' },
  VIEWER: { username: 'viewer', password: 'viewer123', role: 'VIEWER' },
};

export const DEFAULT_USER = TEST_USERS.ADMIN;
