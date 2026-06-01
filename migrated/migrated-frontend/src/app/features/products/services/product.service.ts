import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CategoryResponse,
  ChangeLogResponse,
  ManufacturerOption,
  PageResult,
  ProductBundle,
  ProductDetailResponse,
  ProductResponse,
} from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(params: {
    page?: number;
    size?: number;
    keyword?: string;
    categoryId?: number;
    manufacturerId?: number;
    status?: string;
    sort?: string;
  }): Observable<PageResult<ProductResponse>> {
    let httpParams = new HttpParams();
    if (params.page != null) httpParams = httpParams.set('page', params.page.toString());
    if (params.size != null) httpParams = httpParams.set('size', params.size.toString());
    if (params.keyword) httpParams = httpParams.set('keyword', params.keyword);
    if (params.categoryId) httpParams = httpParams.set('categoryId', params.categoryId.toString());
    if (params.manufacturerId)
      httpParams = httpParams.set('manufacturerId', params.manufacturerId.toString());
    if (params.status) httpParams = httpParams.set('status', params.status);
    if (params.sort) httpParams = httpParams.set('sort', params.sort);
    return this.http.get<PageResult<ProductResponse>>('/api/products', { params: httpParams });
  }

  getProduct(id: number): Observable<ProductDetailResponse> {
    return this.http.get<ProductDetailResponse>(`/api/products/${id}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`/api/products/${id}`);
  }

  getProductChangeLog(id: number): Observable<ChangeLogResponse[]> {
    return this.http.get<ChangeLogResponse[]>(`/api/products/${id}/change-log`);
  }

  getCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>('/api/products/categories');
  }

  createCategory(data: {
    name: string;
    description: string;
    parentId: number | null;
  }): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>('/api/products/categories', data);
  }

  updateCategory(
    id: number,
    data: { name: string; description: string; parentId: number | null },
  ): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(`/api/products/categories/${id}`, data);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`/api/products/categories/${id}`);
  }

  getManufacturers(): Observable<ManufacturerOption[]> {
    return this.http.get<ManufacturerOption[]>('/api/products/manufacturers');
  }

  exportCsv(): Observable<Blob> {
    return this.http.get('/api/products/export', {
      responseType: 'blob',
    });
  }

  getBundles(): Observable<ProductBundle[]> {
    return this.http.get<ProductBundle[]>('/api/products/bundles');
  }

  createBundle(data: any): Observable<any> {
    return this.http.post('/api/products/bundles', data);
  }

  updateBundle(id: number, data: any): Observable<any> {
    return this.http.put(`/api/products/bundles/${id}`, data);
  }

  deleteBundle(id: number): Observable<void> {
    return this.http.delete<void>(`/api/products/bundles/${id}`);
  }

  createProduct(data: any): Observable<{ id: number }> {
    return this.http.post<{ id: number }>('/api/products', data);
  }

  updateProduct(id: number, data: any): Observable<{ id: number }> {
    return this.http.put<{ id: number }>(`/api/products/${id}`, data);
  }

  checkSkuExists(sku: string): Observable<boolean> {
    return this.http.get<boolean>('/api/products/check-sku', {
      params: { sku },
    });
  }

  uploadImage(productId: number, file: File, isPrimary: boolean = false): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('isPrimary', String(isPrimary));
    return this.http.post(`/api/products/${productId}/images`, formData);
  }

  deleteImage(productId: number, imageId: number): Observable<void> {
    return this.http.delete<void>(`/api/products/${productId}/images/${imageId}`);
  }

  uploadDocument(productId: number, file: File, docType: string = 'DATASHEET'): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('docType', docType);
    return this.http.post(`/api/products/${productId}/documents`, formData);
  }

  deleteDocument(productId: number, docId: number): Observable<void> {
    return this.http.delete<void>(`/api/products/${productId}/documents/${docId}`);
  }
}
