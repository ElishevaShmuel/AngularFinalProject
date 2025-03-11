import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user/user.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url = "http://localhost:3000/api/auth";

  private usersSubject = new BehaviorSubject<User | null>(null);
  userIn$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) { }
  register(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/register', user);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/login', user);
  }
}
