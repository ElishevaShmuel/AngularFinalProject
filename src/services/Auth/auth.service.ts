import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user/user.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url = "http://localhost:3000/api/auth";

  private usersSubject = new BehaviorSubject<User|null>(null);
  userIn$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(user: {email: string, password: string}) {
    this.http.post<User>(`${this.url}/login`, user).subscribe(data => {
      this.usersSubject.next(data);
    });
  }

  register(user: User) {
    this.http.post<User>(`${this.url}/register`, user).subscribe(data => {
      this.usersSubject.next(data);
    });
  }
}
