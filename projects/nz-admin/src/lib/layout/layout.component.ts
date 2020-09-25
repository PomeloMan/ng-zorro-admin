import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  EventEmitter,
  Output,
  ElementRef,
  HostBinding,
} from '@angular/core';
// 菜单数据格式
export interface NzaMenu {
  name?: string;
  icon?: string;
  url?: string;
  children?: Array<NzaMenu>;
}
// 主题样式
export type NzaTheme = 'default' | 'dark' | 'compact';
// 菜单风格
export type NzaMenuStyle =
  | 'sider-dark' // 暗色侧边导航菜单
  | 'sider-light' // 亮色侧边导航菜单
  | 'header-dark' // 暗色顶部导航菜单
  | 'header-light'; // 亮色顶部导航菜单

@Component({
  selector: 'nz-admin-layout',
  exportAs: 'nzAdminLayout',
  templateUrl: './layout.component.html',
})
export class NzaLayoutComponent implements OnInit {
  // 绑定元素 class
  @HostBinding('class') nzaClasses = 'nz-admin-layout';
  @HostBinding('class.nz-admin-layout-horizontal') nzaHorizontal: boolean;
  // 主题
  protected _nzaTheme: NzaTheme = 'default';
  @Input() get nzaTheme(): NzaTheme {
    return this._nzaTheme;
  }
  set nzaTheme(nzaTheme: NzaTheme) {
    this._nzaTheme = nzaTheme;
    this.el.nativeElement.setAttribute('data-theme', nzaTheme);
  }
  // 菜单风格
  protected _nzaMenuStyle: NzaMenuStyle = 'sider-dark';
  @Input() get nzaMenuStyle(): NzaMenuStyle {
    return this._nzaMenuStyle;
  }
  set nzaMenuStyle(menuStyle: NzaMenuStyle) {
    this._nzaMenuStyle = menuStyle;
    this.nzaHorizontal = menuStyle.startsWith('header');
  }
  // LOGO
  @Input() nzaLogo: {
    img: string;
    text: string;
    url: string;
  } = {
    img: 'https://ng.ant.design/assets/img/logo.svg',
    text: 'Ant Design Of Angular',
    url: 'https://ng.ant.design/',
  };
  // 菜单列表
  @Input() nzaMenus: Array<NzaMenu> = [];

  // 头部导航栏
  @Input() nzaHeaderTemplate: TemplateRef<void> | null = null;
  // 右侧菜单栏模板
  @Input() nzaSettingTemplate: TemplateRef<void> | null = null;
  // 主内容模板
  @Input() nzaContentTemplate: TemplateRef<void> | null = null;
  // 底部模板
  @Input() nzaFooterTemplate: TemplateRef<void> | null = null;

  // 自定义双向绑定 [(menuCollapsed)]
  protected _nzaMenuCollapsed = false;
  @Input() get nzaMenuCollapsed(): boolean {
    return this._nzaMenuCollapsed;
  }
  set nzaMenuCollapsed(value) {
    this._nzaMenuCollapsed = value;
    this.nzaMenuCollapsedChange.emit(value);
  }
  @Output()
  nzaMenuCollapsedChange: EventEmitter<boolean> = new EventEmitter();

  get nzaMenuTheme(): 'dark' | 'light' {
    return this.nzaMenuStyle.split('-')[1] as 'dark' | 'light';
  }

  constructor(protected el: ElementRef) {}

  ngOnInit(): void {}
}
