import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task, CreateTaskDto, UpdateTaskDto, prioridadToNumber } from '../core/models/task.models';
import { TaskService } from '../core/services/task.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter<void>();
  private taskService = inject(TaskService);
  private toastService = inject(ToastService);

  prioridadOptions = [{ value: 'Baja', label: 'Baja' }, { value: 'Media', label: 'Media' }, { value: 'Alta', label: 'Alta' }];
  form = new FormGroup({ titulo: new FormControl('', [Validators.required, Validators.minLength(3)]), contenido: new FormControl(''), fechaVencimiento: new FormControl(''), prioridad: new FormControl('Media') });

  ngOnInit(): void {
    if (this.task) {
      this.form.patchValue({ titulo: this.task.titulo, contenido: this.task.contenido, fechaVencimiento: this.task.fechaVencimiento?.split('T')[0], prioridad: typeof this.task.prioridad === 'string' ? this.task.prioridad : ['Baja', 'Media', 'Alta'][this.task.prioridad] });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const data = this.form.value;
    if (this.task) {
      this.taskService.updateTask(this.task.id, { titulo: data.titulo!, contenido: data.contenido || undefined, fechaVencimiento: data.fechaVencimiento || undefined, prioridad: data.prioridad || 'Media' }).subscribe({
        next: () => { this.toastService.success('Tarea actualizada'); this.close.emit(); },
        error: () => this.toastService.error('Error al actualizar')
      });
    } else {
      this.taskService.createTask({ titulo: data.titulo!, contenido: data.contenido || undefined, fechaVencimiento: data.fechaVencimiento || undefined, prioridad: data.prioridad || 'Media' }).subscribe({
        next: () => { this.toastService.success('Tarea creada'); this.close.emit(); },
        error: () => this.toastService.error('Error al crear')
      });
    }
  }
  onCancel(): void { this.close.emit(); }
}
