# Architecture & Data Flow Diagrams

## 1. Component Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     AppComponent                        │
│                    (Root Shell)                         │
│  ┌──────────────────────┬──────────────────────────┐   │
│  │    SIDEBAR          │     MAIN PANEL            │   │
│  │                      │                           │   │
│  │  ┌──────────────┐   │   ┌──────────────────┐  │   │
│  │  │ TaskFormComp │   │   │  TaskListComp    │  │   │
│  │  │              │   │   │                  │  │   │
│  │  │ Create/Edit  │   │   │  View/Delete/    │  │   │
│  │  │    Tasks     │   │   │  Toggle Tasks    │  │   │
│  │  └──────────────┘   │   └──────────────────┘  │   │
│  │         ▲            │             ▲           │   │
│  └─────────│────────────┴─────────────│───────────┘   │
└───────────│──────────────────────────│────────────────┘
            │                          │
            │                          │
     ┌──────▼──────────────────────────▼────────┐
     │      TaskStateService (Event Bus)        │
     │  • editTask$ → Form listens              │
     │  • taskAdded$ → List listens             │
     │  • taskUpdated$ → List listens           │
     └──────────────────────────────────────────┘
                         │
                         │ Uses
                         ▼
            ┌────────────────────────┐
            │    TaskService         │
            │  (HTTP API Calls)      │
            │  • getTasks()          │
            │  • addTask()           │
            │  • updateTask()        │
            │  • deleteTask()        │
            └────────────────────────┘
                         │
                         │ HTTP Calls
                         ▼
            ┌────────────────────────┐
            │  JSONPlaceholder API   │
            │  (External API)        │
            └────────────────────────┘
```

---

## 2. Data Flow: Creating a Task

```
USER ACTION: Fills form and clicks "Add Task"
│
├─ Step 1: TaskFormComponent.onSubmit()
│  └─ Validates input
│  └─ Sets isLoading = true
│
├─ Step 2: taskService.addTask(task)
│  └─ POST /todos
│  └─ Request Body: { title: "...", completed: false }
│
├─ Step 3: API Response
│  └─ Returns: { id: 201, title: "...", completed: false }
│
├─ Step 4: TaskFormComponent receives response
│  └─ Sets isLoading = false
│  └─ Shows success message
│  └─ Resets form
│  └─ Calls taskState.notifyTaskAdded(createdTask)
│
├─ Step 5: TaskStateService emits
│  └─ taskAddedSubject.next(createdTask)
│  └─ All subscribers receive the task
│
└─ Step 6: TaskListComponent receives
   └─ Subscribed to taskAdded$
   └─ Updates: tasks = [newTask, ...tasks]
   └─ Calls applyFilter()
   └─ UI automatically updates

RESULT: Task appears in list immediately!
```

---

## 3. Data Flow: Editing a Task

```
USER ACTION: Clicks "Edit" button on task #5
│
├─ Step 1: TaskListComponent.editTask(task)
│  └─ Calls taskState.requestEdit(task)
│
├─ Step 2: TaskStateService emits
│  └─ editTaskSubject.next(task)
│
├─ Step 3: TaskFormComponent receives
│  └─ Subscribed to editTask$
│  └─ Sets task = { ...receivedTask }
│  └─ Sets isEditMode = true
│  └─ Form populates with task data
│
USER ACTION: Modifies title and clicks "Save Changes"
│
├─ Step 4: TaskFormComponent.onSubmit()
│  └─ Detects isEditMode = true
│  └─ Calls taskService.updateTask(task)
│  └─ PUT /todos/5
│
├─ Step 5: API Response
│  └─ Returns updated task
│
├─ Step 6: TaskFormComponent receives response
│  └─ Calls taskState.notifyTaskUpdated(updated)
│  └─ Resets form and isEditMode
│
├─ Step 7: TaskStateService emits
│  └─ taskUpdatedSubject.next(updated)
│
└─ Step 8: TaskListComponent receives
   └─ Subscribed to taskUpdated$
   └─ Updates: tasks.map(t => t.id === updated.id ? updated : t)
   └─ Calls applyFilter()
   └─ UI updates with new data

RESULT: Task updated in list!
```

---

## 4. Data Flow: Search with Debounce

```
USER TYPES: "a" → "an" → "ang" → "angu" → "angul" → "angular"
│
├─ Each keystroke triggers:
│  └─ TaskListComponent.onSearch(term)
│     └─ searchSubject.next(term)
│
├─ RxJS Pipeline:
│  └─ searchSubject
│     .pipe(
│        debounceTime(350),      ← WAITS 350ms after last keystroke
│        distinctUntilChanged()  ← Only if value changed
│     )
│
├─ After 350ms of no typing:
│  └─ Subscribe callback fires
│  └─ taskService.searchTasks("angular")
│     └─ GET /todos?q=angular
│
├─ API Response:
│  └─ Returns matching tasks
│
└─ Component updates:
   └─ tasks = results.slice(0, 20)
   └─ applyFilter()
   └─ UI shows results

OPTIMIZATION: Only 1 API call instead of 7!
```

**Visual Timeline:**
```
Time: 0ms    100ms  200ms  300ms  400ms  500ms  600ms  700ms  850ms
Type: a      an     ang    angu   angul  angula angular (stop)
      ↓      ↓      ↓      ↓      ↓      ↓      ↓      ║
      (wait) (wait) (wait) (wait) (wait) (wait) (wait) ║
      ←───────────── 350ms debounce timer ────────────→ ║
                                                         ▼
                                                    API CALL!
```

---

## 5. Component Communication Patterns

### Pattern 1: Parent → Child (Not used here, but good to know)
```
┌─────────────┐
│   Parent    │
│  [data]     │
└──────┬──────┘
       │ @Input()
       ▼
┌─────────────┐
│   Child     │
│  receives   │
└─────────────┘
```

### Pattern 2: Child → Parent (Not used here)
```
┌─────────────┐
│   Parent    │
│  receives   │
└──────▲──────┘
       │ @Output()
       │
┌──────┴──────┐
│   Child     │
│  emits      │
└─────────────┘
```

### Pattern 3: Sibling → Sibling (Used in this project!)
```
┌──────────────┐              ┌──────────────┐
│ TaskFormComp │              │ TaskListComp │
│  (Sibling)   │              │  (Sibling)   │
└───────┬──────┘              └──────▲───────┘
        │                            │
        │ emit()              subscribe()
        ▼                            │
    ┌───────────────────────────────┐
    │   TaskStateService (Mediator) │
    │   • Subject emits events      │
    │   • Observables for listening │
    └───────────────────────────────┘
```

**Why this pattern?**
- ✅ Decoupled: Components don't know about each other
- ✅ Scalable: Easy to add more listeners
- ✅ Testable: Can test components independently

---

## 6. RxJS Observable Flow

### HTTP GET Request
```
Component calls:
┌──────────────────────┐
│ taskService.getTasks()│
└──────────┬───────────┘
           │ returns Observable<Task[]>
           ▼
┌────────────────────────┐
│  Observable<Task[]>    │  ← Stream (not data yet!)
│  (cold - not active)   │
└────────────────────────┘
           │
           │ .subscribe()
           ▼
┌────────────────────────┐
│  Subscription starts   │
│  HTTP request sent     │
└────────┬───────────────┘
         │
         ▼ (API responds)
┌────────────────────────┐
│  next: (data) => {}    │  ← Success callback
│  error: (err) => {}    │  ← Error callback
└────────────────────────┘
```

### Subject Flow
```
Component A:
┌──────────────────────────┐
│ stateService.emit(task)  │
└────────────┬─────────────┘
             │
             ▼
┌────────────────────────────┐
│  Subject.next(task)        │
│  (multicast to all subs)   │
└─────────────┬──────────────┘
              │
              ├────────────┬──────────────┐
              ▼            ▼              ▼
       ┌──────────┐ ┌──────────┐  ┌──────────┐
       │  Sub #1  │ │  Sub #2  │  │  Sub #3  │
       │Component │ │Component │  │Component │
       └──────────┘ └──────────┘  └──────────┘
```

---

## 7. Service Layer Architecture

```
┌─────────────────────────────────────────────────┐
│             COMPONENT LAYER                     │
│  • TaskFormComponent                            │
│  • TaskListComponent                            │
│  └─ Contains UI logic only                      │
└─────────────┬───────────────────────────────────┘
              │ inject services
              ▼
┌─────────────────────────────────────────────────┐
│             SERVICE LAYER                       │
│  ┌────────────────────┐  ┌──────────────────┐  │
│  │  TaskStateService  │  │   TaskService    │  │
│  │  (Event Bus)       │  │   (HTTP Calls)   │  │
│  │  • Subjects        │  │   • GET          │  │
│  │  • Observables     │  │   • POST         │  │
│  │  • emit/subscribe  │  │   • PUT/PATCH    │  │
│  └────────────────────┘  │   • DELETE       │  │
│                          └────────┬──────────┘  │
└─────────────────────────────────┼──────────────┘
                                  │ HTTP
                                  ▼
               ┌──────────────────────────────┐
               │     EXTERNAL API             │
               │  JSONPlaceholder             │
               └──────────────────────────────┘
```

**Separation of Concerns:**
1. **Components:** UI rendering, user interactions
2. **TaskService:** HTTP communication with API
3. **TaskStateService:** Inter-component communication
4. **API:** Data persistence (external)

---

## 8. Subscription Lifecycle

```
┌─────────────────────────────────────┐
│         ngOnInit()                  │
│  Component is initialized           │
│  ↓                                  │
│  Create subscription:               │
│  this.sub = observable$.subscribe()│
└─────────────┬───────────────────────┘
              │
              │ Component active
              │ Subscription listening
              │ Memory allocated
              │
              ▼
┌─────────────────────────────────────┐
│  Observable emits values            │
│  Component processes them           │
│  UI updates                         │
└─────────────┬───────────────────────┘
              │
              │ User navigates away
              │
              ▼
┌─────────────────────────────────────┐
│         ngOnDestroy()               │
│  Component is destroyed             │
│  ↓                                  │
│  Clean up:                          │
│  this.sub.unsubscribe()             │ ← CRITICAL!
│  Memory freed                       │
└─────────────────────────────────────┘
```

**Without unsubscribe:**
```
Component destroyed → Subscription still active → Memory leak 💥
```

---

## 9. HTTP Request Types

### GET - Retrieve data
```
GET /todos
Response: [{ id: 1, title: "...", completed: false }, ...]
Use case: Load all tasks
```

### POST - Create new resource
```
POST /todos
Body: { title: "New task", completed: false }
Response: { id: 201, title: "New task", completed: false }
Use case: Add new task
```

### PUT - Replace entire resource
```
PUT /todos/5
Body: { id: 5, title: "Updated", completed: true, userId: 1 }
Response: { id: 5, title: "Updated", completed: true, userId: 1 }
Use case: Full update of task
```

### PATCH - Update partial resource
```
PATCH /todos/5
Body: { completed: true }  ← Only what changed
Response: { id: 5, title: "...", completed: true, userId: 1 }
Use case: Toggle completion status
```

### DELETE - Remove resource
```
DELETE /todos/5
Response: {}
Use case: Delete task
```

---

## 10. State Management Flow

### Local State (Component-level)
```
TaskFormComponent:
┌─────────────────────┐
│ task: Task          │ ← Local state
│ isEditMode: boolean │
│ isLoading: boolean  │
│ errorMessage: string│
└─────────────────────┘
Only this component can access these
```

### Shared State (Service-level)
```
TaskStateService:
┌──────────────────────────┐
│ editTaskSubject          │ ← Shared state
│ taskAddedSubject         │
│ taskUpdatedSubject       │
└──────────┬───────────────┘
           │
           ├─→ TaskFormComponent (subscribes)
           └─→ TaskListComponent (subscribes)

Multiple components can access these
```

### Backend State (API)
```
JSONPlaceholder API:
┌──────────────────────┐
│ Database             │ ← Source of truth
│ tasks: [...]         │
└──────────────────────┘
All clients sync with this
```

---

## 11. Error Handling Flow

```
User submits form
       ↓
TaskFormComponent.onSubmit()
       ↓
taskService.addTask(task) → HTTP POST
       │
       ├─→ SUCCESS (Status 200-299)
       │   ↓
       │   next: (response) => {
       │     this.successMessage = "Task created!"
       │     this.taskState.notifyTaskAdded(response)
       │     this.resetForm()
       │   }
       │
       └─→ ERROR (Network fail, 400, 500, etc.)
           ↓
           error: (err) => {
             this.errorMessage = "Failed to create task"
             this.isLoading = false
             console.error(err)
           }
```

**Error Types:**
1. **Network errors:** API unreachable
2. **Client errors (4xx):** Bad request, validation failed
3. **Server errors (5xx):** API internal error
4. **Timeout errors:** Request took too long

---

## 12. Optimistic UI Update Pattern

Used in `toggleComplete()`:

```
User clicks checkbox
       ↓
Step 1: Update UI immediately (optimistic)
┌─────────────────────────────┐
│ task.completed = !task.completed │  ← UI updates instantly
│ this.applyFilter()           │
└─────────────────────────────┘
       ↓
Step 2: Send request to API
┌─────────────────────────────┐
│ taskService.updateTaskStatus() │
└─────────────────────────────┘
       │
       ├─→ SUCCESS
       │   ↓
       │   Keep the optimistic update
       │   User sees instant response
       │
       └─→ ERROR
           ↓
           Revert the UI change
           ┌─────────────────────────────┐
           │ task.completed = previousState │
           │ this.applyFilter()           │
           └─────────────────────────────┘
           Show error message

RESULT: Fast UI, reliable data
```

**Why this pattern?**
- ✅ Instant user feedback
- ✅ Feels responsive
- ✅ Handles errors gracefully

---

## 13. Change Detection Flow

```
User action (click, input, etc.)
       ↓
Component property changes
       ↓
Angular Change Detection runs
       ↓
┌────────────────────────────────┐
│ Checks all bindings:           │
│ • {{ task.title }}             │
│ • [class.completed]="..."      │
│ • *ngIf="isLoading"            │
│ • *ngFor="let task of tasks"   │
└────────────────────────────────┘
       ↓
DOM updates where needed
       ↓
User sees updated UI
```

**When change detection runs:**
1. User events (click, input, submit)
2. HTTP responses (Observable emits)
3. Timers (setTimeout, setInterval)
4. Manual trigger: `this.cdr.detectChanges()`

---

## 14. Project File Structure

```
task-ms/
├── src/
│   ├── app/
│   │   ├── task.ts                    # Data model
│   │   ├── task.service.ts            # HTTP API
│   │   ├── task-state.service.ts      # Event bus
│   │   ├── app.ts                     # Root component
│   │   ├── app.config.ts              # App config
│   │   ├── task-form/
│   │   │   ├── task-form.ts           # Form logic
│   │   │   ├── task-form.html         # Form template
│   │   │   └── task-form.css          # Form styles
│   │   └── task-list/
│   │       ├── task-list.ts           # List logic
│   │       ├── task-list.html         # List template
│   │       └── task-list.css          # List styles
│   ├── index.html                     # HTML shell
│   ├── main.ts                        # Bootstrap app
│   └── styles.css                     # Global styles
├── angular.json                       # Angular config
├── package.json                       # Dependencies
└── tsconfig.json                      # TypeScript config
```

**File Responsibilities:**
- `.ts` files: Logic, state, behavior
- `.html` files: Structure, layout
- `.css` files: Styling, appearance
- `*.service.ts`: Reusable business logic
- `app.config.ts`: Dependency injection setup

---

## Summary

This project demonstrates:
1. ✅ **Angular fundamentals:** Components, services, DI
2. ✅ **RxJS patterns:** Observables, Subjects, operators
3. ✅ **HTTP communication:** REST API CRUD operations
4. ✅ **State management:** Service-based state
5. ✅ **Component communication:** Subject/Observable pattern
6. ✅ **User experience:** Loading states, error handling, optimistic updates
7. ✅ **Performance:** Debouncing, change detection optimization

**Core principle:**
```
Action → Service → API → State → UI
```

Everything flows in one direction, making the app predictable and maintainable.
