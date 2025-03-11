import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user/user.module';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { response } from 'express';
import { error, log } from 'console';
import { Session } from 'inspector';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }
  getHeders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
  }

  register(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/register', user);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/login', user);
  }

  saveToken(token: string) {

    sessionStorage.setItem('token', token);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }
  getUserId() {
    const token = this.getToken();
    if (!token)
      return null
    const payload = JSON.parse(atob(token.split('.')[1])); // מפענח את ה-JWT
    return payload.userId;
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  // getUserById(id:string):Observable<any>{
  //   return this.http.post<any>('http://localhost:3000/api/users/:id',id)
  // }

  getUserName(): string {
    const token = this.getToken();
    // console.log(token);
    if (!token) return '';
    try {
      const decodedToken: any = jwtDecode(token);
      // console.log(decodedToken)
      return decodedToken.userName;
    }
    catch (error) {
      alert('שגיאה בפענוח ה-Token:');
      return '';
    }
  }
}


