// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { CoursesComponent} from './components/courses/courses';
// import { CourseDetail } from './components/course-detail/course-detail'; 
import { Profile } from './components/profile/profile';
import { CourseDetailComponent } from './components/course-detail/course-detail';

export const routes: Routes = [
  { path: '',              redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',    component: Dashboard},
  { path: 'courses',      component: CoursesComponent },
  { path: 'course/:id',   component: CourseDetailComponent },  // :id = dynamic param
  { path: 'profile',      component: Profile},
  { path: '**',           redirectTo: '/dashboard' }           // wildcard fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }