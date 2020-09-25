import { Component, ElementRef, OnInit } from '@angular/core';
import {
  SettingState,
  Setting,
  SettingOption,
} from './shared/states/settings.state';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet> <ng-progress></ng-progress>`,
})
export class AppComponent implements OnInit {
  @Select(SettingState) settings$: Observable<{
    value: Setting;
    option: SettingOption;
  }>;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.settings$.subscribe((d) => {
      this.el.nativeElement.setAttribute('data-theme', d.value.theme);
    });
  }
}
