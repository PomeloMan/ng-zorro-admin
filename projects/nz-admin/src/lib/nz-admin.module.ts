import { NgModule } from '@angular/core';
import { NzaLayoutModule } from './layout';
import { NzaFormModule } from './form';

const MODULES = [NzaLayoutModule, NzaFormModule];

@NgModule({
  exports: MODULES,
})
export class NzAdminModule {}
