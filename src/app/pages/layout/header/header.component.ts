import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'nz-admin-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  _locales: Array<{ code; text; abbr }>;
  _isCollapse = false;
  @Output()
  isCollapseChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private i18n: I18nService) {
    this._locales = i18n.getLangs();
  }

  ngOnInit(): void {}

  changeLanguage(code: string): void {
    this.i18n.use(code);
  }

  get locales(): Array<{ code; text; abbr }> {
    return this._locales;
  }

  @Input()
  get isCollapse(): boolean {
    return this._isCollapse;
  }
  set isCollapse(value) {
    this._isCollapse = value;
    this.isCollapseChange.emit(value);
  }
}
