import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  ViewChild,
  Directive,
} from '@angular/core';
import { NzaFormItem } from 'nz-admin';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { PageCache, PageCacheAction } from 'src/app/shared/states/page.state';
import { Select, Store } from '@ngxs/store';
import { ContentComponent } from '../content/content.component';
import { Setting, SettingState } from 'src/app/shared/states/settings.state';
import { Observable } from 'rxjs';
import { NzSizeMDSType } from 'ng-zorro-antd/core/types';

export class Column {
  name: string; // 列名
  key?: string; // dataSource属性名
  isEllipsis?: boolean; // 是否超出隐藏
  width?: string;
}

@Component({
  selector: 'nz-admin-layout-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent<T> implements OnInit {
  // 数据源
  @Input() dataSource: Array<T> = [];
  // 列定义
  @Input() columns: Array<Column> = [];
  // 自定义列模板
  @Input() template: TemplateRef<{
    $implicit: any;
    column: Column;
  }> | null = null;
  // 加载
  @Input() loading = false;
  // 虚拟滚动条
  @Input() scroll: { x?: string; y?: string } = null;
  // 总数
  @Input() total: number;
  // 当前页（可双向绑定）
  @Input() pageIndex = 1;
  @Output() pageIndexChange: EventEmitter<number> = new EventEmitter();
  // 每页显示数目（可双向绑定）
  @Input() pageSize = 10;
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.pageIndexChange.emit(pageIndex);
  }
  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.pageSizeChange.emit(pageSize);
  }
}

/**
 * 列表公共属性，方法指令组件
 * 组件中使用 TableComponent 组件时，可继承此指令组件
 */
@Directive() // 由于使用了Angular @ViewChild功能，故需要将组件定义成Angular组件
export abstract class TableDirective<T> {
  @Select(SettingState.getValue) setting$: Observable<Setting>;
  @ViewChild(ContentComponent) layoutContentComponent: ContentComponent;
  // 搜索表单
  searchForm: FormGroup;
  // 搜索条件
  searchFormItems: Array<NzaFormItem>;
  // 数据源
  data: Array<T> = [];
  // 表单列
  columns: Array<Column>;
  // 是否加载
  loading = false;
  // table scroll
  scroll: { x?: string; y?: string } = null;
  // 总数
  total: number;
  // 关键字查询
  keyword: string;
  // 当前页
  _pageIndex = 1;
  get pageIndex(): number {
    return this._pageIndex;
  }
  set pageIndex(pageIndex: number) {
    this._pageIndex = pageIndex;
  }
  // 每页显示数目
  _pageSize = 10;
  get pageSize(): number {
    return this._pageSize;
  }
  set pageSize(pageSize: number) {
    this._pageSize = pageSize;
  }
  // 页面缓存
  pageCache: PageCache = null;
  // 页面缓存键，用于获取指定页面的缓存数据
  pageCacheKey: string;
  // 是否使用 table scroll，true 则需要补充 scroll x,y值，false 则 scroll = null，默认 true
  _useScroll = true;
  get useScroll(): boolean {
    return this._useScroll;
  }
  set useScroll(useScroll: boolean) {
    this._useScroll = useScroll;
    this.scroll = null;
    if (this.useScroll && this.layoutContentComponent) {
      // 由不使用表格内滚动切换至表格内滚动时，需要手动触发组件resize()方法
      this.layoutContentComponent.resize(false);
    }
  }

  /// 以下是详情公共属性
  // ID
  id: string | number;
  // 详情对象
  detail: T;
  // 添加/编辑表单
  addFormItems: Array<NzaFormItem>;
  // 详情面板标题
  drawerTitle: TemplateRef<void> | string;
  // 详情面板是否可见
  drawerVisible = false;
  // 详情表单
  detailForm: FormGroup;

  // 是否默认展开高级搜索
  get showAdvanced(): boolean {
    let showAdvanced = false;
    for (const item of this.searchFormItems) {
      if (!!this.pageCache[item.key]) {
        showAdvanced = true;
        break;
      }
    }
    return showAdvanced;
  }

  // 此属性缓存Store中的tableSize字段，用于每次跟新Store.Setting后比对是否发生变化，发生变化触发resize()，节省性能
  private _tableSizeCache: NzSizeMDSType;

  constructor(
    protected formBuilder: FormBuilder,
    protected store: Store,
    protected service: CommonService<T>
  ) {
    this.setting$.subscribe((setting: Setting) => {
      this.useScroll = !!setting.useTableScroll;
      if (this._tableSizeCache !== setting.tableSize) {
        this._tableSizeCache = setting.tableSize;
        if (this.layoutContentComponent) {
          this.layoutContentComponent.resize(false);
        }
      }
    });
  }

  // 初始化页面缓存数据
  initPageCache(): void {
    this.pageCache = this.store.selectSnapshot<PageCache>(
      (state) => state[this.pageCacheKey]
    );
    // 根据缓存数据回填查询初始值
    this.keyword = this.pageCache?.keyword;
    this.pageIndex = this.pageCache?.pageIndex;
    this.pageSize = this.pageCache?.pageSize;
    Object.keys(this.pageCache).forEach((key) => {
      const formItem = this.searchFormItems.find((fi) => fi.key === key);
      if (formItem) {
        formItem.value = this.pageCache[key];
      }
    });
  }
  // 设置页面条件缓存
  setPageCache(pageCache: PageCache): void {
    this.pageCache = pageCache;
    this.store.dispatch(new PageCacheAction.Values(pageCache));
  }
  // 查询
  onSearch(
    params?: any,
    resetPageIndex: boolean = true,
    usePageCache: boolean = false
  ): void {
    this.pageIndex = params?.pageIndex || this.pageIndex;
    this.pageSize = params?.pageSize || this.pageSize;
    if (resetPageIndex) {
      this.pageIndex = 1;
    }
    if (usePageCache) {
      params = { ...this.pageCache, ...params };
    }
    this.getData({
      ...params,
      keyword: this.keyword,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    });
  }
  // 预留查询方法，具体子类实现
  getData(params?: any): void {}

  // 展开详情
  showDetailDrawer(id?: string | number): void {
    this.id = id;
    this.detailForm?.reset();
    this.drawerVisible = true;

    if (this.id) {
      this.service.info(id).subscribe((data) => {
        this.detail = data;
        const detailFormValue = {};
        const formItems = this.addFormItems.map((item) => ({ ...item }));
        formItems.forEach((formItem) => {
          detailFormValue[formItem.key] = this.detail[formItem.key];
          const i = formItems.findIndex((item) => item.key === formItem.key);
          if (i > -1) {
            formItems[i].value = this.detail[formItem.key];
          }
        });
        this.detailForm.patchValue(detailFormValue);
      });
    }
  }
}
