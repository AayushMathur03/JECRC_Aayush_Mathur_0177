import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, inject, effect } from '@angular/core';
import { AuthService } from '../services/auth';

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective implements OnInit {
  @Input('appRole') requiredRole: string = '';

  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private authService = inject(AuthService);

  ngOnInit() {
    // React to role changes reactively using effect()
    effect(() => {
      const currentRole = this.authService.role();  // reads signal
      this.updateView(currentRole);
    });
  }

  private updateView(currentRole: string) {
    this.viewContainer.clear();  // always clear first

    if (currentRole === this.requiredRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);  // show
    }
    // If role doesn't match — element stays removed from DOM
  }
}