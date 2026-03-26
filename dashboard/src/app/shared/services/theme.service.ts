import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkModeSignal = signal(this.loadTheme());
  isDarkMode = this.darkModeSignal.asReadonly();

  constructor() {
    effect(() => {
      const isDark = this.darkModeSignal();
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  private loadTheme(): boolean {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme() { this.darkModeSignal.update(v => !v); }
}
