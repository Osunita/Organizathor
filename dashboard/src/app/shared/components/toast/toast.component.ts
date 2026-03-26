import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div *ngFor="let toast of toasts()" class="toast show" [class.bg-success]="toast.type === 'success'" [class.bg-danger]="toast.type === 'error'" [class.bg-warning]="toast.type === 'warning'" [class.bg-info]="toast.type === 'info'" [class.text-white]="toast.type !== 'info'" role="alert">
        <div class="toast-body d-flex justify-content-between align-items-center">
          {{ toast.message }}
          <button type="button" class="btn-close" (click)="dismiss(toast.id)"></button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toast-container { z-index: 9999; }
    .toast { min-width: 250px; margin-bottom: 0.5rem; }
  `]
})
export class ToastComponent {
  private toastService = inject(ToastService);
  toasts = this.toastService.toasts;
  dismiss(id: number) { this.toastService.dismiss(id); }
}
