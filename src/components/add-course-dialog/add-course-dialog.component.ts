import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
export class AppModule { }

@Component({
  selector: 'app-add-course-dialog',
  standalone: true,
  imports: [
    
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './add-course-dialog.component.html',
  styleUrl: './add-course-dialog.component.css'
})
export class AddCourseDialogComponent {

  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCourseDialogComponent>
  ) {
    this.courseForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      teacherId: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.dialogRef.close(this.courseForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
