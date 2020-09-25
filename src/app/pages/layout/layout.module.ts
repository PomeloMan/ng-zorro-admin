import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { ThemesComponent } from './themes/themes.component';
import { SettingsComponent } from './settings/settings.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { TableComponent } from './table/table.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
  imports: [SharedModule, RouterModule, NgxsModule],
  declarations: [
    ThemesComponent,
    SettingsComponent,
    HeaderComponent,
    ContentComponent,
    TableComponent,
    GridComponent,
  ],
  exports: [
    ThemesComponent,
    SettingsComponent,
    HeaderComponent,
    ContentComponent,
    TableComponent,
    GridComponent,
  ],
  providers: [],
})
export class LayoutModule {}
