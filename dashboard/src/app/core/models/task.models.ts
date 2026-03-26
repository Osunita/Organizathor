export enum TaskStatus { Pending = 0, InProgress = 1, Completed = 2 }
export enum Prioridad { Baja = 0, Media = 1, Alta = 2 }

export interface CreateTaskDto { titulo: string; contenido?: string; fechaVencimiento?: string; prioridad?: string; }
export interface UpdateTaskDto { titulo?: string; contenido?: string; fechaVencimiento?: string; prioridad?: string; completada?: boolean; }

export interface Task {
  id: number; titulo: string; contenido: string; fechaVencimiento: string; prioridad: string; completada: boolean;
  categoriaId: number; categoriaNombre?: string; fechaCreacion: string;
}

export interface TaskFilter { status?: TaskStatus; categoryId?: string; fromDate?: string; toDate?: string; prioridad?: string; completada?: boolean; page?: number; pageSize?: number; }

export const PRIORIDAD_LABELS: Record<number, string> = { 0: 'Baja', 1: 'Media', 2: 'Alta' };
export const PRIORIDAD_NUMBERS: Record<string, number> = { 'Baja': 0, 'Media': 1, 'Alta': 2 };
export function prioridadToNumber(p: string): number { return PRIORIDAD_NUMBERS[p] ?? 1; }
export function prioridadToString(p: number): string { return PRIORIDAD_LABELS[p] ?? 'Media'; }
