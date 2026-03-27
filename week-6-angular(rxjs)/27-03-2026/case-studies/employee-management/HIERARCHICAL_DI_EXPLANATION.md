# Employee Management System - Hierarchical Dependency Injection

## Overview
This application demonstrates Angular's Hierarchical Dependency Injection (DI) system with a complete employee management system.

## Components Implemented

### 1. Login Component (./src/app/auth/login/login.ts)
- Basic authentication with username/password
- Uses AuthService (root-level singleton)
- Redirects to employee list after successful login

### 2. Employee List Component (./src/app/employee/employee-list/employee-list.ts)
- Displays all employees
- Search functionality
- CRUD operation buttons (View, Edit, Delete)
- **Hierarchical DI:** Uses component-level LoggerService

### 3. Employee Add Component (./src/app/employee/employee-add/employee-add.ts)
- Form to add new employees
- Validation for all fields
- **Hierarchical DI:** Uses component-level LoggerService

### 4. Employee Edit Component (./src/app/employee/employee-edit/employee-edit.ts)
- Form to edit existing employees
- Shows edit history using notifications
- **Hierarchical DI:** Uses component-level NotificationService

### 5. Employee View Component (./src/app/employee/employee-view/employee-view.ts)
- Displays single employee details
- Edit and Delete buttons
- Uses root-level EmployeeService

### 6. Navbar Component (./src/app/shared/navbar/navbar.ts)
- Dynamic navigation based on authentication state
- Logout functionality
- Uses AuthService (root-level singleton)

## Services

### Root-Level Services (Singleton - Shared Across App)

#### 1. EmployeeService (./src/app/core/services/employee.ts)
```typescript
@Injectable({
  providedIn: 'root'  // Singleton - one instance for entire app
})
```
- Manages employee data (CRUD operations)
- Search functionality
- **Shared state** across all components

#### 2. AuthService (./src/app/core/services/auth.service.ts)
```typescript
@Injectable({
  providedIn: 'root'  // Singleton - one instance for entire app
})
```
- Manages authentication
- Login/logout functionality
- **Shared authentication state**

### Component-Level Services (New Instance Per Component)

#### 1. LoggerService (./src/app/core/services/logger.service.ts)
```typescript
@Injectable()  // No providedIn - requires explicit provider
```
- Logs component activities
- Tracks instance ID and log count
- **Different instance** in EmployeeList and EmployeeAdd

#### 2. NotificationService (./src/app/core/services/notification.service.ts)
```typescript
@Injectable()  // No providedIn - requires explicit provider
```
- Manages component-specific notifications
- Tracks edit history
- **Unique instance** in EmployeeEdit

## Hierarchical DI Demonstration

### Concept 1: Root-Level Singleton (EmployeeService)
```typescript
// In employee.ts
@Injectable({
  providedIn: 'root'  // Creates ONE instance for entire app
})
export class EmployeeService { }

// Used in multiple components - SAME instance
- EmployeeList uses it
- EmployeeAdd uses it
- EmployeeEdit uses it
- EmployeeView uses it
```
**Result:** All components share the same EmployeeService instance and data.

### Concept 2: Component-Level Providers (LoggerService)
```typescript
// In LoggerService
@Injectable()  // No providedIn - requires explicit provider

// In EmployeeList
@Component({
  providers: [LoggerService]  // Creates NEW instance for this component
})

// In EmployeeAdd
@Component({
  providers: [LoggerService]  // Creates ANOTHER NEW instance
})
```
**Result:**
- EmployeeList has its own LoggerService instance (different ID, separate log count)
- EmployeeAdd has its own LoggerService instance (different ID, separate log count)
- Each component's logs are tracked independently

### Concept 3: Component-Specific Services (NotificationService)
```typescript
// In EmployeeEdit
@Component({
  providers: [NotificationService]  // Creates instance only for this component
})
```
**Result:** NotificationService only exists in EmployeeEdit and maintains its own state.

## Hierarchical DI Benefits Demonstrated

1. **Shared State Management**
   - EmployeeService (root) maintains shared employee data
   - All components see the same employee list

2. **Isolated Component State**
   - Each component has its own logger with separate counters
   - EmployeeEdit has its own notification history

3. **Memory Efficiency**
   - Services are created only when needed
   - Component-level services are destroyed with the component

4. **Flexibility**
   - Can provide different service implementations at different levels
   - Can override root services at component level if needed

## Testing the Hierarchical DI

### Step 1: Check Logger Instance IDs
1. Navigate to Employee List → Note the Logger Instance ID
2. Click "Add New Employee" → Note the Logger Instance ID
3. **Observation:** The IDs are different! Each component has its own logger.

### Step 2: Check Log Counts
1. In Employee List, perform several actions (search, delete)
2. Note the increasing log count
3. Navigate to Add Employee
4. **Observation:** Log count starts at 0! It's a separate instance.

### Step 3: Check Shared EmployeeService
1. Add an employee in EmployeeAdd
2. Navigate back to EmployeeList
3. **Observation:** The new employee appears! They share the same EmployeeService.

### Step 4: Check NotificationService
1. Edit an employee
2. Note the Notification Service Instance ID
3. Make changes and observe the edit history
4. Navigate away and come back
5. **Observation:** Edit history is reset! New component instance = new service instance.

## Routes
```typescript
{ path: 'login', component: Login }
{ path: 'employees', component: EmployeeList, canActivate: [authGuard] }
{ path: 'employees/add', component: EmployeeAdd, canActivate: [authGuard] }
{ path: 'employees/edit/:id', component: EmployeeEdit, canActivate: [authGuard] }
{ path: 'employees/view/:id', component: EmployeeView, canActivate: [authGuard] }
```

## Guard
- **authGuard:** Protects employee routes, redirects to login if not authenticated

## Key Takeaways

1. **Root-level services** (`providedIn: 'root'`) → One instance for entire app
2. **Component-level services** (in `providers` array) → New instance per component
3. **Hierarchical lookup:** Angular searches for a provider from the component level up to root
4. **State isolation:** Component-level providers isolate state to that component
5. **Shared services:** Root-level services share state across the entire application

## Running the Application
```bash
npm install
ng serve
```

Login credentials:
- Username: admin
- Password: admin
