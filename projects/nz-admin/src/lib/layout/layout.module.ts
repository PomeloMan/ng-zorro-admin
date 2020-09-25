import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { NzaLayoutComponent } from './layout.component';
import { NzaMenuLayoutSiderComponent } from './menu-layout-sider.component';
import { NzaMenuLayoutHeaderComponent } from './menu-layout-header.component';

import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { SettingOutline } from '@ant-design/icons-angular/icons';
const icons = [SettingOutline];

@NgModule({
  declarations: [
    NzaLayoutComponent,
    NzaMenuLayoutSiderComponent,
    NzaMenuLayoutHeaderComponent,
  ],
  exports: [
    NzaLayoutComponent,
    NzaMenuLayoutSiderComponent,
    NzaMenuLayoutHeaderComponent,
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzToolTipModule,
    RouterModule,
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class NzaLayoutModule {}
