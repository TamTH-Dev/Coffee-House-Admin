import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8000/api/User';

  constructor(private http: HttpClient) { }

  login(formData: Object): Observable<any> {
    const loginUrl = `${this.userUrl}/Login`;
    return this.http.post<Object>(loginUrl, formData);
  }

  getUserProfile(): Observable<any> {
    const profileUrl = `${this.userUrl}/Profile`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
    return this.http.get<Object>(profileUrl, { headers });
  }
}