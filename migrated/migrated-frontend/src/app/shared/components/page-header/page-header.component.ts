import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <h1 class="page-title">{{ title }}</h1>
      <p class="page-description" *ngIf="description">{{ description }}</p>
    </div>
  `,
  styles: [
    `
      .page-header {
        margin-bottom: 20px;
      }
      .page-title {
        font-size: 24px;
        font-weight: 700;
        color: #1a5276;
        border-bottom: 2px solid #1a5276;
        padding-bottom: 8px;
        margin: 0;
      }
      .page-description {
        font-size: 14px;
        color: #6b7280;
        margin-top: 4px;
      }
    `,
  ],
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() description = '';
}
