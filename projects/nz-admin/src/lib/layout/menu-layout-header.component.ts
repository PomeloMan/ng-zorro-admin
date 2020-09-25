import { Component, OnInit, ElementRef, HostBinding } from '@angular/core';
import { NzaLayoutComponent } from './layout.component';

@Component({
  selector: 'nz-admin-menu-layout-header',
  exportAs: 'nzAdminMenuLayoutHeader',
  templateUrl: './menu-layout-header.component.html',
})
export class NzaMenuLayoutHeaderComponent
  extends NzaLayoutComponent
  implements OnInit {
  @HostBinding('class') nzaClasses = 'nz-admin-menu-layout-header';

  constructor(protected el: ElementRef) {
    super(el);
  }

  ngOnInit(): void {}
}
