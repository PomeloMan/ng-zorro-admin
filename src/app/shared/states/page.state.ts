import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
/**
 * 页面缓存
 */
export class PageCache {
  pageIndex?: number;
  pageSize?: number;
  keyword?: string;
  constructor() {
    this.pageIndex = 1;
    this.pageSize = 10;
  }
}

/// Action
// tslint:disable-next-line: no-namespace
export namespace PageCacheAction {
  export class Values {
    static readonly type = '[PageCache] Values';
    constructor(public pageCache: PageCache) {}
  }
}

/// State
@State<PageCache>({
  name: 'pageCache', // this.store.select((state) => state.settings)
  defaults: new PageCache(),
})
@Injectable()
export class PageCacheState {
  @Selector()
  static getValues(state: PageCache): PageCache {
    return state;
  }

  @Action(PageCacheAction.Values)
  values(
    { setState }: StateContext<PageCache>,
    action: PageCacheAction.Values
  ): void {
    // const state = ctx.getState();
    setState({
      // ...state, // 保留原数据状态
      ...action.pageCache,
    });
  }
}
