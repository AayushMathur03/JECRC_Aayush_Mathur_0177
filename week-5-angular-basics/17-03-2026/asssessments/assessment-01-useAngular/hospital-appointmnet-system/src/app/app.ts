import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment';

@Component({
  selector: 'app-root',
  imports: [AppointmentComponent, CommonModule],
  template: '<app-appointment></app-appointment>',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hospital-appointmnet-system');
}
