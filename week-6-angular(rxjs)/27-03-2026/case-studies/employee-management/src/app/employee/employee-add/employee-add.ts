import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee';
import { LoggerService } from '../../core/services/logger.service';
import { CommonModule } from '@angular/common';

// Hierarchical DI: LoggerService provided at component level
// This creates a NEW instance of LoggerService specific to this component
@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [LoggerService], // Component-level provider - creates separate instance
  template: `
    <h2>Add New Employee</h2>
    <p>Logger Instance ID: {{ loggerInstanceId }}</p>
    <form (ngSubmit)="onSubmit()">
      <div>
        <label>ID:</label>
        <input type="number" [(ngModel)]="employee.id" name="id" required>
      </div>
      <div>
        <label>Name:</label>
        <input type="text" [(ngModel)]="employee.name" name="name" required>
      </div>
      <div>
        <label>Role:</label>
        <input type="text" [(ngModel)]="employee.role" name="role" required>
      </div>
      <button type="submit">Add Employee</button>
      <button type="button" (click)="cancel()">Cancel</button>
    </form>
  `
})
export class EmployeeAdd {
  employee = {
    id: 0,
    name: '',
    role: ''
  };
  loggerInstanceId: string;

  // EmployeeService is injected from root (singleton)
  // LoggerService is injected from component level (new instance)
  constructor(
    private employeeService: EmployeeService,
    private logger: LoggerService,
    private router: Router
  ) {
    this.loggerInstanceId = this.logger.getInstanceId();
    this.logger.log('EmployeeAdd', 'Component initialized');
  }

  onSubmit() {
    if (this.employee.id && this.employee.name && this.employee.role) {
      this.logger.log('EmployeeAdd', `Adding employee: ${this.employee.name}`);
      this.employeeService.addEmployee(this.employee);
      this.logger.log('EmployeeAdd', 'Employee added successfully');
      alert('Employee added successfully!');
      this.router.navigate(['/employees']);
    } else {
      this.logger.log('EmployeeAdd', 'Validation failed - missing fields');
      alert('Please fill all fields');
    }
  }

  cancel() {
    this.logger.log('EmployeeAdd', 'Operation cancelled');
    this.router.navigate(['/employees']);
  }
}
