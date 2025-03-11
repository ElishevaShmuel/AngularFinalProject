import { Component } from '@angular/core';
import { CourseService } from '../../services/Courses/course.service';
import { Course } from '../../models/cours/cours.module';
import { CommonModule } from '@angular/common';
import { AddCourseDialogComponent } from '../add-course-dialog/add-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/Users/user.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-cours-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatToolbarModule, MatListModule],
  templateUrl: './cours-list.component.html',
  styleUrl: './cours-list.component.css'
})
export class CoursListComponent {

  constructor(public coursesServise: CourseService, public TheUser: UserService, private dialog: MatDialog) { }

  token: any;
  courses: Course[] = [];

  ngOnInit(): void {
    this.coursesServise.getCourses().subscribe({
      next: (response) => {
        this.courses = response;
        console.log(response);
      },
      error: (err) => {
        alert('❌ ERROR: ' + (err.error.message || 'משהו השתבש'))
      }
    });
    this.token = this.TheUser.getToken();
    console.log(this.courses);
    console.log(this.token);

  }

  join(course: Course) {
    this.coursesServise.addStudentToCourse(Number(course.id)).subscribe({
      next: (response) => {
        alert('✅' + response.message);
        course.isEnrolled = true;
      },
      error: (e) => { alert('❌' + e.error.message); }
    });
    this.coursesServise.getCourses().subscribe({
      next: (response) => {
        this.courses = response;
        console.log(response);
      },
      error: (err) => {
        alert('❌ ERROR: ' + (err.error.message || 'משהו השתבש'))
      }
    });
  }
  deleteCourse(c: Course) {
    this.coursesServise.delete(Number(c.id)).subscribe({
      next: (response) => {
        alert('✅' + response.message);
        c.isEnrolled = false;
      },
      error: (e) => { alert('❌' + e.error.message); }
    });
    this.courses = this.courses.filter((course) => course.id !== c.id);

  }
  addCourse() {
    const dialogRef = this.dialog.open(AddCourseDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newCourse = new Course(result.id, result.title, result.teacherId, result.description);
        this.courses.push(newCourse);
        this.coursesServise.add(newCourse).subscribe({
          next: (response) => {
            alert('✅' + response.message);
          },
          error: (e) => { alert('❌' + e.error.message); }
        });
        this.coursesServise.getCourses().subscribe({
          next: (response) => {
            this.courses = response;
            console.log(response);
          },
          error: (err) => {
            alert('❌ ERROR: ' + (err.error.message || 'משהו השתבש'))
          }
        });
      }
    });
  }

  leaveCourse(course: Course) {
    // course.students = course.students.filter((s: string) => s !== this.TheUser.getUserId());
    course.isEnrolled = false;

    this.coursesServise.deleteStudentFromCourse(Number(course.id)).subscribe({
      next: (response) => {
        alert('✅' + response.message);
      },
      error: (e) => { alert('❌' + e.error.message); }
    }
    );
    this.coursesServise.getCourses().subscribe({
      next: (response) => {
        this.courses = response;
        console.log(response);
      },
      error: (err) => {
        alert('❌ ERROR: ' + (err.error.message || 'משהו השתבש'))
      }
    });
  }
  trackByIndex(index: number): number {
    return index + 1;
  }
}
