import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { User } from '../../models/user/user.module';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [BrowserModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userForm!: FormGroup;
 
  constructor(private fb: FormBuilder,public AuthServise:AuthService){}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')],
      email: ['', Validators.email],
      role:['', Validators.required]
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm!.controls;
  }

  register() {
    this.AuthServise.register(this.userForm.value as User);
  }

}
