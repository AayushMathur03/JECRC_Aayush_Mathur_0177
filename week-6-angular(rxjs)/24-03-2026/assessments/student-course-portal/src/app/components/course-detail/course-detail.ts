import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Course, CourseService } from '../../services/course';
// import { CourseService, Course } from '../../services/course.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './course-detail.html'
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(id).subscribe(data => this.course = data);
  }
}