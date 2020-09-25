import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Select, Store } from '@ngxs/store';
import {
  SettingAction,
  SettingOption,
  SettingState,
} from 'src/app/shared/states/settings.state';
import { NzaTheme } from 'nz-admin';
import { Observable } from 'rxjs';

@Component({
  selector: 'nz-admin-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.less'],
})
export class ThemesComponent implements OnInit {
  // 配置信息
  @Select(SettingState.getOption) option$: Observable<SettingOption>;
  @Input() themes: Array<{
    label: string;
    value: NzaTheme;
  }>;
  @Input() styles: object;

  constructor(
    private el: ElementRef,
    private platform: Platform,
    private store: Store
  ) {
    this.styles = {
      position: 'fixed',
      bottom: '100px',
      right: '32px',
    };
  }

  ngOnInit(): void {
    // 初始化样式
    if (this.styles) {
      const nativeEl = this.el.nativeElement;
      Object.keys(this.styles).forEach((attr) => {
        nativeEl.style[attr] = this.styles[attr];
      });
    }
  }

  /**
   * 更换主题样式
   * 首先需要运行 node scripts/theme.js 在 /src/assets/ 文件夹下生成所有主题样式文件 style.[theme].css
   * @param theme
   */
  changeTheme(theme: NzaTheme): void {
    if (!this.platform.isBrowser) {
      return;
    }
    const dom = document.getElementById('site-theme');
    if (dom) {
      dom.remove();
    }
    if (theme !== 'default') {
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = 'site-theme';
      style.href = `assets/style.${theme}.css`;

      document.body.append(style);
    }

    this.store.dispatch(new SettingAction.Value({ theme }));
  }
}
