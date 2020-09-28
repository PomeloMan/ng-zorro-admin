import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import {
  NzaFormComponent,
  NzaFormItem,
  initFormControlConfig,
  validateForm,
} from 'nz-admin';
import {
  Breadcrumb,
  ContentComponent,
  Layout,
} from '../../layout/content/content.component';
import { Column, TableDirective } from '../../layout/table/table.component';
import {
  User,
  UserService,
  UserPageCacheState,
  UserPageCache,
} from './user.service';
import { I18nService } from '@core';

const searchFormItems: Array<NzaFormItem> = [
  {
    type: 'input',
    key: 'username',
    label: '账号',
  },
  {
    type: 'input',
    key: 'phone',
    label: '手机号',
  },
  {
    type: 'radio',
    key: 'status',
    label: '状态',
    options: [
      { label: '初始化', value: 0 },
      { label: '已生效', value: 1 },
      { label: '已过期', value: 2 },
    ],
  },
];

const addFormItems: Array<NzaFormItem> = [
  {
    id: 'username1',
    type: 'input',
    key: 'username',
    label: '账号',
    validators: [Validators.required],
  },
  {
    id: 'displayName1',
    type: 'input',
    key: 'displayName',
    label: '用户名',
    validators: [Validators.required],
  },
  {
    id: 'phone1',
    type: 'input',
    key: 'phone',
    label: '手机号',
    validators: [Validators.required, Validators.pattern(/^[0-9]*$/)],
  },
  {
    id: 'email1',
    type: 'input',
    key: 'email',
    label: '邮箱地址',
    validators: [Validators.required, Validators.email],
  },
  {
    id: 'position1',
    type: 'input',
    key: 'position',
    label: '职位',
  },
  {
    id: 'address1',
    type: 'input',
    key: 'address',
    label: '联系地址',
    valueType: 'array',
    validators: [Validators.required],
    value: [null, null, null],
    max: 3,
    addButtonText: '添加',
  },
  {
    id: 'contact1',
    key: 'contact',
    label: '紧急联系人',
    valueType: 'object-array',
    valueAttrs: [
      {
        id: 'contact_name',
        key: 'name',
        type: 'input',
        label: '联系人',
        validators: [Validators.required],
      },
      {
        id: 'contact_phone',
        key: 'phone',
        type: 'input',
        label: '联系电话',
        validators: [Validators.required],
      },
    ],
    value: [
      { name: null, phone: null },
      { name: null, phone: null },
      { name: null, phone: null },
    ],
    max: 3,
    addButtonText: '添加',
  },
];

const columns: Array<Column> = [
  { name: 'user.username', key: 'username' },
  { name: 'user.phone', key: 'phone' },
  { name: 'user.email', key: 'email' },
  { name: 'user.displayName', key: 'displayName' },
  { name: 'common.status', key: 'status' },
  { name: 'user.position', key: 'position' },
  { name: 'user.address', key: 'address' },
  { name: 'common.operation', key: 'operation', width: '200px' },
];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
})
export class UserComponent extends TableDirective<User> implements OnInit {
  @Select(UserPageCacheState.getValues) pageCache$: Observable<UserPageCache>;
  @ViewChild('layoutContent') layoutContentComponent: ContentComponent;
  @ViewChild('addFormComp') detailFormComponent: NzaFormComponent;
  // 页面缓存
  pageCacheKey = 'userPageCache';
  // 导航
  breadcrumbs: Array<Breadcrumb> = [];
  // 布局配置
  layout: Layout = 'table';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private i18n: I18nService,
    protected formBuilder: FormBuilder,
    protected store: Store,
    protected service: UserService
  ) {
    super(formBuilder, store, service);
    this.searchFormItems = searchFormItems;
    this.addFormItems = addFormItems;
    this.columns = columns;

    // 初始化表单
    this.searchForm = this.formBuilder.group(
      initFormControlConfig(searchFormItems)
    );
    this.detailForm = this.formBuilder.group(
      initFormControlConfig(addFormItems)
    );

    const routeData: Data = this.route.snapshot.data;
    this.breadcrumbs = routeData.breadcrumbs.map((breadcrumb) => ({
      ...breadcrumb,
      name: this.i18n.instant(breadcrumb.name),
    }));
  }

  ngOnInit(): void {
    this.initPageCache();
    this.getData({ ...this.pageCache });
  }

  getData(params?: any): void {
    this.loading = true;
    this.setPageCache({ ...params });
    console.log(params);
    this.service.getUserList().subscribe(
      (data: any) => {
        this.loading = false;
        this.data = data.list;
        this.total = data.total;
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  save(): void {
    if (validateForm(this.detailForm)) {
      const values = this.detailForm.value;
      console.log(values);
    }
  }

  delete(): void {}

  print(): void {}
}
