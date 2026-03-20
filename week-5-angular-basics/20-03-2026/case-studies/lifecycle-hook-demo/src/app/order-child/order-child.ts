import { CommonModule } from '@angular/common';
import { Component, 
  Input, 
  SimpleChange,
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy,
    SimpleChanges
  } from '@angular/core';


@Component({
  selector: 'app-order-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-child.html',
  styleUrl: './order-child.css',
})
export class OrderChild implements
OnChanges,
OnInit,
DoCheck,
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy{
  @Input() orderData: any;

  logs: string[] = [];

  log(message: string) {
    this.logs.push(`[${new Date().toLocaleTimeString()}] ${message}`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.log('ngOnChanges - Input-Data changed');
  }

  ngOnInit()  {
    this.log('ngOnInit - Component initialized');
  }

  ngDoCheck() {
    this.log('ngDoCheck - Change detection run');
  }

  ngAfterContentInit() {
    this.log('ngAfterContentInit - Content initialized');
  }

  ngAfterContentChecked(){
    this.log('ngAfterContentChecked - Content checked');
  }

  ngAfterViewInit() {
    this.log('ngAfterViewInit - View initialized');
  }

  ngAfterViewChecked() {
    this.log('ngAfterViewChecked - View checked');
  }

  ngOnDestroy() {
    this.log('ngOnDestroy - Component destroyed');
  }
}

