import { Injectable } from '@angular/core';
import { Course } from '../../models/cours/cours.module';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private url = "http://localhost:3000/api/courses";
  courses$ : Observable<Course[]> = new Observable<Course[]>();

  constructor(private http:HttpClient) { }

  getCourses() {
    this.http.get<Course[]>(`${this.url}`).subscribe(data=>{
      this.courses$ = of(data);
     });
  }
  getCourseById(id: string): Observable<Course> {
    const course =this.http.get<Course>(`${this.url}/${id}`);
    if (!course) {
      throw new Error('course not found');
    }
    return course;
  }

  putCourse(course: Course) {
    this.http.put<Course>(`${this.url}/${course.id}`, course).subscribe(
      data => {
        this.getCourses();
      }
    );
  }
  
  postCourse(course: Course) {
    this.http.post<Course>(`${this.url}`, course).subscribe(
      data => {
        this.getCourses();
      }
    );
  }

  deleteCourse(id: string) {
    this.http.delete<Course>(`${id}`).subscribe(
      data => {
        this.getCourses();
      }
    );
  }
  
}
