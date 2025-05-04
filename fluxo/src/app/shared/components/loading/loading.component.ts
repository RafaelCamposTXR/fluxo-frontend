import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-container" *ngIf="loadingService.isLoading$ | async">
      <div class="spinner"></div>
      <span class="loading-text">{{ loadingService.message$ | async }}</span>
    </div>
  `,
  styles: [`
    .loading-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      z-index: 1000;
      font-size: 14px;
      gap: 12px;
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid transparent;
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .loading-text {
      white-space: nowrap;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
