import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private api = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  //GET all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api);
  }

  //GET a task by id
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.api}/${id}`);
  }

  //POST Create a new task 
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.api, task);
  }

  //PUT Update full task
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.api}/${task.id}`, task);
  }

  // PATCH Update partial task
  updateTaskStatus(id: number, completed: boolean): Observable<Task> {
    return this.http.patch<Task>(`${this.api}/${id}`, { completed : completed});
  }

  // Generic PATCH (resusable for any field)
  updatePartial(id: number, updates: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.api}/${id}`, updates);
  }

  //DELETE a task
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  //Search Task (API filter)
  searchTasks(term: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.api}?q=${term}`);
  }
}