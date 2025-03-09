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
    public userIn: AuthService,
    public TheUser: UserService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private lessonService: LessonService,
  ) { }

  user: any;
  lessons: Lesson[] | undefined;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.coursesServise.getCourseById(id).subscribe((data) => {
          this.lessons = data.lessons;
        });
        this.userIn.userIn$.subscribe(data => {
          this.user = data;
        });
      }
    });
  }
  deleteLesson(l: Lesson) {
    this.lessons = this.lessons?.filter((lesson) => lesson.id !== l.id);
    this.lessonService.deletelesson(l.id);
  }
  add() {
    const dialogRef = this.dialog.open(AddLessonDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newLesson = new Lesson(result.id, result.title, result.teacherId, result.description);
        this.lessons?.push(newLesson);
      }
    });
  }
  trackByIndex(index: number): number {
    return index + 1;
  }
}
