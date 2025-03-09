import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddCourseDialogComponent } from '../add-course-dialog/add-course-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../../app/app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { app } from '../../../server';
@Component({
  selector: 'app-add-lesson-dialog',
  standalone: true,
  imports: [BrowserModule,
    ReactiveFormsModule,
    BrowserModule,
    MatFormFieldModule,
  ],
  templateUrl: './add-lesson-dialog.component.html',
  styleUrl: './add-lesson-dialog.component.css',
})


export class AddLessonDialogComponent {

  lessonForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddLessonDialogComponent>
  ) {
    this.lessonForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      courseId: ['', Validators.required],
      content: ['']
    });
  }

  onSubmit() {
    if (this.lessonForm.valid) {
      this.dialogRef.close(this.lessonForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
