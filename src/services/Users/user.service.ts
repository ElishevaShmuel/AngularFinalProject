import { Injectable } from '@angular/core';
import { User } from '../../models/user/user.module';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:3000/api/users";

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUser() {
    this.http.get<User[]>(this.url).subscribe(data => {
      this.usersSubject.next(data); 
    });
  }

  getUserById(id: string) {
    this.http.get<User>(`${this.url}/${id}`).subscribe(data => {
      this.userSubject.next(data);
    });
  }

  putUser(user: User) {
    this.http.put<User>(`${this.url}/${user.id}`, user).subscribe(data => {
      this.userSubject.next(data);
      this.getUser();
    });
  }

  deleteUser(id: string) {
    this.http.delete(`${this.url}/${id}`).subscribe(() => {
      this.getUser(); 
    });
  }
}
