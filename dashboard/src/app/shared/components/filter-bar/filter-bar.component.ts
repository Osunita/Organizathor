import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskFilter } from '../../../core/models/task.models';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.models';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent implements OnInit {
  @Output() filterChange = new EventEmitter<TaskFilter>();
  private categoryService = inject(CategoryService);

  fechaDesde = ''; fechaHasta = ''; prioridad = ''; completada: boolean | null = null; categoriaId = '';
  categories: Category[] = [];
  prioridadOptions = [{ value: '', label: 'Todas' }, { value: 'Baja', label: 'Baja' }, { value: 'Media', label: 'Media' }, { value: 'Alta', label: 'Alta' }];
  statusOptions = [{ value: '', label: 'Todas' }, { value: 'true', label: 'Completadas' }, { value: 'false', label: 'Pendientes' }];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({ next: (c) => this.categories = c, error: () => {} });
  }

  onFilterChange(): void {
    const filter: TaskFilter = {};
    if (this.fechaDesde) filter.fromDate = this.fechaDesde;
    if (this.fechaHasta) filter.toDate = this.fechaHasta;
    if (this.prioridad) filter.prioridad = this.prioridad;
    if (this.completada !== null) filter.completada = this.completada;
    if (this.categoriaId) filter.categoryId = this.categoriaId;
    this.filterChange.emit(filter);
  }

  resetFilters(): void { this.fechaDesde = ''; this.fechaHasta = ''; this.prioridad = ''; this.completada = null; this.categoriaId = ''; this.onFilterChange(); }
}
