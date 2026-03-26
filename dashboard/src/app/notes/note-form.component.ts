import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Note, CreateNoteDto, UpdateNoteDto } from '../core/models/note.models';
import { NoteService } from '../core/services/note.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss'
})
export class NoteFormComponent implements OnInit {
  @Input() note: Note | null = null;
  @Output() close = new EventEmitter<void>();
  private noteService = inject(NoteService);
  private toastService = inject(ToastService);

  colorPresets = ['#ffffff', '#fff3cd', '#d4edda', '#cce5ff', '#f8d7da'];
  form = new FormGroup({ titulo: new FormControl('', [Validators.required, Validators.minLength(2)]), contenido: new FormControl(''), color: new FormControl('#ffffff') });

  ngOnInit(): void {
    if (this.note) this.form.patchValue({ titulo: this.note.titulo, contenido: this.note.contenido, color: this.note.color || '#ffffff' });
  }

  selectColor(c: string): void { this.form.patchValue({ color: c }); }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const data = this.form.value;
    if (this.note) {
      this.noteService.updateNote(this.note.id, { titulo: data.titulo!, contenido: data.contenido || undefined, color: data.color }).subscribe({
        next: () => { this.toastService.success('Nota actualizada'); this.close.emit(); },
        error: () => this.toastService.error('Error al actualizar')
      });
    } else {
      this.noteService.createNote({ titulo: data.titulo!, contenido: data.contenido || undefined, color: data.color }).subscribe({
        next: () => { this.toastService.success('Nota creada'); this.close.emit(); },
        error: () => this.toastService.error('Error al crear')
      });
    }
  }
  onCancel(): void { this.close.emit(); }
}
