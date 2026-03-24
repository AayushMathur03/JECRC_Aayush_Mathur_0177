// src/app/services/course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  description: string;
}

@Injectable({
  providedIn: 'root'   // <-- makes it available to ALL components
})
export class CourseService {

  // In a real app this would be: private apiUrl = 'https://your-api.com/courses';
  private courses: Course[] = [
    { id: 1, title: 'Angular Fundamentals', instructor: 'John Doe',   duration: '8 weeks', description: 'Learn Angular from scratch.' },
    { id: 2, title: 'TypeScript Basics',    instructor: 'Jane Smith', duration: '4 weeks', description: 'Master TypeScript types and interfaces.' },
    { id: 3, title: 'RxJS & Observables',   instructor: 'Bob Lee',    duration: '6 weeks', description: 'Reactive programming with RxJS.' },
  ];

  constructor(private http: HttpClient) {}

  // Method 1 — returns all courses (used by CoursesComponent AND DashboardComponent)
  getCourses(): Observable<Course[]> {
    return new Observable(observer => {
      observer.next(this.courses);
      observer.complete();
    });
  }

  // Method 2 — returns one course by id (used by CourseDetailComponent)
  getCourseById(id: number): Observable<Course | undefined> {
    return new Observable(observer => {
      const course = this.courses.find(c => c.id === id);
      observer.next(course);
      observer.complete();
    });
  }
}