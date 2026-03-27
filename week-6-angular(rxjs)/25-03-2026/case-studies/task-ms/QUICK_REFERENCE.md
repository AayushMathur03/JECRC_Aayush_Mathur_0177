# Angular + RxJS Quick Reference Cheat Sheet

## 📚 Table of Contents
- [Component Basics](#component-basics)
- [Services](#services)
- [RxJS Observables](#rxjs-observables)
- [RxJS Subjects](#rxjs-subjects)
- [RxJS Operators](#rxjs-operators)
- [HTTP Requests](#http-requests)
- [Template Syntax](#template-syntax)
- [Common Patterns](#common-patterns)
- [Debugging Tips](#debugging-tips)

---

## Component Basics

### Create Component
```bash
ng generate component my-component
# or shorthand:
ng g c my-component
```

### Component Structure
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',    // <app-my-component></app-my-component>
  standalone: true,                 // Modern Angular (no NgModule)
  imports: [CommonModule],          // Dependencies
  templateUrl: './my-component.html',  // Template file
  styleUrls: ['./my-component.css']    // Styles
})
export class MyComponent {
  // Properties
  title = 'Hello';
  count = 0;

  // Methods
  increment(): void {
    this.count++;
  }
}
```

### Lifecycle Hooks
```typescript
export class MyComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    // Called once after component initialization
    console.log('Component initialized');
  }

  ngOnDestroy(): void {
    // Called before component is destroyed
    console.log('Component destroyed');
    // ALWAYS unsubscribe here!
  }
}
```

---

## Services

### Create Service
```bash
ng generate service my-service
# or shorthand:
ng g s my-service
```

### Service Structure
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',  // Singleton - one instance app-wide
})
export class MyService {
  private data: string[] = [];

  getData(): string[] {
    return this.data;
  }

  addData(item: string): void {
    this.data.push(item);
  }
}
```

### Inject Service
```typescript
export class MyComponent {
  constructor(private myService: MyService) {}
  //          ^^^^^^^ access modifier
  //                  ^^^^^^^^^^^^ service instance

  ngOnInit(): void {
    const data = this.myService.getData();
  }
}
```

---

## RxJS Observables

### What is an Observable?
A stream of data over time. Think of it as a "promise on steroids."

### Create Observable
```typescript
import { Observable } from 'rxjs';

// Manual creation
const obs$ = new Observable<number>(observer => {
  observer.next(1);
  observer.next(2);
  observer.complete();
});

// From HttpClient (most common)
getTasks(): Observable<Task[]> {
  return this.http.get<Task[]>('/api/tasks');
}
```

### Subscribe to Observable
```typescript
obs$.subscribe({
  next: (value) => console.log('Received:', value),
  error: (err) => console.error('Error:', err),
  complete: () => console.log('Complete')
});

// Shorthand (only next)
obs$.subscribe(value => console.log(value));
```

### Unsubscribe (CRITICAL!)
```typescript
export class MyComponent implements OnDestroy {
  private sub!: Subscription;

  ngOnInit() {
    this.sub = this.service.data$
      .subscribe(data => console.log(data));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();  // Prevent memory leak!
  }
}
```

---

## RxJS Subjects

### What is a Subject?
A special Observable that can:
1. Emit values (like EventEmitter)
2. Have multiple subscribers (multicast)

### Types of Subjects

#### Subject (No initial value)
```typescript
import { Subject } from 'rxjs';

private dataSubject = new Subject<string>();
readonly data$ = this.dataSubject.asObservable();

emit(value: string) {
  this.dataSubject.next(value);
}
```

#### BehaviorSubject (Has initial value)
```typescript
import { BehaviorSubject } from 'rxjs';

private countSubject = new BehaviorSubject<number>(0);
readonly count$ = this.countSubject.asObservable();

increment() {
  const current = this.countSubject.value;
  this.countSubject.next(current + 1);
}
```

#### ReplaySubject (Replays last N values)
```typescript
import { ReplaySubject } from 'rxjs';

private historySubject = new ReplaySubject<string>(3);  // Keep last 3
```

### Subject Pattern (Event Bus)
```typescript
// Service
@Injectable({ providedIn: 'root' })
export class EventService {
  private eventSubject = new Subject<string>();
  readonly event$ = this.eventSubject.asObservable();

  emit(value: string): void {
    this.eventSubject.next(value);
  }
}

// Component A (emitter)
this.eventService.emit('Hello');

// Component B (listener)
this.eventService.event$.subscribe(value => {
  console.log('Received:', value);
});
```

---

## RxJS Operators

### What are Operators?
Functions that transform observable data.

### Common Operators

#### map - Transform each value
```typescript
import { map } from 'rxjs';

this.http.get<Task[]>('/api/tasks')
  .pipe(
    map(tasks => tasks.filter(t => t.completed))
  )
  .subscribe(completed => console.log(completed));
```

#### filter - Filter values
```typescript
import { filter } from 'rxjs';

this.numbers$
  .pipe(
    filter(n => n > 5)
  )
  .subscribe(n => console.log(n));  // Only > 5
```

#### debounceTime - Wait before emitting
```typescript
import { debounceTime } from 'rxjs';

this.searchInput$
  .pipe(
    debounceTime(300)  // Wait 300ms after last emission
  )
  .subscribe(term => this.search(term));
```

#### distinctUntilChanged - Only emit if changed
```typescript
import { distinctUntilChanged } from 'rxjs';

this.input$
  .pipe(
    distinctUntilChanged()  // Skip duplicates
  )
  .subscribe(value => console.log(value));
```

#### tap - Side effects (debugging)
```typescript
import { tap } from 'rxjs';

this.http.get('/api/tasks')
  .pipe(
    tap(tasks => console.log('Loaded:', tasks)),  // Debug
    map(tasks => tasks.length)
  )
  .subscribe(count => console.log('Count:', count));
```

#### catchError - Handle errors
```typescript
import { catchError, of } from 'rxjs';

this.http.get('/api/tasks')
  .pipe(
    catchError(err => {
      console.error(err);
      return of([]);  // Return empty array on error
    })
  )
  .subscribe(tasks => console.log(tasks));
```

#### switchMap - Switch to new Observable
```typescript
import { switchMap } from 'rxjs';

this.userId$
  .pipe(
    switchMap(id => this.http.get(`/api/users/${id}`))
  )
  .subscribe(user => console.log(user));
```

### Operator Chaining
```typescript
this.searchInput$
  .pipe(
    debounceTime(300),           // Wait 300ms
    distinctUntilChanged(),      // Skip duplicates
    filter(term => term.length > 2),  // Min 3 chars
    switchMap(term => this.search(term))  // API call
  )
  .subscribe(results => console.log(results));
```

---

## HTTP Requests

### Setup HttpClient
```typescript
// app.config.ts
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch())  // ← Required!
  ]
};
```

### HTTP Methods

#### GET - Retrieve data
```typescript
getTasks(): Observable<Task[]> {
  return this.http.get<Task[]>('/api/tasks');
}

getTask(id: number): Observable<Task> {
  return this.http.get<Task>(`/api/tasks/${id}`);
}
```

#### POST - Create resource
```typescript
addTask(task: Task): Observable<Task> {
  return this.http.post<Task>('/api/tasks', task);
}
```

#### PUT - Replace resource (full update)
```typescript
updateTask(task: Task): Observable<Task> {
  return this.http.put<Task>(`/api/tasks/${task.id}`, task);
}
```

#### PATCH - Update resource (partial)
```typescript
updateStatus(id: number, completed: boolean): Observable<Task> {
  return this.http.patch<Task>(`/api/tasks/${id}`, { completed });
}
```

#### DELETE - Remove resource
```typescript
deleteTask(id: number): Observable<void> {
  return this.http.delete<void>(`/api/tasks/${id}`);
}
```

### HTTP Headers
```typescript
import { HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer token'
});

this.http.get('/api/tasks', { headers })
  .subscribe(tasks => console.log(tasks));
```

### Query Parameters
```typescript
import { HttpParams } from '@angular/common/http';

const params = new HttpParams()
  .set('page', '1')
  .set('limit', '10');

this.http.get('/api/tasks', { params })
  .subscribe(tasks => console.log(tasks));

// Shorthand
this.http.get('/api/tasks?page=1&limit=10')
  .subscribe(tasks => console.log(tasks));
```

---

## Template Syntax

### Interpolation (One-way binding)
```html
<h1>{{ title }}</h1>
<p>{{ user.name }}</p>
<span>{{ count + 1 }}</span>
```

### Property Binding (One-way binding)
```html
<img [src]="imageUrl">
<button [disabled]="isLoading">Click</button>
<div [class.active]="isActive">Content</div>
<div [style.color]="textColor">Colored</div>
```

### Event Binding
```html
<button (click)="onClick()">Click</button>
<input (input)="onInput($event)">
<form (submit)="onSubmit()">Submit</form>
```

### Two-Way Binding
```html
<!-- Requires FormsModule import! -->
<input [(ngModel)]="name" name="name">
```

### Structural Directives

#### *ngIf - Conditional rendering
```html
<div *ngIf="isLoggedIn">Welcome!</div>
<div *ngIf="isLoggedIn; else loginBlock">Welcome!</div>
<ng-template #loginBlock>
  <div>Please log in</div>
</ng-template>
```

#### *ngFor - Loop through array
```html
<ul>
  <li *ngFor="let item of items">{{ item }}</li>
</ul>

<!-- With index -->
<li *ngFor="let item of items; let i = index">
  {{ i }}: {{ item }}
</li>

<!-- With trackBy (performance) -->
<li *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</li>
```

```typescript
// In component
trackById(index: number, item: any): number {
  return item.id;
}
```

#### *ngSwitch - Multiple conditions
```html
<div [ngSwitch]="status">
  <p *ngSwitchCase="'loading'">Loading...</p>
  <p *ngSwitchCase="'success'">Success!</p>
  <p *ngSwitchCase="'error'">Error occurred</p>
  <p *ngSwitchDefault>Unknown status</p>
</div>
```

### Template Variables
```html
<input #myInput type="text">
<button (click)="logValue(myInput.value)">Log</button>

<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">
  <!-- ... -->
</form>
```

### Template Expressions
```html
<!-- Ternary operator -->
<p>{{ isActive ? 'Active' : 'Inactive' }}</p>

<!-- Nullish coalescing -->
<p>{{ user?.name ?? 'Unknown' }}</p>

<!-- Method call -->
<p>{{ getFullName() }}</p>

<!-- Pipe -->
<p>{{ price | currency }}</p>
<p>{{ date | date:'short' }}</p>
```

---

## Common Patterns

### Loading State Pattern
```typescript
export class MyComponent {
  isLoading = false;
  data: Task[] = [];
  errorMessage = '';

  loadData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.service.getData().subscribe({
      next: (data) => {
        this.data = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load data';
        this.isLoading = false;
      }
    });
  }
}
```

```html
<div *ngIf="isLoading">Loading...</div>
<div *ngIf="errorMessage">{{ errorMessage }}</div>
<div *ngIf="!isLoading && !errorMessage">
  <ul>
    <li *ngFor="let item of data">{{ item }}</li>
  </ul>
</div>
```

### Optimistic Update Pattern
```typescript
toggleComplete(task: Task): void {
  // 1. Update UI immediately
  const previousState = task.completed;
  task.completed = !task.completed;

  // 2. Make API call
  this.service.updateTask(task).subscribe({
    next: () => {
      // Success - keep change
      console.log('Updated');
    },
    error: () => {
      // Revert on error
      task.completed = previousState;
    }
  });
}
```

### Search with Debounce Pattern
```typescript
private searchSubject = new Subject<string>();

ngOnInit() {
  this.searchSubject
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(term => this.search(term));
}

onSearchInput(term: string): void {
  this.searchSubject.next(term);
}
```

### Component Communication Pattern
```typescript
// State Service
@Injectable({ providedIn: 'root' })
export class StateService {
  private eventSubject = new Subject<Data>();
  readonly event$ = this.eventSubject.asObservable();

  emit(data: Data): void {
    this.eventSubject.next(data);
  }
}

// Component A (sender)
this.stateService.emit(data);

// Component B (receiver)
this.stateService.event$.subscribe(data => {
  console.log('Received:', data);
});
```

### Form Validation Pattern
```typescript
onSubmit(): void {
  // Validate
  if (!this.form.title.trim()) {
    this.errorMessage = 'Title is required';
    return;
  }

  // Submit
  this.service.submit(this.form).subscribe({
    next: () => this.successMessage = 'Saved!',
    error: () => this.errorMessage = 'Failed to save'
  });
}
```

---

## Debugging Tips

### Console Logging
```typescript
// Log in pipe
this.http.get('/api/tasks')
  .pipe(
    tap(tasks => console.log('Loaded:', tasks))
  )
  .subscribe();

// Log subscription
this.service.data$.subscribe(data => {
  console.log('Received:', data);
});

// Log errors
.subscribe({
  error: (err) => console.error('Error:', err)
});
```

### Check Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by XHR/Fetch
4. Inspect request/response

### Angular DevTools
1. Install Chrome extension: "Angular DevTools"
2. Open DevTools
3. Go to Angular tab
4. Inspect component properties
5. Track change detection

### Common Errors

#### "Cannot find module"
```bash
# Solution:
npm install
```

#### "No provider for HttpClient"
```typescript
// Solution: Add to app.config.ts
provideHttpClient(withFetch())
```

#### "Cannot read property 'subscribe' of undefined"
```typescript
// Check: Service method returns Observable
getTasks(): Observable<Task[]> {  // ← Must return Observable
  return this.http.get<Task[]>('/api/tasks');
}
```

#### Memory leak warnings
```typescript
// Solution: Always unsubscribe
private sub!: Subscription;

ngOnInit() {
  this.sub = this.service.data$.subscribe();
}

ngOnDestroy() {
  this.sub.unsubscribe();  // ← Required!
}
```

#### Change detection not working
```typescript
// Solution: Create new array reference
this.items = [...this.items, newItem];  // ✅ Works
// NOT this:
this.items.push(newItem);  // ❌ Won't trigger change detection
```

---

## Quick Commands

### Angular CLI

```bash
# Create new app
ng new my-app

# Serve app
ng serve
ng serve --open  # Auto-open browser
ng serve --port 4300  # Custom port

# Generate component
ng generate component my-component
ng g c my-component  # Shorthand

# Generate service
ng generate service my-service
ng g s my-service  # Shorthand

# Build for production
ng build
ng build --configuration production

# Run tests
ng test

# Update Angular
ng update @angular/cli @angular/core
```

### NPM Commands

```bash
# Install dependencies
npm install

# Install specific package
npm install rxjs

# Install dev dependency
npm install --save-dev @types/node

# Update packages
npm update

# Check outdated packages
npm outdated

# Run scripts
npm start      # Usually: ng serve
npm run build  # Usually: ng build
npm test       # Usually: ng test
```

---

## Performance Tips

### 1. Use trackBy in *ngFor
```html
<li *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</li>
```

```typescript
trackById(index: number, item: any): number {
  return item.id;
}
```

### 2. Unsubscribe from Observables
```typescript
ngOnDestroy() {
  this.subscription.unsubscribe();
}
```

### 3. Use OnPush Change Detection
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 4. Lazy Load Modules
```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  }
];
```

### 5. Use Pure Pipes
```typescript
@Pipe({
  name: 'myPipe',
  pure: true  // Default, caches results
})
```

---

## Security Best Practices

### 1. Sanitize User Input
```typescript
import { DomSanitizer } from '@angular/platform-browser';

constructor(private sanitizer: DomSanitizer) {}

getSafeHtml(html: string) {
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
}
```

### 2. Use HTTPS
```typescript
// Always use HTTPS in production
const API_URL = 'https://api.example.com';
```

### 3. Validate Input
```typescript
if (!input.trim() || input.length > 100) {
  this.errorMessage = 'Invalid input';
  return;
}
```

### 4. Handle Errors
```typescript
this.http.get('/api/data').subscribe({
  error: (err) => {
    console.error(err);
    this.errorMessage = 'Something went wrong';
  }
});
```

---

## Testing Basics

### Unit Test Example
```typescript
describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tasks', (done) => {
    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBeGreaterThan(0);
      done();
    });
  });
});
```

---

## Resources Quick Links

- **Angular Docs:** https://angular.dev
- **RxJS Docs:** https://rxjs.dev
- **TypeScript Docs:** https://www.typescriptlang.org
- **Angular CLI:** https://angular.dev/tools/cli
- **JSONPlaceholder (Free API):** https://jsonplaceholder.typicode.com

---

## Keyboard Shortcuts (VS Code)

- **Save:** `Ctrl+S` / `Cmd+S`
- **Format:** `Shift+Alt+F` / `Shift+Option+F`
- **Find:** `Ctrl+F` / `Cmd+F`
- **Replace:** `Ctrl+H` / `Cmd+H`
- **Go to File:** `Ctrl+P` / `Cmd+P`
- **Command Palette:** `Ctrl+Shift+P` / `Cmd+Shift+P`
- **Terminal:** `Ctrl+` ` / `Cmd+` `
- **Multi-cursor:** `Alt+Click` / `Option+Click`

---

## Remember

✅ **Always unsubscribe** from Observables
✅ **Use async pipe** when possible (auto-unsubscribes)
✅ **Handle errors** in all HTTP requests
✅ **Validate user input** before processing
✅ **Use TypeScript types** for type safety
✅ **Test your code** regularly
✅ **Read error messages** carefully
✅ **Check documentation** before Googling

---

**Print this, keep it handy, and refer to it often!** 📄
