import { Component, OnInit, ElementRef, HostBinding } from '@angular/core';
import { NzaLayoutComponent } from './layout.component';

@Component({
  selector: 'nz-admin-menu-layout-sider',
  exportAs: 'nzAdminMenuLayoutSider',
  templateUrl: './menu-layout-sider.component.html',
})
export class NzaMenuLayoutSiderComponent
  extends NzaLayoutComponent
  implements OnInit {
  @HostBinding('class') nzaClasses = 'nz-admin-menu-layout-sider';

  constructor(protected el: ElementRef) {
    super(el);
  }

  ngOnInit(): void {}
}
