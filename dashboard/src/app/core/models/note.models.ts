export interface CreateNoteDto { titulo: string; contenido?: string; color?: string; }
export interface UpdateNoteDto { titulo?: string; contenido?: string; color?: string; }

export interface Note {
  id: number; titulo: string; contenido?: string; color?: string;
  categoriaId: number; categoriaNombre?: string; fechaCreacion: string;
}

export interface NoteFilter { categoryId?: string; fromDate?: string; toDate?: string; page?: number; pageSize?: number; }
