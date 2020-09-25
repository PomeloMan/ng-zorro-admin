import { Component, OnInit } from '@angular/core';
import { SettingState, Setting } from '../shared/states/settings.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { NzaMenu } from 'nz-admin';
import { MainService } from './main.service';
import { NzConfigService } from 'ng-zorro-antd';

import { UserAction } from '../shared/states/user.state';

@Component({
  selector: 'nz-admin-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
  // 配置信息
  @Select(SettingState.getValue) setting$: Observable<Setting>;

  isCollapse = false;
  menus: Array<NzaMenu> = [];

  constructor(
    private store: Store,
    private service: MainService,
    private readonly nzConfigService: NzConfigService
  ) {}

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  ngOnInit(): void {
    this.nzConfigService.set('button', { nzSize: 'default' });
    this.store.dispatch(new UserAction.Set({ auths: ['user_add'] }));
    this.service.getMenus().subscribe((data) => {
      this.menus = data;
    });
  }
}
