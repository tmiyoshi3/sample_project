import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="loading-spinner"><div class="spinner"></div></div>`,
  styles: [`
    .loading-spinner { display: flex; justify-content: center; align-items: center; padding: 40px; }
    .spinner {
      width: 40px; height: 40px;
      border: 3px solid #e5e7eb; border-top-color: #3b82f6;
      border-radius: 50%; animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class LoadingSpinnerComponent {}
