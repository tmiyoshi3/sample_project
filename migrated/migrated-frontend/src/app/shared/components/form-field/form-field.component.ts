import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="form-field" [class.has-error]="errorMessage">
      <label *ngIf="label" [class.required-mark]="required">{{ label }}</label>
      <div class="field-content">
        <ng-content></ng-content>
      </div>
      <span class="error-message" *ngIf="errorMessage">{{ errorMessage }}</span>
    </div>
  `,
  styles: [`
    .form-field { margin-bottom: 0; }
    .form-field.has-error .field-content ::ng-deep input,
    .form-field.has-error .field-content ::ng-deep select,
    .form-field.has-error .field-content ::ng-deep textarea { border-color: #ef4444; }
    label { display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; color: #374151; }
    .required-mark::after { content: ' *'; color: #ef4444; }
    .field-content { width: 100%; }
    .error-message { display: block; font-size: 12px; color: #ef4444; margin-top: 4px; }
  `]
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() required = false;
  @Input() errorMessage = '';
}
