import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empty-state">
      <span class="empty-icon" [innerHTML]="icon"></span>
      <p class="empty-message">{{ message }}</p>
      <p class="empty-submessage" *ngIf="submessage">{{ submessage }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        text-align: center;
      }
      .empty-icon {
        font-size: 48px;
        margin-bottom: 12px;
        opacity: 0.4;
      }
      .empty-message {
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 4px;
      }
      .empty-submessage {
        font-size: 13px;
        color: #9ca3af;
      }
    `,
  ],
})
export class EmptyStateComponent {
  @Input() message = 'データがありません';
  @Input() icon = '&#128196;';
  @Input() submessage = '';
}
