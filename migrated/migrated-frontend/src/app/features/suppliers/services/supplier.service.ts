import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier, PageResult } from '../models/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private readonly basePath = '/api/suppliers';

  constructor(private http: HttpClient) {}

  getSuppliers(page: number = 0, size: number = 20): Observable<PageResult<Supplier>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageResult<Supplier>>(this.basePath, { params });
  }

  getSupplier(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.basePath}/${id}`);
  }

  compareSuppliers(supplierIds: number[]): Observable<any[]> {
    const params = new HttpParams().set('supplierIds', supplierIds.join(','));
    return this.http.get<any[]>(`${this.basePath}/compare`, { params });
  }
}
