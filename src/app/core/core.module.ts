import { ModuleWithProviders, NgModule } from '@angular/core';

import { StorageService } from '../shared/services/storage.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';

const AUTH_PROVIDES = [
  { provide: AuthService, useClass: AuthService, deps: [StorageService] },
  {
    provide: AuthGuardService,
    useClass: AuthGuardService,
    deps: [AuthService, CookieService],
  },
];

@NgModule({
  providers: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...AUTH_PROVIDES],
    };
  }
}
