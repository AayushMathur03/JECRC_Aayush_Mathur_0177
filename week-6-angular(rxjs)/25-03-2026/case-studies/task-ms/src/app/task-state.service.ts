import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskStateService {
  private readonly editTaskSubject = new Subject<Task>();
  private readonly taskAddedSubject = new Subject<Task>();
  private readonly taskUpdatedSubject = new Subject<Task>();

  readonly editTask$ = this.editTaskSubject.asObservable();
  readonly taskAdded$ = this.taskAddedSubject.asObservable();
  readonly taskUpdated$ = this.taskUpdatedSubject.asObservable();

  requestEdit(task: Task): void {
    this.editTaskSubject.next(task);
  }

  notifyTaskAdded(task: Task): void {
    this.taskAddedSubject.next(task);
  }

  notifyTaskUpdated(task: Task): void {
    this.taskUpdatedSubject.next(task);
  }
}
