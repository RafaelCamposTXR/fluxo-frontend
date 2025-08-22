import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ToasterService, Toast } from '@shared/services/toaster.service';

@Component({
  selector: 'app-toaster',
  template: `
    <div class="toaster-container">
      <div
        *ngFor="let toast of toasts"
        class="toast"
        [ngClass]="toast.type"
        [@toastAnimation]="'visible'"
      >
        {{ toast.message }}
      </div>
    </div>
  `,
  styles: [`
    .toaster-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
    }

    .toast {
      padding: 12px 16px;
      margin-bottom: 10px;
      min-width: 200px;
      border-radius: 15px;
      color: white;
      font-size: 12px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    .error {
      background-color: #f44336;
    }

    .warning {
      background-color: #ff9800;
    }

    .success {
      background-color: #4caf50;
    }

    .info {
      background-color: #2196f3;
    }
  `],
  animations: [
    trigger('toastAnimation', [
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition(':enter', [
        style({
          transform: 'translateX(100%)',
          opacity: 0
        }),
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({
          transform: 'translateX(100%)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class ToasterComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toasterService: ToasterService) {}

  ngOnInit() {
    this.toasterService.toasts$.subscribe((toasts: Toast[]) => {
      this.toasts = toasts;
    });
  }
}
