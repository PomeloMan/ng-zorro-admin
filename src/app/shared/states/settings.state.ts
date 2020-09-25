/// https://www.ngxs.io/
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SettingsService } from '../services/settings.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NzaTheme, NzaMenuStyle } from 'nz-admin';

/**
 * 主题样式配置
 */
export class Setting {
  theme?: NzaTheme; // 主题样式
  menuStyle?: NzaMenuStyle; // 菜单风格配置
  primaryColor?: string; // 主色，默认拂晓蓝'#1890ff'
  constructor() {
    this.theme = 'default';
    this.menuStyle = 'sider-dark';
    this.primaryColor = '#1890ff';
  }
}
/**
 * 主题样式配置选项
 */
export class SettingOption {
  themes: Array<{ label: string; value: NzaTheme }>;
  menuStyles: Array<{ label: string; value: NzaMenuStyle; url: any }>; // 菜单风格选项
  primaryColors: Array<{ label: string; value: string }>; // 主题色选项
}

/// Action
// tslint:disable-next-line: no-namespace
export namespace SettingAction {
  export class Value {
    static readonly type = '[Setting] Value';
    constructor(public setting: Setting) {}
  }
  export class Option {
    static readonly type = '[Setting] Option';
    constructor(public option?: SettingOption) {}
  }
}

/// State
@State<{ value: Setting; option: SettingOption }>({
  name: 'setting', // this.store.select((state) => state.settings)
  defaults: {
    value: new Setting(),
    option: new SettingOption(),
  },
})
@Injectable()
export class SettingState {
  constructor(private service: SettingsService) {}

  @Selector()
  static getValue(state: { value: Setting; option: SettingOption }): Setting {
    return state.value;
  }

  @Selector()
  static getOption(state: {
    value: Setting;
    option: SettingOption;
  }): SettingOption {
    return state.option;
  }

  @Action(SettingAction.Value)
  value(
    ctx: StateContext<{ value: Setting; option: SettingOption }>,
    action: SettingAction.Value
  ): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      value: {
        ...state.value,
        ...action.setting,
      },
    });
  }

  @Action(SettingAction.Option)
  option(
    { getState, setState },
    action: SettingAction.Option
  ): Observable<SettingOption> {
    const state = getState();
    if (action.option) {
      setState({
        ...state,
        option: action.option,
      });
    } else {
      return this.service.getSettingOption().pipe(
        tap((d) => {
          setState({
            ...state,
            option: d,
          });
        })
      );
    }
  }
}
