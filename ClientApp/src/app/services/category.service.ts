
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Category } from '../models/category.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryUrl = 'http://localhost:8000/api/Categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  createCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Category>(this.categoryUrl, category, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.categoryUrl}/${category.categoryID}`;
    return this.http.put<Category>(url, category, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getCategory(id: number): Observable<Category> {
    const url = `${this.categoryUrl}/${id}`;
    return this.http.get<Category>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    return throwError(err);
  }

}
