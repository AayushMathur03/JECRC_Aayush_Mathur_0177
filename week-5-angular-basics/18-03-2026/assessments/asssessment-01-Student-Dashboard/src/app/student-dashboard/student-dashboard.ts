import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css']
})
export class StudentDashboardComponent {

  students = [
    { name: 'Aayush', marks: 92 },
    { name: 'Riya', marks: 45 },
    { name: 'Karan', marks: 76 },
    { name: 'Neha', marks: 33 },
    { name: 'Vikram', marks: 88 }
  ];

}