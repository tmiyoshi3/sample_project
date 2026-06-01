import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="status-badge" [ngClass]="badgeClass">{{ displayLabel }}</span>`,
  styles: [
    `
      .status-badge {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        white-space: nowrap;
      }
      .badge-draft {
        background-color: #ecf0f1;
        color: #7f8c8d;
      }
      .badge-pending {
        background-color: #fef9e7;
        color: #f39c12;
      }
      .badge-approved {
        background-color: #eafaf1;
        color: #27ae60;
      }
      .badge-rejected {
        background-color: #fdedec;
        color: #e74c3c;
      }
      .badge-ordered {
        background-color: #ebf5fb;
        color: #2980b9;
      }
      .badge-shipped {
        background-color: #f4ecf7;
        color: #8e44ad;
      }
      .badge-delivered {
        background-color: #eafaf1;
        color: #1abc9c;
      }
      .badge-cancelled {
        background-color: #f6f6f6;
        color: #95a5a6;
      }
      .badge-in-stock {
        background-color: #eafaf1;
        color: #27ae60;
      }
      .badge-low-stock {
        background-color: #fef9e7;
        color: #e67e22;
      }
      .badge-out-of-stock {
        background-color: #fdedec;
        color: #e74c3c;
      }
      .badge-active {
        background-color: #eafaf1;
        color: #27ae60;
      }
      .badge-inactive {
        background-color: #f6f6f6;
        color: #95a5a6;
      }
      .badge-suspended {
        background-color: #fdedec;
        color: #e74c3c;
      }
      .badge-available {
        background-color: #ebf5fb;
        color: #2980b9;
      }
      .badge-discontinued {
        background-color: #f6f6f6;
        color: #7f8c8d;
      }
      .badge-default {
        background-color: #ecf0f1;
        color: #2c3e50;
      }
    `,
  ],
})
export class StatusBadgeComponent implements OnChanges {
  @Input() status = '';

  badgeClass = '';
  displayLabel = '';

  private readonly statusMap: { [key: string]: { label: string; cssClass: string } } = {
    DRAFT: { label: '下書き', cssClass: 'badge-draft' },
    SUBMITTED: { label: '申請中', cssClass: 'badge-submitted' },
    PENDING_APPROVAL: { label: '承認待ち', cssClass: 'badge-pending' },
    APPROVED: { label: '承認済み', cssClass: 'badge-approved' },
    REJECTED: { label: '却下', cssClass: 'badge-rejected' },
    ORDERED: { label: '発注済み', cssClass: 'badge-ordered' },
    PARTIALLY_ORDERED: { label: '一部発注済み', cssClass: 'badge-ordered' },
    SHIPPED: { label: '出荷済み', cssClass: 'badge-shipped' },
    DELIVERED: { label: '納品済み', cssClass: 'badge-delivered' },
    PARTIALLY_DELIVERED: { label: '一部納品', cssClass: 'badge-delivered' },
    RECEIVED: { label: '入荷済み', cssClass: 'badge-delivered' },
    PARTIALLY_RECEIVED: { label: '一部入荷', cssClass: 'badge-delivered' },
    INVOICED: { label: '請求済み', cssClass: 'badge-ordered' },
    CANCELLED: { label: 'キャンセル', cssClass: 'badge-cancelled' },
    CLOSED: { label: '完了', cssClass: 'badge-approved' },
    PENDING: { label: '保留中', cssClass: 'badge-pending' },
    IN_STOCK: { label: '在庫あり', cssClass: 'badge-in-stock' },
    LOW_STOCK: { label: '在庫少', cssClass: 'badge-low-stock' },
    OUT_OF_STOCK: { label: '在庫切れ', cssClass: 'badge-out-of-stock' },
    ACTIVE: { label: '有効', cssClass: 'badge-active' },
    INACTIVE: { label: '無効', cssClass: 'badge-inactive' },
    SUSPENDED: { label: '停止中', cssClass: 'badge-suspended' },
    AVAILABLE: { label: '販売中', cssClass: 'badge-available' },
    DISCONTINUED: { label: '販売終了', cssClass: 'badge-discontinued' },
  };

  ngOnChanges(): void {
    const mapped = this.statusMap[this.status];
    if (mapped) {
      this.badgeClass = mapped.cssClass;
      this.displayLabel = mapped.label;
    } else {
      this.badgeClass = 'badge-default';
      this.displayLabel = this.status;
    }
  }
}
