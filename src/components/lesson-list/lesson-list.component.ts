import { Component } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { CourseService } from '../../services/Courses/course.service';
import { UserService } from '../../services/Users/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Lesson } from '../../models/lesson/lesson.module';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../services/Lesson/lesson.service';
import { AddLessonDialogComponent } from '../add-lesson-dialog/add-lesson-dialog.component';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css'
})
export class LessonListComponent {

  constructor(public coursesServise: CourseService,
    public TheUser: UserService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private lessonService: LessonService,
    private route: ActivatedRoute,
  ) { }
  coursId!: number;
  course: any;
  user: any;
  lessons: Lesson[] | undefined;

  ngOnInit(): void {
    this.coursId = +this.route.snapshot.paramMap.get('id')!;
    this.coursesServise.getCourseById(this.coursId).subscribe({
      next: (response) => { this.course = response },
      error: (e) => { }
    })
    
    this.lessonService.getAllLessonsByCourseId(this.coursId).subscribe({
      next: (response) => {
        this.lessons = response
        console.log(response);

      },
      error: (e) => { }
    })
  }
  deleteLesson(l: Lesson) {
    this.lessons = this.lessons?.filter((lesson) => lesson.id !== l.id);
    const courseId = this.activatedRoute.snapshot.paramMap.get('id');
    if (courseId) {
      this.lessonService.deleteLesson(Number(l.id), Number(courseId)).subscribe({
          next: (response) => {
            alert('✅' + response.message);
          },
          error: (e) => { alert('❌' + e.error.message); }
        }
      );
    }
  }
  add() {
    const dialogRef = this.dialog.open(AddLessonDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newLesson = new Lesson(result.id, result.title, result.courseId, result.content);
        this.lessons?.push(newLesson);
        this.lessonService.addLesson(newLesson,Number(newLesson.courseId)).subscribe({
          next: (response) => {
            alert('✅' + response.message);
          },
          error: (e) => { alert('❌' + e.error.message); }
        });
        this.lessonService.getAllLessonsByCourseId(Number(newLesson.courseId)).subscribe((data) => {
          this.lessons = data;
        });
      }
    });

  }
  trackByIndex(index: number): number {
    return index + 1;
  }
}
