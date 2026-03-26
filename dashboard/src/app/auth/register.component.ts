import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../core/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  email = ''; password = ''; confirmPassword = '';
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  onSubmit() {
    this.errorMessage.set(''); this.successMessage.set('');
    if (!this.email || !this.password || !this.confirmPassword) { this.errorMessage.set('Todos los campos son obligatorios'); return; }
    if (this.password !== this.confirmPassword) { this.errorMessage.set('Las contraseñas no coinciden'); return; }
    if (this.password.length < 6) { this.errorMessage.set('La contraseña debe tener al menos 6 caracteres'); return; }
    this.loading.set(true);
    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: () => { this.loading.set(false); this.successMessage.set('¡Cuenta creada! Redirigiendo...'); setTimeout(() => this.router.navigate(['/auth/login']), 2000); },
      error: (e: HttpErrorResponse) => { this.loading.set(false); this.errorMessage.set(e.error?.message || 'Error al crear cuenta'); }
    });
  }
  goToLogin() { this.router.navigate(['/auth/login']); }
}
