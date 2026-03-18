import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPriceHighlight]',
  standalone: true
})
export class PriceHighlightDirective implements OnInit {

  @Input('appPriceHighlight') price: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.price > 50000) {
      // High value → Red styling
      this.renderer.addClass(this.el.nativeElement, 'high-value');
    } else {
      // Normal → Green styling
      this.renderer.addClass(this.el.nativeElement, 'normal-value');
    }
  }
}