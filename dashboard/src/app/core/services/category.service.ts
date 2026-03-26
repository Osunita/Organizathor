import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category, CategoryCreate } from '../models/category.models';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/categories`;

  getCategories(): Observable<Category[]> { return this.http.get<Category[]>(this.apiUrl); }
  createCategory(category: CategoryCreate): Observable<Category> { return this.http.post<Category>(this.apiUrl, category); }
  deleteCategory(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
