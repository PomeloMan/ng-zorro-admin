import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from 'src/app/pages/system/user/user.service';

/**
 * 认证指令，可以根据用户角色权限判断是否显示元素
 */
@Directive({
  selector: '[nzaAuth]',
})
export class NzaAuthDirective implements OnInit {
  @Input('nzaAuth') authority: string;

  constructor(
    private ref: ElementRef,
    private renderer: Renderer2,
    private store: Store
  ) {}

  ngOnInit(): void {
    const user: User = this.store.selectSnapshot<User>((state) => state.user);

    const el = this.ref.nativeElement;
    if (!(user.auths && user.auths.includes(this.authority))) {
      if (!(el instanceof Comment)) {
        this.renderer.setStyle(el, 'display', 'none');
      } else {
        // 对于 ng-container，ng-template 等标签的处理，暂不实现
      }
    }
  }
}
