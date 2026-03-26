import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Task, TaskFilter, prioridadToNumber } from '../core/models/task.models';
import { TaskService } from '../core/services/task.service';
import { ToastService } from '../shared/services/toast.service';
import { FilterBarComponent } from '../shared/components/filter-bar/filter-bar.component';
import { TaskFormComponent } from './task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, DragDropModule, FilterBarComponent, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  private toastService = inject(ToastService);
  tasks = signal<Task[]>([]);
  loading = signal(true);
  showModal = signal(false);
  editingTask: Task | null = null;

  ngOnInit(): void { this.loadTasks(); }

  loadTasks(filter?: TaskFilter): void {
    this.loading.set(true);
    this.taskService.getTasks({ ...filter, page: 1, pageSize: 50 }).subscribe({
      next: (tasks) => { this.tasks.set(tasks); this.loading.set(false); },
      error: () => { this.toastService.error('Error al cargar las tareas'); this.loading.set(false); }
    });
  }

  onFilterChange(filter: TaskFilter): void { this.loadTasks(filter); }
  openCreateModal(): void { this.editingTask = null; this.showModal.set(true); }
  openEditModal(task: Task): void { this.editingTask = task; this.showModal.set(true); }
  deleteTask(task: Task): void {
    if (confirm(`¿Eliminar tarea "${task.titulo}"?`)) {
      this.taskService.deleteTask(task.id).subscribe({
        next: () => { this.toastService.success('Tarea eliminada'); this.loadTasks(); },
        error: () => this.toastService.error('Error al eliminar')
      });
    }
  }
  toggleTaskCompletion(task: Task): void {
    this.taskService.updateTask(task.id, { completada: !task.completada }).subscribe({
      next: () => { this.toastService.success(task.completada ? 'Tarea marcada como pendiente' : '¡Tarea completada!'); this.loadTasks(); },
      error: () => this.toastService.error('Error al actualizar')
    });
  }
  onModalClose(): void { this.showModal.set(false); this.loadTasks(); }
  getPriorityColor(p: string | number): string { const c = { 0: 'secondary', 1: 'warning', 2: 'danger' }; return c[prioridadToNumber(p)] || 'secondary'; }
  getPriorityLabel(p: string | number): string { return typeof p === 'string' ? p : ['Baja', 'Media', 'Alta'][p] || 'Media'; }
  formatDate(d: string): string { return d ? new Date(d).toLocaleDateString('es-ES') : '-'; }
}
