import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Task, TaskFilter, CreateTaskDto, UpdateTaskDto } from '../models/task.models';

export interface PaginatedResponse<T> { items: T[]; page: number; pageSize: number; totalCount: number; }

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/tasks`;

  getTasks(filter?: TaskFilter): Observable<Task[]> {
    let params = new HttpParams();
    if (filter) {
      if (filter.categoryId) params = params.set('categoriaId', filter.categoryId);
      if (filter.fromDate) params = params.set('fechaDesde', filter.fromDate);
      if (filter.toDate) params = params.set('fechaHasta', filter.toDate);
      if (filter.prioridad) params = params.set('prioridad', filter.prioridad);
      if (filter.completada !== undefined) params = params.set('completada', filter.completada.toString());
      if (filter.page) params = params.set('page', filter.page.toString());
      if (filter.pageSize) params = params.set('pageSize', filter.pageSize.toString());
    }
    return this.http.get<PaginatedResponse<Task>>(this.apiUrl, { params }).pipe(map(r => r.items));
  }

  createTask(task: CreateTaskDto): Observable<Task> { return this.http.post<Task>(this.apiUrl, task); }
  updateTask(id: number, task: UpdateTaskDto): Observable<Task> { return this.http.put<Task>(`${this.apiUrl}/${id}`, task); }
  deleteTask(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
