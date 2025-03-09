import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ BrowserModule,
    FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @Input() email: string | undefined;
  @Input() password: string | undefined;
  
  constructor(public AuthServise:AuthService) { }

  login(myForm: any) {
    this.AuthServise.login({ email: myForm.value.email, password: myForm.value.password });
  }
  
}
