import { NgModule, ModuleWithProviders } from '@angular/core';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';

/**
 * 全局组件配置，组件内修改方法：this.nzConfigService.set('button', { nzSize: 'large' });
 */
const ngZorroConfig: NzConfig = {
  button: { nzSize: 'default' },
  table: { nzSize: 'middle' },
  card: { nzBordered: false },
};

@NgModule()
export class AppConfigModule {
  static forRoot(): ModuleWithProviders<AppConfigModule> {
    return {
      ngModule: AppConfigModule,
      providers: [{ provide: NZ_CONFIG, useValue: ngZorroConfig }],
    };
  }
}
