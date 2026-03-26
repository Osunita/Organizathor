import { Injectable, signal } from '@angular/core';
export interface Toast { id: number; message: string; type: 'success' | 'error' | 'warning' | 'info'; duration?: number; }

@Injectable({ providedIn: 'root' })
export class ToastService {
  private idCounter = 0;
  toasts = signal<Toast[]>([]);

  private show(message: string, type: Toast['type'], duration = 3000): void {
    const id = ++this.idCounter;
    this.toasts.update(current => [...current, { id, message, type, duration }]);
    if (duration > 0) setTimeout(() => this.dismiss(id), duration);
  }
  success(msg: string) { this.show(msg, 'success'); }
  error(msg: string) { this.show(msg, 'error', 5000); }
  warning(msg: string) { this.show(msg, 'warning', 4000); }
  info(msg: string) { this.show(msg, 'info'); }
  dismiss(id: number) { this.toasts.update(t => t.filter(x => x.id !== id)); }
  clear() { this.toasts.set([]); }
}
