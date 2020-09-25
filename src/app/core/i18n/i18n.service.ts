import { Platform } from '@angular/cdk/platform';
import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import ngEn from '@angular/common/locales/en';
import ngZh from '@angular/common/locales/zh';
import ngZhTw from '@angular/common/locales/zh-Hant';
import { enUS as dfEn, zhCN as dfZhCn, zhTW as dfZhTw } from 'date-fns/locale';
import {
  NzI18nService,
  en_US as zorroEnUS,
  zh_CN as zorroZhCN,
  zh_TW as zorroZhTW,
} from 'ng-zorro-antd/i18n';
import { BehaviorSubject } from 'rxjs';

interface Lang {
  code: string;
  text: string;
  abbr: string;
}

interface LangData {
  text: string;
  ng: any;
  zorro: any;
  date: any;
  abbr: string;
}

const DEFAULT = 'zh-CN';
const LANGS: { [key: string]: LangData } = {
  'zh-CN': {
    text: '简体中文',
    ng: ngZh,
    zorro: zorroZhCN,
    date: dfZhCn,
    abbr: '🇨🇳',
  },
  'zh-TW': {
    text: '繁体中文',
    ng: ngZhTw,
    zorro: zorroZhTW,
    date: dfZhTw,
    abbr: '🇭🇰',
  },
  'en-US': {
    text: 'English',
    ng: ngEn,
    zorro: zorroEnUS,
    date: dfEn,
    abbr: '🇬🇧',
  },
};

@Injectable({ providedIn: 'root' }) // root即AppModule
export class I18nService {
  private _default: string = DEFAULT;
  private _langs: Array<Lang> = Object.keys(LANGS).map((code) => {
    const item = LANGS[code];
    return { code, text: item.text, abbr: item.abbr };
  });
  private change$ = new BehaviorSubject<string | null>(null);

  constructor(
    private platform: Platform,
    private nzI18nService: NzI18nService,
    private translate: TranslateService
  ) {
    const lans = this._langs.map((item) => item.code);
    translate.addLangs(lans);

    const defaultLang = this.getDefaultLang();
    if (lans.includes(defaultLang)) {
      this._default = defaultLang;
    }

    this.updateLangData(this.defaultLang);
  }

  /**
   * 语言切换
   * @param lang code
   */
  use(lang?: string): void {
    lang = lang || this.defaultLang;
    if (this.currentLang === lang) {
      return;
    }
    this.updateLangData(lang);
    this.translate.use(lang).subscribe(() => this.change$.next(lang));
  }

  /** 翻译 */
  instant(key: string, interpolateParams?: {}): any {
    return this.translate.instant(key, interpolateParams);
  }

  /** 获取语言列表 */
  getLangs(): Array<{ code: string; text: string; abbr: string }> {
    return this._langs;
  }

  /** 默认语言 */
  get defaultLang(): string {
    return this._default;
  }
  /** 当前语言 */
  get currentLang(): string {
    return this.translate.currentLang;
  }

  private getDefaultLang(): string | undefined {
    if (!this.platform.isBrowser) {
      return DEFAULT;
    }
    return (
      (navigator.languages ? navigator.languages[0] : null) ||
      navigator.language
    );
  }

  private updateLangData(lang: string): void {
    const item = LANGS[lang];
    registerLocaleData(item.ng);
    this.nzI18nService.setLocale(item.zorro);
    this.nzI18nService.setDateLocale(item.date);
  }
}
