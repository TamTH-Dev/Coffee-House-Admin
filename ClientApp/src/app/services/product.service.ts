import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Product } from '../models/product.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'http://localhost:8000/api/Products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  createProduct(product: Product): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<boolean>(this.productUrl, product, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productUrl}/${product.productID}`;
    return this.http.put<boolean>(url, product, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProducts(categoryID: number): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productUrl}/Delete/${categoryID}`;
    return this.http.put<boolean>(url, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  restoreProducts(categoryID: number): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productUrl}/Restore/${categoryID}`;
    return this.http.put<boolean>(url, { headers })
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
