import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
  standalone: true
})
export class StatusColorDirective implements OnInit {

  @Input('appStatusColor') marks: number = 0;
  @Input() passingMarks: number = 50;   // default passing criteria

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.marks >= this.passingMarks) {
      // Pass → Green
      this.renderer.addClass(this.el.nativeElement, 'status-pass');
    } else {
      // Fail → Red
      this.renderer.addClass(this.el.nativeElement, 'status-fail');
    }
  }
}