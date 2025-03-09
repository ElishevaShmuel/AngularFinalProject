import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CoursListComponent } from '../components/cours-list/cours-list.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { LessonListComponent } from '../components/lesson-list/lesson-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'courses', component: CoursListComponent, 
        children:[
            {path: 'courses/:id', component: LessonListComponent}
        ]
    },
    { path: 'login', component: LoginComponent,},
    { path: 'register', component: RegisterComponent },
    
];
