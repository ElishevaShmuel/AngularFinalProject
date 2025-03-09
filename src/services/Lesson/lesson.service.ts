import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Lesson } from '../../models/lesson/lesson.module'; // Adjust the path as necessary


export class LessonService {
private url = "http://localhost:3000/api/courses/:courseId/lessons";
  lessons$ : Observable<Lesson[]> = new Observable<Lesson[]>();

  constructor(private http:HttpClient) { }

  getlessons() {
    this.http.get<Lesson[]>(`${this.url}`).subscribe(data=>{
      this.lessons$ = of(data);
     });
  }
  getlessonById(id: string) {
    const lesson =this.http.get<Lesson>(`${this.url}/${id}`).subscribe(
      data => {
        return data;
      }
    ); 
    if (!lesson) {
      throw new Error('course not found');
    }
    return lesson;
  }

  putlesson(lesson: Lesson) {
    this.http.put<Lesson>(`${this.url}/${lesson.id}`, lesson);
    this.getlessons();
  }
  
  postlesson(lesson: Lesson) {
    this.http.post<Lesson>(`${this.url}`, lesson);
    this.getlessons();
  }

  deletelesson(id: string) {
    this.http.delete<Lesson>(`${id}`);
    this.getlessons();
  }
  
}
