import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { ProductCreateComponent } from './features/products/product-create/product-create.component';
import { ProductEditComponent } from './features/products/product-edit/product-edit.component';
import { CategoryManagementComponent } from './features/products/category-management/category-management.component';
import { BundleManagementComponent } from './features/products/bundle-management/bundle-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/tasks', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'products/new', component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'products/categories', component: CategoryManagementComponent, canActivate: [AuthGuard] },
  { path: 'products/bundles', component: BundleManagementComponent, canActivate: [AuthGuard] },
  { path: 'products/:id/edit', component: ProductEditComponent, canActivate: [AuthGuard] },
  { path: 'products/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: 'suppliers', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'procurement', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'procurement/requisitions', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'procurement/orders', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'procurement/orders/:id', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'warehouses', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'pricing', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'import-export', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
