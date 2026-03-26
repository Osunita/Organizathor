import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, catchError, of, timeout } from 'rxjs';
import { TaskService } from '../core/services/task.service';
import { NoteService } from '../core/services/note.service';
import { CategoryService } from '../core/services/category.service';
import { Task } from '../core/models/task.models';
import { Note } from '../core/models/note.models';
import { Category } from '../core/models/category.models';
import { KpiCardComponent } from '../shared/components/kpi-card/kpi-card.component';
import { ChartBarComponent } from './components/chart-bar/chart-bar.component';
import { ChartLineComponent } from './components/chart-line/chart-line.component';
import { ChartDoughnutComponent } from './components/chart-doughnut/chart-doughnut.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, KpiCardComponent, ChartBarComponent, ChartLineComponent, ChartDoughnutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private taskService = inject(TaskService);
  private noteService = inject(NoteService);
  private categoryService = inject(CategoryService);

  tasks = signal<Task[]>([]);
  notes = signal<Note[]>([]);
  categories = signal<Category[]>([]);
  loading = signal(true);
  hasError = signal(false);

  totalTasks = computed(() => this.tasks().length);
  completedToday = computed(() => {
    const today = new Date().toDateString();
    return this.tasks().filter(t => t.completada && new Date(t.fechaCreacion).toDateString() === today).length;
  });
  overdueTasks = computed(() => {
    const now = new Date();
    return this.tasks().filter(t => !t.completada && new Date(t.fechaVencimiento) < now).length;
  });

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    forkJoin({
      tasks: this.taskService.getTasks().pipe(timeout(10000), catchError(() => of([]))),
      notes: this.noteService.getNotes().pipe(timeout(10000), catchError(() => of([]))),
      categories: this.categoryService.getCategories().pipe(timeout(10000), catchError(() => of([])))
    }).subscribe({
      next: ({ tasks, notes, categories }) => {
        this.tasks.set(tasks); this.notes.set(notes); this.categories.set(categories);
        this.loading.set(false);
      },
      error: () => { this.loading.set(false); this.hasError.set(true); }
    });
  }
}
