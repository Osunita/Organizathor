import { Component, OnInit, inject, signal, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note, NoteFilter } from '../core/models/note.models';
import { NoteService } from '../core/services/note.service';
import { ToastService } from '../shared/services/toast.service';
import { ThemeService } from '../shared/services/theme.service';
import { NoteFormComponent } from './note-form.component';
import { FilterBarComponent } from '../shared/components/filter-bar/filter-bar.component';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, NoteFormComponent, FilterBarComponent],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent implements OnInit {
  private noteService = inject(NoteService);
  private toastService = inject(ToastService);
  themeService = inject(ThemeService);
  notes = signal<Note[]>([]);
  loading = signal(true);
  showModal = signal(false);
  editingNote: Note | null = null;

  ngOnInit(): void { this.loadNotes(); }

  loadNotes(filter?: NoteFilter): void {
    this.loading.set(true);
    this.noteService.getNotes(filter).subscribe({
      next: (notes) => { this.notes.set(notes); this.loading.set(false); },
      error: () => { this.toastService.error('Error al cargar las notas'); this.loading.set(false); }
    });
  }

  onFilterChange(filter: NoteFilter): void { this.loadNotes(filter); }
  getNoteBackground(note: Note): string { return this.themeService.isDarkMode() ? '' : note.color || '#ffffff'; }
  openCreateModal(): void { this.editingNote = null; this.showModal.set(true); }
  openEditModal(note: Note): void { this.editingNote = note; this.showModal.set(true); }
  deleteNote(note: Note): void {
    if (confirm(`¿Eliminar nota "${note.titulo}"?`)) {
      this.noteService.deleteNote(note.id).subscribe({
        next: () => { this.toastService.success('Nota eliminada'); this.loadNotes(); },
        error: () => this.toastService.error('Error al eliminar')
      });
    }
  }
  onModalClose(): void { this.showModal.set(false); this.loadNotes(); }
  formatDate(d: string): string { return d ? new Date(d).toLocaleDateString('es-ES') : '-'; }
}
