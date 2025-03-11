import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user/user.module';
import { UserService } from '../../services/Users/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @Input() user: User = {id: '', name: '', email: '', password: '', role: '',isIn:false,courses:[]}; ;

  
  constructor(public userService:UserService) { }



  login(myForm: any) {
    this.user.email = myForm.controls['userEmail'].value;
    this.user.password = myForm.controls['userPassword'].value;
    console.log(this.user);
    
    this.userService.login(this.user).subscribe({
    next: (response) => {
      this.userService.saveToken(response.token);
      alert('✅' + response.message||'התחברת בהצלחה')
      this.user.isIn=true;
    },
    error: (err) => { alert('❌ ERROR: ' + (err.error.message || 'משהו השתבש')) }
  })
  }
  
}
