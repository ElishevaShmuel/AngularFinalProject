import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { User } from '../../models/user/user.module';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/Users/user.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userForm!: FormGroup;
  roles: string[] = ['Admin', 'User', 'Guest'];
  constructor(private fb: FormBuilder,public userService:UserService){}

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
    const newUser: User = this.userForm.value;
    this.userService.register(newUser).subscribe({
      next: (response) => {
        alert('✅' + response.message||'נרשמת בהצלחה');
      },
      error: (err) => { alert('❌ ERROR: ' + (err.error.message || 'משהו השתבש')) }
    });
    this.userService.login(this.userForm.value);
  }
}
