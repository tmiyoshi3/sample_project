import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Supplier,
  PageResult,
  SupplierContact,
  SupplierProduct,
  SupplierContract,
  SupplierCertification,
  SupplierRatingEntry,
} from '../models/supplier.model';

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

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}/${id}`);
  }

  getContacts(supplierId: number): Observable<SupplierContact[]> {
    return this.http.get<SupplierContact[]>(`${this.basePath}/${supplierId}/contacts`);
  }

  getSupplierProducts(supplierId: number): Observable<SupplierProduct[]> {
    return this.http.get<SupplierProduct[]>(`${this.basePath}/${supplierId}/products`);
  }

  addSupplierProduct(supplierId: number, data: any): Observable<any> {
    return this.http.post(`${this.basePath}/${supplierId}/products`, data);
  }

  removeSupplierProduct(supplierId: number, spId: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}/${supplierId}/products/${spId}`);
  }

  getContracts(supplierId: number): Observable<SupplierContract[]> {
    return this.http.get<SupplierContract[]>(`${this.basePath}/${supplierId}/contracts`);
  }

  createContract(supplierId: number, data: any): Observable<any> {
    return this.http.post(`${this.basePath}/${supplierId}/contracts`, data);
  }

  updateContract(supplierId: number, contractId: number, data: any): Observable<any> {
    return this.http.put(`${this.basePath}/${supplierId}/contracts/${contractId}`, data);
  }

  deleteContract(supplierId: number, contractId: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}/${supplierId}/contracts/${contractId}`);
  }

  getRatings(supplierId: number): Observable<SupplierRatingEntry[]> {
    return this.http.get<SupplierRatingEntry[]>(`${this.basePath}/${supplierId}/ratings`);
  }

  rateSupplier(supplierId: number, data: any): Observable<any> {
    return this.http.post(`${this.basePath}/${supplierId}/rate`, data);
  }

  getCertifications(supplierId: number): Observable<SupplierCertification[]> {
    return this.http.get<SupplierCertification[]>(`${this.basePath}/${supplierId}/certifications`);
  }

  createCertification(supplierId: number, data: any): Observable<any> {
    return this.http.post(`${this.basePath}/${supplierId}/certifications`, data);
  }

  updateCertification(supplierId: number, certId: number, data: any): Observable<any> {
    return this.http.put(`${this.basePath}/${supplierId}/certifications/${certId}`, data);
  }

  deleteCertification(supplierId: number, certId: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}/${supplierId}/certifications/${certId}`);
  }
}
