import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee';
import { NotificationService } from '../../core/services/notification.service';
import { CommonModule } from '@angular/common';

// Hierarchical DI: NotificationService provided at component level
// This creates a NEW instance of NotificationService specific to this component
@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [NotificationService], // Component-level provider - creates separate instance
  template: `
    <h2>Edit Employee</h2>
    <p>Notification Service Instance ID: {{ notificationInstanceId }}</p>
    <div *ngIf="employee; else notFound">
      <form (ngSubmit)="onSubmit()">
        <div>
          <label>ID:</label>
          <input type="number" [(ngModel)]="employee.id" name="id" disabled>
        </div>
        <div>
          <label>Name:</label>
          <input type="text" [(ngModel)]="employee.name" name="name" required>
        </div>
        <div>
          <label>Role:</label>
          <input type="text" [(ngModel)]="employee.role" name="role" required>
        </div>
        <button type="submit">Update Employee</button>
        <button type="button" (click)="cancel()">Cancel</button>
      </form>

      <div *ngIf="notifications.length > 0">
        <h3>Edit History:</h3>
        <ul>
          <li *ngFor="let note of notifications">{{ note }}</li>
        </ul>
      </div>
    </div>
    <ng-template #notFound>
      <p>Employee not found!</p>
      <button (click)="cancel()">Back to List</button>
    </ng-template>
  `
})
export class EmployeeEdit implements OnInit {
  employee: any = null;
  notifications: string[] = [];
  notificationInstanceId: string;

  // EmployeeService is injected from root (singleton)
  // NotificationService is injected from component level (new instance)
  constructor(
    private employeeService: EmployeeService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.notificationInstanceId = this.notificationService.getInstanceId();
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const foundEmployee = this.employeeService.getEmployeeById(id);
    if (foundEmployee) {
      this.employee = { ...foundEmployee };
      this.notificationService.addNotification(`Loaded employee: ${this.employee.name}`);
      this.updateNotifications();
    } else {
      this.notificationService.addNotification(`Employee with ID ${id} not found`);
      this.updateNotifications();
    }
  }

  onSubmit() {
    if (this.employee.name && this.employee.role) {
      this.notificationService.addNotification(`Updating employee: ${this.employee.name}`);
      this.employeeService.updateEmployee(this.employee.id, this.employee);
      this.notificationService.addNotification('Employee updated successfully');
      this.updateNotifications();
      alert('Employee updated successfully!');
      this.router.navigate(['/employees']);
    } else {
      this.notificationService.addNotification('Validation failed - missing fields');
      this.updateNotifications();
      alert('Please fill all fields');
    }
  }

  cancel() {
    this.notificationService.addNotification('Edit operation cancelled');
    this.router.navigate(['/employees']);
  }

  private updateNotifications() {
    this.notifications = this.notificationService.getNotifications();
  }
}
