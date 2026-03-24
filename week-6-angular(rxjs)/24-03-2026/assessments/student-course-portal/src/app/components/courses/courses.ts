import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { Course, CourseService } from '../../services/course';
// import { CourseService, Course } from '../../services/course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './courses.html'
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => this.courses = data);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/course', id]);
  }
}