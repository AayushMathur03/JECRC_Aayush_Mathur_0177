import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Task } from '../task';
import { TaskStateService } from '../task-state.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css'],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  task: Task = { title: '', completed: false };
  isEditMode = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  private editSub!: Subscription;

  constructor(
    private taskService: TaskService,
    private taskState: TaskStateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Listen for edit events from the task list
    this.editSub = this.taskState.editTask$.subscribe((task: Task) => {
      this.task = { ...task };
      this.isEditMode = true;
      this.clearMessages();
    });
  }

  ngOnDestroy(): void {
    this.editSub.unsubscribe();
  }

  onSubmit(): void {
    if (!this.task.title.trim()) {
      this.errorMessage = 'Task title cannot be empty.';
      return;
    }

    this.isLoading = true;
    this.clearMessages();
    this.cdr.detectChanges();

    // Safety timeout - stop loading after 10 seconds
    const safetyTimeout = setTimeout(() => {
      if (this.isLoading) {
        console.warn('⚠️ Request timeout - stopping loading state');
        this.isLoading = false;
        this.errorMessage = 'Request timed out. Please try again.';
        this.cdr.detectChanges();
      }
    }, 10000);

    if (this.isEditMode && this.task.id !== undefined) {
      console.log(`🔄 Updating task #${this.task.id}...`);
      const startTime = Date.now();

      // PUT - full update
      this.taskService.updateTask(this.task).subscribe({
        next: (updated) => {
          clearTimeout(safetyTimeout);
          const duration = Date.now() - startTime;
          console.log(`✅ Task updated in ${duration}ms`);
          this.taskState.notifyTaskUpdated(updated);
          this.successMessage = `Task #${updated.id} updated successfully!`;
          // Auto-clear success message after 2 seconds
          setTimeout(() => {
            this.successMessage = '';
            this.cdr.detectChanges();
          }, 2000);
          this.resetForm();
          this.cdr.detectChanges();
        },
        error: (err) => {
          clearTimeout(safetyTimeout);
          const duration = Date.now() - startTime;
          console.error(`❌ Update failed after ${duration}ms:`, err);
          this.errorMessage = 'Failed to update task. Please try again.';
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      });
    } else {
      console.log(`🔄 Creating new task...`);

      // POST - create new
      this.taskService.addTask(this.task).subscribe({
        next: (created) => {
          clearTimeout(safetyTimeout);
          console.log(`✅ Task created: #${created.id}`);
          this.taskState.notifyTaskAdded(created);
          this.successMessage = `Task "${created.title}" created successfully!`;
          // Auto-clear success message after 2 seconds
          setTimeout(() => {
            this.successMessage = '';
            this.cdr.detectChanges();
          }, 2000);
          this.resetForm();
          this.cdr.detectChanges();
        },
        error: (err) => {
          clearTimeout(safetyTimeout);
          console.error(`❌ Create failed:`, err);
          this.errorMessage = 'Failed to create task. Please try again.';
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      });
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.task = { title: '', completed: false };
    this.isEditMode = false;
    this.isLoading = false;
  }

  private clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}