import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../Users/user.service';
import { Lesson } from '../../models/lesson/lesson.module'; 

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient, private userServise: UserService) { }
  getAllLessonsByCourseId(courseId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/courses/${courseId}/lessons`, { headers: this.userServise.getHeders() });
  }
  addLesson(lesson: Lesson, courseId: number): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/courses/${courseId}/lessons`, lesson,{ headers: this.userServise.getHeders() });
  }
  deleteLesson(idLesson: number,courseId:number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/courses/${courseId}/lessons/:${idLesson},`,{ headers: this.userServise.getHeders() })
  }
  updateLesson(courseId: number,lesson:Lesson): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/courses/:${lesson.id}/lessons/:${courseId}`,lesson,{ headers: this.userServise.getHeders() })
  }
}
