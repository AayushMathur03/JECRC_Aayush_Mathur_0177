import { Directive, Input, OnChanges, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTheme]',
  standalone: true
})
export class ThemeDirective implements OnChanges {

  @Input('appTheme') isDark: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.isDark) {
      // Dark mode → add dark class, remove light
      this.renderer.addClass(this.el.nativeElement, 'theme-dark');
      this.renderer.removeClass(this.el.nativeElement, 'theme-light');
    } else {
      // Light mode → add light class, remove dark
      this.renderer.addClass(this.el.nativeElement, 'theme-light');
      this.renderer.removeClass(this.el.nativeElement, 'theme-dark');
    }
  }
}