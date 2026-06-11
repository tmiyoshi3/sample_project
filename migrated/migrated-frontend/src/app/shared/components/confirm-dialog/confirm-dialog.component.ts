import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="visible" (click)="onOverlayClick($event)">
      <div class="modal-content confirm-dialog">
        <div class="dialog-header">
          <h3 class="dialog-title">{{ title }}</h3>
        </div>
        <div class="dialog-body">
          <p>{{ message }}</p>
        </div>
        <div class="dialog-footer">
          <button class="btn btn-outline" (click)="onCancel()">{{ cancelText }}</button>
          <button class="btn btn-primary" (click)="onConfirm()">{{ confirmText }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .confirm-dialog {
        background: #fff;
        border-radius: 12px;
        width: 420px;
        max-width: 90vw;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      }
      .dialog-header {
        padding: 16px 24px;
        border-bottom: 1px solid #e5e7eb;
      }
      .dialog-title {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
      }
      .dialog-body {
        padding: 20px 24px;
      }
      .dialog-body p {
        margin: 0;
        font-size: 14px;
        color: #374151;
        line-height: 1.6;
      }
      .dialog-footer {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        padding: 16px 24px;
        border-top: 1px solid #e5e7eb;
      }
      .btn {
        padding: 8px 20px;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
      }
      .btn-outline {
        background-color: #fff;
        color: #374151;
        border: 1px solid #d1d5db;
      }
      .btn-outline:hover {
        background-color: #f9fafb;
      }
      .btn-primary {
        background-color: #1a5276;
        color: #fff;
        border: none;
      }
      .btn-primary:hover {
        background-color: #154360;
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  @Input() title = '確認';
  @Input() message = 'この操作を実行してもよろしいですか？';
  @Input() confirmText = '確認';
  @Input() cancelText = 'キャンセル';
  @Input() visible = true;

  @Input() set confirmLabel(val: string) {
    this.confirmText = val;
  }
  @Input() set cancelLabel(val: string) {
    this.cancelText = val;
  }

  @Output() confirmed = new EventEmitter<boolean>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() confirm = new EventEmitter<void>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit(true);
    this.confirm.emit();
    this.visible = false;
  }

  onCancel(): void {
    this.confirmed.emit(false);
    this.cancel.emit();
    this.visible = false;
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onCancel();
    }
  }
}
