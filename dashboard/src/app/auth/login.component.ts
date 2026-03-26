import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { LoginRequest } from '../core/models/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  email = ''; password = ''; loading = false; errorMessage = '';

  onSubmit(): void {
    if (!this.email || !this.password) { this.errorMessage = 'Completa todos los campos.'; return; }
    this.loading = true; this.errorMessage = '';
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/dashboard']); },
      error: (err) => { this.loading = false; this.errorMessage = err.status === 401 ? 'Credenciales inválidas.' : 'Error al iniciar sesión.'; }
    });
  }
}
