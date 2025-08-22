import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-container" *ngIf="loadingService.isLoading$ | async">
      <div class="spinner"></div>
      <span class="loading-text" *ngIf="loadingService.message$ | async as message">
        {{ message }}
      </span>
    </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
