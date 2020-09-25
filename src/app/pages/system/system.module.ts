import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { NzaFormModule } from 'nz-admin';
import { SystemRoutingModule } from './system-routing.module';
import { NgxsModule } from '@ngxs/store';

import { UserComponent } from './user/user.component';
import { UserService, UserPageCacheState } from './user/user.service';

@NgModule({
  declarations: [UserComponent],
  imports: [
    SharedModule,
    LayoutModule,
    NzaFormModule,
    SystemRoutingModule,
    NgxsModule.forFeature([UserPageCacheState]),
  ],
  providers: [UserService],
})
export class SystemModule {}
