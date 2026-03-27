import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../core/services/employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Employee Details</h2>
    <div *ngIf="employee; else notFound">
      <div>
        <strong>ID:</strong> {{ employee.id }}
      </div>
      <div>
        <strong>Name:</strong> {{ employee.name }}
      </div>
      <div>
        <strong>Role:</strong> {{ employee.role }}
      </div>
      <div>
        <button [routerLink]="['/employees/edit', employee.id]">Edit</button>
        <button (click)="deleteEmployee()">Delete</button>
        <button (click)="goBack()">Back to List</button>
      </div>
    </div>
    <ng-template #notFound>
      <p>Employee not found!</p>
      <button (click)="goBack()">Back to List</button>
    </ng-template>
  `
})
export class EmployeeView implements OnInit {
  employee: any = null;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employee = this.employeeService.getEmployeeById(id);
  }

  deleteEmployee() {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(this.employee.id);
      alert('Employee deleted successfully!');
      this.router.navigate(['/employees']);
    }
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}
