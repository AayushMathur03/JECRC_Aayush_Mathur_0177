import { Component } from '@angular/core';
import { TaskFormComponent } from './task-form/task-form';
import { TaskListComponent } from './task-list/task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent],
  template: `
    <div class="app-shell">
      <header class="app-header">
        <div class="brand">
          <span class="brand-icon">◈</span>
          <span class="brand-name">Taskflow</span>
        </div>
        <span class="brand-tagline">Stay on top of things</span>
      </header>

      <main class="app-layout">
        <aside class="sidebar">
          <app-task-form></app-task-form>
        </aside>
        <section class="main-panel">
          <app-task-list></app-task-list>
        </section>
      </main>
    </div>
  `,
})
export class AppComponent {}