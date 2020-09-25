import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { NgProgressModule } from 'ngx-progressbar';
// import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { AppRoutingModule } from './app-routing.module';
import { AppConfigModule } from './app-config.module';

import { NgxsModule } from '@ngxs/store';
import { SettingState } from './shared/states/settings.state';

/** 配置 angular 国际化 */
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
/** 配置 ng-zorro-antd 国际化 */
import { NZ_I18N, zh_CN, NzI18nService } from 'ng-zorro-antd/i18n';
/** 配置项目国际化语言文件 */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { environment } from '@env/environment';
import { AppComponent } from './app.component';

const I18NSERVICE_PROVIDES = [
  {
    provide: NZ_I18N,
    useValue: zh_CN,
    useClass: NzI18nService,
    multi: false, // false: provide相同则覆盖 / true: 可根据不同模块使用相同provide的不同实例
  },
];

// #region Startup Service
import { CoreModule, HTTP_INTERCEPTOR_PROVIDERS, StartupService } from '@core';
export function StartupServiceFactory(
  startupService: StartupService
): () => Promise<any> {
  return () => startupService.load();
}
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgProgressModule,
    // NgProgressHttpModule,
    NgProgressRouterModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    CoreModule.forRoot(),
    AppConfigModule.forRoot(),
    NgxsModule.forRoot([SettingState], {
      developmentMode: !environment.production,
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'zh-CN',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    ...HTTP_INTERCEPTOR_PROVIDERS,
    ...I18NSERVICE_PROVIDES,
    ...APPINIT_PROVIDES,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
