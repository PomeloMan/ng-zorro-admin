import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';

import { SharedDirectiveModule } from './directives/shared-directive.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';

import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './services/api.service';
import { StorageService } from './services/storage.service';
import { MessageService } from './services/message.service';
import { SettingsService } from './services/settings.service';
import { LazyService } from './services/lazy.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_PROVIDES = [
  StorageService,
  CookieService,
  MessageService,
  SettingsService,
  LazyService,
  { provide: ApiService, useClass: ApiService, deps: [HttpClient] },
  {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxsModule,
    PerfectScrollbarModule,
    SharedDirectiveModule,
    ...SHARED_ZORRO_MODULES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxsModule,
    PerfectScrollbarModule,
    SharedDirectiveModule,
    ...SHARED_ZORRO_MODULES,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [...APP_PROVIDES],
    };
  }
}
