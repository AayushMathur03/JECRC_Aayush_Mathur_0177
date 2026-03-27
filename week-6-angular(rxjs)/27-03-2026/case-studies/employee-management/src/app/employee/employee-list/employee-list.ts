import { Component } from '@angular/core';
import { EmployeeService } from '../../core/services/employee';
import { LoggerService } from '../../core/services/logger.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Hierarchical DI: LoggerService provided at component level
// This creates a NEW instance separate from EmployeeAdd's LoggerService
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [LoggerService], // Component-level provider - creates separate instance
  template: `
  <h2>Employee List</h2>
  <p>Logger Instance ID: {{ loggerInstanceId }} | Log Count: {{ logCount }}</p>
  <div>
    <button routerLink="/employees/add">Add New Employee</button>
  </div>
  <div>
    <input
      type="text"
      [(ngModel)]="searchTerm"
      (input)="onSearch()"
      placeholder="Search by name or role">
  </div>
  <ul>
    <li *ngFor="let emp of filteredEmployees">
      {{emp.name}} - {{emp.role}}
      <button [routerLink]="['/employees/view', emp.id]">View</button>
      <button [routerLink]="['/employees/edit', emp.id]">Edit</button>
      <button (click)="deleteEmployee(emp.id)">Delete</button>
    </li>
  </ul>
  <p *ngIf="filteredEmployees.length === 0">No employees found.</p>
  `
})
export class EmployeeList {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchTerm: string = '';
  loggerInstanceId: string;
  logCount: number = 0;

  // EmployeeService is injected from root (singleton - shared across all components)
  // LoggerService is injected from component level (new instance - unique to this component)
  constructor(
    private service: EmployeeService,
    private logger: LoggerService
  ) {
    this.loggerInstanceId = this.logger.getInstanceId();
    this.logger.log('EmployeeList', 'Component initialized');
    this.loadEmployees();
    this.updateLogCount();
  }

  loadEmployees() {
    this.logger.log('EmployeeList', 'Loading employees');
    this.employees = this.service.getEmployees();
    this.filteredEmployees = this.employees;
    this.logger.log('EmployeeList', `Loaded ${this.employees.length} employees`);
    this.updateLogCount();
  }

  onSearch() {
    this.logger.log('EmployeeList', `Searching for: ${this.searchTerm}`);
    if (this.searchTerm.trim()) {
      this.filteredEmployees = this.service.searchEmployees(this.searchTerm);
      this.logger.log('EmployeeList', `Found ${this.filteredEmployees.length} matching employees`);
    } else {
      this.filteredEmployees = this.employees;
      this.logger.log('EmployeeList', 'Cleared search - showing all employees');
    }
    this.updateLogCount();
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.logger.log('EmployeeList', `Deleting employee with ID: ${id}`);
      this.service.deleteEmployee(id);
      this.loadEmployees();
      this.logger.log('EmployeeList', 'Employee deleted successfully');
      alert('Employee deleted successfully!');
      this.updateLogCount();
    } else {
      this.logger.log('EmployeeList', 'Delete operation cancelled');
      this.updateLogCount();
    }
  }

  private updateLogCount() {
    this.logCount = this.logger.getLogCount();
  }
}