import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, timer } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService implements OnDestroy {
  private destroy$ = new Subject<void>();
  notificationCount = 0;

  constructor(private http: HttpClient) {}

  startPolling(): void {
    timer(0, 60000)
      .pipe(
        switchMap(() =>
          this.http
            .get<{ unreadCount: number }>('/api/notifications/unread-count')
            .pipe(catchError(() => of({ unreadCount: 0 }))),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe((result) => {
        this.notificationCount = result.unreadCount;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
