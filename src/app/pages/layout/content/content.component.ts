import {
  Component,
  OnInit,
  Input,
  HostBinding,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ElementRef,
  TemplateRef,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

export type Layout = 'table' | 'grid';
export class Breadcrumb {
  name?: string;
  url?: string;
}

@Component({
  selector: 'nz-admin-layout-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less'],
})
export class ContentComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') classes = 'nz-admin-layout-content';

  @ViewChild('header') header: ElementRef<HTMLElement>;
  @ViewChild('advanced') advanced: ElementRef<HTMLElement>;
  @ViewChild('perfectScrollbar', { read: ElementRef })
  perfectScrollbarEl: ElementRef<HTMLElement>;
  @ViewChild('perfectScrollbar') psbarComponent: PerfectScrollbarComponent;

  // 面包屑导航数据
  @Input() breadcrumbs: Array<Breadcrumb> = [];
  // 是否显示头部工具栏
  @Input() showHeader = true;
  // 是否显示底部
  @Input() showFooter = true;
  // 是否显示布局切换菜单
  @Input() showLayout = true;
  // 是否显示高级菜单
  @Input() showAdvanced = false;
  // 菜单栏
  @Input() menuTemplate: TemplateRef<void> | null = null;
  // 高级模板
  @Input() advancedTemplate: TemplateRef<void> | null = null;

  // 布局
  @Input() layout: Layout = 'table';
  @Output() layoutChange: EventEmitter<Layout> = new EventEmitter();

  // layout = 'table' [nzScroll] 属性值
  @Input() scroll: { x?: string; y?: string };
  @Output() scrollChange: EventEmitter<{
    x?: string;
    y?: string;
  }> = new EventEmitter();

  // 关键字（双向绑定）
  _keyword: string;
  @Input() get keyword(): string {
    return this._keyword;
  }
  set keyword(keyword: string) {
    this._keyword = keyword;
    this.keywordChange.emit(this.keyword);
  }
  @Output() keywordChange: EventEmitter<string> = new EventEmitter();
  // 关键字查询
  @Output() search: EventEmitter<{
    keyword: string;
  }> = new EventEmitter();

  _elResize$: Subscription;
  // 滚动元素，<nz-back-top [nzTarget]>
  scrollContentEl: Element;

  // 是否显示高级模板
  get showAdvancedTemplate(): boolean {
    return !!this.advancedTemplate;
  }

  constructor(private el: ElementRef, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._elResize$ = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe((e) => {
        this.resize(false);
      });
  }

  ngAfterViewInit(): void {
    this.resize(false);
    setTimeout(() => {
      this.scrollContentEl = this.perfectScrollbarEl?.nativeElement?.firstElementChild;
    });
  }

  ngOnDestroy(): void {
    this._elResize$.unsubscribe();
  }

  onLayoutChange(layout: Layout): void {
    this.layout = layout;
    this.layoutChange.emit(layout);
    this.resizeTable();
  }

  onSearch(): void {
    this.search.emit({ keyword: this.keyword });
  }

  /**
   * 调整布局，改变滚动视图大小
   */
  resize(toggle: boolean = true): void {
    if (toggle) {
      this.showAdvanced = !this.showAdvanced;
    }
    const headerEl = this.header?.nativeElement;
    const advEl = this.advanced?.nativeElement;
    const psEl = this.perfectScrollbarEl?.nativeElement;

    if (this.showAdvanced) {
      let advElHeight = advEl.firstElementChild?.clientHeight || 0;
      if (advElHeight === 0 && advEl.firstElementChild) {
        advElHeight =
          advEl.firstElementChild.firstElementChild?.clientHeight || 0;
      }
      if (advEl) {
        advEl.style.height = `${advElHeight}px`;
      }
      if (psEl) {
        psEl.style.height = `calc(100% - ${headerEl.clientHeight}px - ${advElHeight}px)`;
      }
    } else {
      if (advEl) {
        advEl.style.height = '0px';
      }
      if (psEl) {
        psEl.style.height = `calc(100% - ${headerEl.clientHeight}px)`;
      }
    }
    this.resizeTable();
  }

  /**
   * 调整表格大小
   */
  resizeTable(): void {
    if (this.layout === 'table') {
      setTimeout(() => {
        const el = this.el.nativeElement;
        const tableEl = el.querySelector('.table-card');
        const thEl = tableEl.querySelector('.ant-table-thead');
        const paginationEl = tableEl.querySelector('.ant-table-pagination');
        if (tableEl) {
          this.scroll = {
            y: `${
              tableEl.clientHeight -
              (thEl ? thEl.clientHeight : 0) -
              (paginationEl ? paginationEl.clientHeight + 32 : 0)
            }px`,
          };
          this.scrollChange.emit(this.scroll);
        }
      }, 0);
    }
  }
}
