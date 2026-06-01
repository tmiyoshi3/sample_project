import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { ProductCreateComponent } from './features/products/product-create/product-create.component';
import { ProductEditComponent } from './features/products/product-edit/product-edit.component';
import { CategoryManagementComponent } from './features/products/category-management/category-management.component';
import { BundleManagementComponent } from './features/products/bundle-management/bundle-management.component';
import { HeaderComponent } from './core/layout/header.component';
import { SidebarComponent } from './core/layout/sidebar.component';
import { FooterComponent } from './core/layout/footer.component';
import { PageHeaderComponent } from './shared/components/page-header/page-header.component';
import { FormFieldComponent } from './shared/components/form-field/form-field.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: window.location.origin,
        realm: 'proquip',
        clientId: 'proquip-web',
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
        pkceMethod: 'S256',
      },
      enableBearerInterceptor: true,
      bearerExcludedUrls: ['/assets', '/realms'],
    });
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductCreateComponent,
    ProductEditComponent,
    BundleManagementComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
    AppRoutingModule,
    CategoryManagementComponent,
    PageHeaderComponent,
    FormFieldComponent,
    LoadingSpinnerComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
