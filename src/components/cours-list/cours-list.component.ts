import { Component } from '@angular/core';
import { CourseService } from '../../services/Courses/course.service';
import { Course } from '../../models/cours/cours.module';
import { AuthService } from '../../services/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { AddCourseDialogComponent } from '../add-course-dialog/add-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/Users/user.service';

@Component({
  selector: 'app-cours-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cours-list.component.html',
  styleUrl: './cours-list.component.css'
})
export class CoursListComponent {

  constructor(public coursesServise: CourseService, public userIn: AuthService,public TheUser:UserService, private dialog: MatDialog) { }

  user: any;
  courses: any;
 
  ngOnInit(): void {
    this.coursesServise.getCourses();
    this.courses = this.coursesServise.courses$;
    this.userIn.userIn$.subscribe(data => {
      this.user = data;
    })
  }

  join(course: Course) {    
      this.user.courses.push(course.id);
      course.students.push(this.user.id);
      this.TheUser.putUser(this.user);
      this.coursesServise.putCourse(course);
  }
  deleteCourse(c: Course) {
    this.courses=this.coursesServise.deleteCourse(c.id);
  }
  addCourse() {
    const dialogRef = this.dialog.open(AddCourseDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newCourse = new Course(result.id, result.title, result.teacherId, result.description);
        this.courses.push(newCourse);
      }
    });
  }

  leaveCourse(course: Course) {
    this.user.courses = this.user.courses.filter((c: string) => c !== course.id);
    course.students = course.students.filter((s: string) => s !== this.user.id);
    this.TheUser.putUser(this.user);
    this.coursesServise.putCourse(course);
  }
  trackByIndex(index: number): number {
    return index + 1;
  }
}
