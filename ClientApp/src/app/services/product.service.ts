import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Product } from '../models/product.model';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'http://localhost:8000/api/Products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl)
      .pipe(
        delay(1000),
        catchError(this.handleError)
      );
  }

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Product>(this.productUrl, product, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productUrl}/${product.productID}`;
    return this.http.put<Product>(url, product, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProducts(categoryID: number): Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productUrl}/Delete/${categoryID}`;
    return this.http.put<number>(url, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    return throwError(err);
  }

}
