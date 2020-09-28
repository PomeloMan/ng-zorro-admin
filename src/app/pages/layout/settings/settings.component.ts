import {
  Component,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import { LazyService } from 'src/app/shared/services/lazy.service';
import { DOCUMENT } from '@angular/common';
import { Store, Select } from '@ngxs/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { Observable } from 'rxjs';
import {
  SettingState,
  SettingAction,
  Setting,
  SettingOption,
} from '../../../shared/states/settings.state';
import { NzSizeMDSType } from 'ng-zorro-antd';

@Component({
  selector: 'nz-admin-layout-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
})
export class SettingsComponent implements OnInit {
  // 配置信息
  @Select(SettingState) settings$: Observable<{
    value: Setting;
    option: SettingOption;
  }>;

  setting: any;

  constructor(
    private store: Store,
    private msg: NzMessageService,
    private readonly nzConfigService: NzConfigService,
    // 主题色
    private lazy: LazyService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.store.dispatch(new SettingAction.Option());
  }

  ngOnInit(): void {
    // this.setting = this.store.selectSnaphot(SettingState.getValue);
    this.settings$.subscribe((data) => {
      this.setting = { ...data.value };
    });
  }

  updateSettings(val: Setting): void {
    if (this.setting.theme !== 'default') {
      return;
    }
    this.store.dispatch(new SettingAction.Value(val)).subscribe(() => {
      if (val.primaryColor) {
        this.changeColor(val.primaryColor);
      }
    });
  }

  /**
   * 切换主色
   * @param color 主色值
   */
  changeColor(color: string): void {
    return this.runLess(color);
  }

  /**
   * 切换表格组件尺寸大小
   * @param size 'default' | 'middle' | 'size'
   */
  updateTableSize(size: NzSizeMDSType = 'middle'): void {
    this.store
      .dispatch(new SettingAction.Value({ tableSize: size }))
      .subscribe(() => {
        this.nzConfigService.set('table', {
          nzSize: size,
        });
      });
  }

  /**
   * 切换选项
   * @param key 'useTableScroll' 表格内滚动切换
   * @param value true | false；开启 | 关闭
   */
  switch(key?: string, value?: Setting): Promise<void> {
    this.setting[`${key}Switching`] = true;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.setting[`${key}`] = value;
        this.store.dispatch(new SettingAction.Value(value));
        this.setting[`${key}Switching`] = false;
        resolve();
      }, 1000);
    });
  }
  /************************* antd-theme-generator *************************/
  /**
   * 手动添加 less.js，default.less(/scripts/color.js输出文件)文件
   * 改变 default.less 变量值@primary-color从而达到改变主题色的效果
   * 注：default.less需要包含所有使用主题色的样式，自定义主键是，建议将组件样式与组件主题样式分开，然后将组件主题样式合并进default.less中
   */
  private loadLess(): Promise<void> {
    if ((window as any).less) {
      return Promise.resolve();
    }
    return this.lazy
      .loadStyle('./assets/default.less', 'stylesheet/less')
      .then(() => {
        const lessScript = this.doc.createElement('script');
        lessScript.innerHTML = `
          window.less = {
            async: true,
            env: 'production', // development
            javascriptEnabled: true
          };
        `;
        this.doc.body.appendChild(lessScript);
      })
      .then(() =>
        this.lazy
          .loadScript(
            'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'
          )
          .catch(() => this.lazy.loadScript('./assets/libs/less.min.js'))
      )
      .then(() => {});
  }

  private runLess(color): void {
    const { zone, msg, cdr } = this;
    const msgId = msg.loading(`正在编译主题！`, { nzDuration: 0 }).messageId;
    setTimeout(() => {
      zone.runOutsideAngular(() => {
        return this.loadLess()
          .then(() => {
            (window as any).less
              .modifyVars({
                '@primary-color': color,
              })
              .then(() => {
                msg.success('成功');
                msg.remove(msgId);
                zone.run(() => cdr.detectChanges());
              });
          })
          .catch((err) => {
            msg.error(err.message);
            msg.remove(msgId);
          });
      });
    }, 200);
  }
}
