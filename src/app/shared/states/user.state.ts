import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { User } from '../../pages/system/user/user.service';

/// Action
// tslint:disable-next-line: no-namespace
export namespace UserAction {
  export class Set {
    static readonly type = '[User] Set';
    constructor(public user: User) {}
  }
  export class Get {
    static readonly type = '[User] Get';
  }
}

/// State
@State<User>({
  name: 'user',
  defaults: new User(),
})
@Injectable()
export class UserState {
  @Action(UserAction.Set)
  setUser(ctx: StateContext<User>, action: UserAction.Set): void {
    ctx.setState({
      ...action.user,
    });
  }
}
