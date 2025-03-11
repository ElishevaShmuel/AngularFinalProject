import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../Users/user.service';
import { Course } from '../../models/cours/cours.module';
import { title } from 'process';

@Injectable({
  providedIn: 'root'
}) 
export class CourseService {
  private coursesSubject: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();
  constructor(private http: HttpClient, private userService: UserService) {}

  getCourses(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/courses', { headers: this.userService.getHeders() });
  }
  getCourseById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/courses/${id}`, { headers: this.userService.getHeders() })
  }
  // add(): Observable<any> {

  //   return this.http.post<any>(`http://localhost:3000/api/courses`,{title:"fd",describtion:"gfou"}, { headers: this.userService.getHeders() })
  // }

  add(newCourse: Course): Observable<any> {
    const defaultCourse = {
      title: "wow", // כותרת הקורס
      description: "angular", // תיאור הקורס
    };

    return this.http.post<any>('http://localhost:3000/api/courses', newCourse, {
      headers: this.userService.getHeders() // הוספת ה-Headers
    });
  }

  delete(courseId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/courses/${courseId}`, { headers: this.userService.getHeders() })
  }
  update(courseId: number, course: Course): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/courses/${courseId}`, course, { headers: this.userService.getHeders() })
  }

  addStudentToCourse(courseId: number): Observable<any> {
    const userId:number=this.userService.getUserId();

    return this.http.post(`http://localhost:3000/api/courses/${courseId}/enroll`,{userId},{
      headers: this.userService.getHeders()
    });
  }
  

  deleteStudentFromCourse(courseId: number): Observable<any> {
    const userId:number=this.userService.getUserId();
    return this.http.delete(`http://localhost:3000/api/courses/${courseId}/unenroll`, {headers: this.userService.getHeders()});
  }
  
}