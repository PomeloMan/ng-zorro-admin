import { NgModule } from '@angular/core';

import { NzaAuthDirective } from './auth.directive';

@NgModule({
  declarations: [NzaAuthDirective],
  exports: [NzaAuthDirective],
})
export class SharedDirectiveModule {}
