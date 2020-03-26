
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Product } from '../models/product.model';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  login(formData: Object): Observable<any> {
    const loginUrl = `${this.baseUrl}/User/Login`;
    return this.http.post<Object>(loginUrl, formData);
  }

  getUserProfile(): Observable<Object> {
    const profileUrl = `${this.baseUrl}/UserProfile`;
    return this.http.get<Object>(profileUrl);
  }
}