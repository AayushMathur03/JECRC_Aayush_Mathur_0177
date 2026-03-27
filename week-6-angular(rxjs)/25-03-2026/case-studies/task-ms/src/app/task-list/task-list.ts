import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Task } from '../task';
import { TaskStateService } from '../task-state.service';
import { TaskService } from '../task.service';

type FilterType = 'all' | 'completed' | 'pending';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  isLoading = true;
  errorMessage = '';

  searchTerm = '';
  activeFilter: FilterType = 'all';
  deletingIds = new Set<number>();
  togglingIds = new Set<number>();

  private searchSubject = new Subject<string>();
  private searchSub!: Subscription;
  private addSub!: Subscription;
  private updateSub!: Subscription;

  constructor(
    private taskService: TaskService,
    private taskState: TaskStateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTasks();

    // Live search with debounce
    this.searchSub = this.searchSubject
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((term: string) => {
        if (term.trim()) {
          this.taskService.searchTasks(term).subscribe({
            next: (results: Task[]) => {
              this.tasks = results.slice(0, 20);
              this.applyFilter();
            },
          });
        } else {
          this.loadTasks();
        }
      });

    // React to form events
    this.addSub = this.taskState.taskAdded$.subscribe((task: Task) => {
      this.tasks = [task, ...this.tasks];
      this.applyFilter();
    });

    this.updateSub = this.taskState.taskUpdated$.subscribe((updated: Task) => {
      this.tasks = this.tasks.map((t) => (t.id === updated.id ? updated : t));
      this.applyFilter();
    });
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
    this.addSub.unsubscribe();
    this.updateSub.unsubscribe();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('🔄 Loading tasks from API...');
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        console.log('✅ Tasks loaded:', tasks.length);
        this.tasks = tasks.slice(0, 20); // limit for demo
        this.applyFilter();
        this.isLoading = false;
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      error: (err) => {
        console.error('❌ Error loading tasks:', err);
        this.errorMessage = 'Could not load tasks. Check your connection.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }

  setFilter(filter: FilterType): void {
    this.activeFilter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    let source = this.tasks;
    if (this.activeFilter === 'completed') {
      source = source.filter((t) => t.completed);
    } else if (this.activeFilter === 'pending') {
      source = source.filter((t) => !t.completed);
    }
    this.filteredTasks = source;
    console.log(`📊 Filter applied (${this.activeFilter}): ${this.filteredTasks.length} tasks`);
  }

  toggleComplete(task: Task): void {
    if (!task.id || this.togglingIds.has(task.id)) return;

    console.log(`🔄 Toggling task #${task.id} from ${task.completed} to ${!task.completed}`);
    this.togglingIds.add(task.id);

    // Optimistic UI update
    const previousState = task.completed;
    task.completed = !task.completed;
    this.applyFilter();
    this.cdr.detectChanges(); // Force UI update

    // PATCH - update only the completed field
    this.taskService.updateTaskStatus(task.id, task.completed).subscribe({
      next: () => {
        console.log(`✅ Task #${task.id} updated successfully to ${task.completed}`);
        this.togglingIds.delete(task.id!);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(`❌ Failed to update task #${task.id}:`, err);
        // Revert on error
        task.completed = previousState;
        this.applyFilter();
        this.togglingIds.delete(task.id!);
        this.cdr.detectChanges();
      },
    });
  }

  editTask(task: Task): void {
    this.taskState.requestEdit(task);
  }

  deleteTask(task: Task): void {
    if (!task.id || this.deletingIds.has(task.id)) return;
    this.deletingIds.add(task.id);

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
        this.applyFilter();
        this.deletingIds.delete(task.id!);
      },
      error: () => this.deletingIds.delete(task.id!),
    });
  }

  get completedCount(): number {
    return this.tasks.filter((t) => t.completed).length;
  }

  get pendingCount(): number {
    return this.tasks.filter((t) => !t.completed).length;
  }
}