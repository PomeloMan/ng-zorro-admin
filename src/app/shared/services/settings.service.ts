import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SettingOption } from '../states/settings.state';

@Injectable()
export class SettingsService {
  constructor() {}

  getSettingOption(): Observable<SettingOption> {
    return of({
      themes: [
        {
          label: 'settings.theme.default',
          value: 'default',
        },
        {
          label: 'settings.theme.dark',
          value: 'dark',
        },
        {
          label: 'settings.theme.compact',
          value: 'compact',
        },
      ],
      menuStyles: [
        {
          label: 'settings.menuStyles.siderDark',
          value: 'sider-dark',
          url: '/assets/images/menu_side_dark.svg',
        },
        {
          label: 'settings.menuStyles.siderLight',
          value: 'sider-light',
          url: '/assets/images/menu_side_light.svg',
        },
        {
          label: 'settings.menuStyles.headerDark',
          value: 'header-dark',
          url: '/assets/images/menu_head_dark.svg',
        },
        {
          label: 'settings.menuStyles.headerLight',
          value: 'header-light',
          url: '/assets/images/menu_head_light.svg',
        },
      ],
      primaryColors: [
        { label: 'settings.themeColor.dustRed', value: '#f5222d' },
        { label: 'settings.themeColor.volcano', value: '#fa541c' },
        { label: 'settings.themeColor.sunsetOrange', value: '#fa8c16' },
        { label: 'settings.themeColor.calendulaGold', value: '#faad14' },
        { label: 'settings.themeColor.sunriseYellow', value: '#fadb14' },
        { label: 'settings.themeColor.lime', value: '#a0d911' },
        { label: 'settings.themeColor.polarGreen', value: '#52c41a' },
        { label: 'settings.themeColor.cyan', value: '#13c2c2' },
        { label: 'settings.themeColor.daybreakBlue', value: '#1890ff' },
        { label: 'settings.themeColor.geekBlue', value: '#2f54eb' },
        { label: 'settings.themeColor.goldenPurple', value: '#722ed1' },
        { label: 'settings.themeColor.magenta', value: '#eb2f96' },
      ],
    });
  }
}
