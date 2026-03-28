import { Component } from '@angular/core';
import { RecordTableComponent } from './components/record-table/record-table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecordTableComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}