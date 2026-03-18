import { Directive, Input, HostListener, ElementRef, Renderer2, OnChanges } from '@angular/core';

@Directive({
  selector: '[appClickBlock]',
  standalone: true
})
export class ClickBlockDirective implements OnChanges {

  @Input('appClickBlock') isAllowed: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.isAllowed) {
      // Allow → remove blocked styles
      this.renderer.removeClass(this.el.nativeElement, 'blocked');
      this.renderer.removeStyle(this.el.nativeElement, 'pointer-events');
      this.renderer.removeStyle(this.el.nativeElement, 'opacity');
      this.renderer.removeStyle(this.el.nativeElement, 'cursor');
    } else {
      // Block → add blocked styles
      this.renderer.addClass(this.el.nativeElement, 'blocked');
      this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.45');
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'not-allowed');
    }
  }

  // Extra safety: block the click event in JS too
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.isAllowed) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
}