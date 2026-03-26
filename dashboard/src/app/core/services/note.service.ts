import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Note, NoteFilter, CreateNoteDto, UpdateNoteDto } from '../models/note.models';

export interface PaginatedResponse<T> { items: T[]; page: number; pageSize: number; totalCount: number; }

@Injectable({ providedIn: 'root' })
export class NoteService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/notes`;

  getNotes(filter?: NoteFilter): Observable<Note[]> {
    let params = new HttpParams();
    if (filter?.categoryId) params = params.set('categoriaId', filter.categoryId);
    return this.http.get<PaginatedResponse<Note>>(this.apiUrl, { params }).pipe(map(r => r.items));
  }

  createNote(note: CreateNoteDto): Observable<Note> { return this.http.post<Note>(this.apiUrl, note); }
  updateNote(id: number, note: UpdateNoteDto): Observable<Note> { return this.http.put<Note>(`${this.apiUrl}/${id}`, note); }
  deleteNote(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
