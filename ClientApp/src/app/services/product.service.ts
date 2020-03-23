import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Product, Category } from '../models/product.model';
import { tap, catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'http://localhost:8000/api/Product';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl)
      .pipe(
        delay(2000),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Product>(this.productUrl, product, { headers })
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productUrl}/${product.productID}`;
    return this.http.put<Product>(url, product, { headers })
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }

}
