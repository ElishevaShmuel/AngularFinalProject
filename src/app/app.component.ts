import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router'; // ייבוא RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TheCoursOfTheLife';
}
