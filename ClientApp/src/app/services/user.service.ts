import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8000/api/Users';

  constructor(private http: HttpClient) { }

  login(formData: Object): Observable<any> {
    const loginUrl = `${this.userUrl}/Login`;
    return this.http.post<Object>(loginUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserProfile(): Observable<any> {
    const profileUrl = `${this.userUrl}/Profile`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.get<Object>(profileUrl, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    return throwError(err);
  }

}