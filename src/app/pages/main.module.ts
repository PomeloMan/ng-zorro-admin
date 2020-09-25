import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { NzaLayoutModule } from 'nz-admin';

import { NgxsModule } from '@ngxs/store';
import { UserState } from '../shared/states/user.state';
import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { MainServiceModule } from './main.service';

@NgModule({
  declarations: [MainComponent, HomeComponent],
  imports: [
    SharedModule,
    LayoutModule,
    NzaLayoutModule,
    NgxsModule.forFeature([UserState]),
    MainRoutingModule,
    MainServiceModule,
  ],
})
export class MainModule {}
