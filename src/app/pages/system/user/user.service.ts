import { Injectable } from '@angular/core';
import Mock from 'mockjs';
import { of, Observable } from 'rxjs';
import { State } from '@ngxs/store';
import { PageCacheState, PageCache } from 'src/app/shared/states/page.state';
import { CommonService } from 'src/app/shared/services/common.service';

export class User {
  id?: string;
  username?: string; // 账号
  phone?: string; // 手机号
  email?: string; // 邮箱地址
  displayName?: string; // 用户名
  status?: string; // 状态
  position?: string; // 职位
  address?: Array<any>; // 地址
  roles?: Array<any>; // 角色
  auths?: Array<any>; // 权限
}

@Injectable({
  providedIn: 'root',
})
export class UserService implements CommonService<User> {
  constructor() {}

  info(id: any): Observable<User> {
    return of(
      Mock.mock({
        'id|1': id,
        'username|1': /[a-z]{2}[A-Z]{2}[0-9]{2}/,
        'phone|1': 13861800000,
        'email|1': /[0-9a-zA-Z_]{0,19}@[0-9a-zA-Z]{1,13}\.[com,cn,net]{1,3}/,
        'displayName|1': [
          'Maria Anders',
          'Francisco Chang',
          'Roland Mendel',
          'Helen Bennett',
          'Yoshi Tannamuri',
          'Giovanni Rovelli',
        ],
        'status|1-4': 4,
        'position|1': ['Software Engineer', 'Project Manager'],
        'address|1-3': [
          '@province @city @county',
          // {
          //   'tag|1': ['家', '公司', '学校'],
          //   'name|1': '@province @city @county',
          // },
        ],
        'contact|1-3': [
          {
            'name|1': ['爸爸', '妈妈', '爷爷', '奶奶'],
            'phone|1': [
              '13861800000',
              '13861800001',
              '13861800002',
              '13861800003',
            ],
          },
        ],
      })
    );
  }

  page(
    body?: any
  ): Observable<
    import('../../../shared/services/common.service').Page<User[]>
  > {
    throw new Error('Method not implemented.');
  }
  list(body?: any): Observable<User[]> {
    throw new Error('Method not implemented.');
  }
  save(T: any): Observable<User> {
    throw new Error('Method not implemented.');
  }
  update(T: any): Observable<User> {
    throw new Error('Method not implemented.');
  }
  delete(ids: any[]): Observable<any> {
    throw new Error('Method not implemented.');
  }

  getUserList(): Observable<Array<User>> {
    const data = Mock.mock({
      'list|10-20': [
        {
          'id|+1': 1,
          'username|1': /[a-z]{2}[A-Z]{2}[0-9]{2}/,
          'phone|+1': 13861800000,
          'email|1': /[0-9a-zA-Z_]{0,19}@[0-9a-zA-Z]{1,13}\.[com,cn,net]{1,3}/,
          'displayName|1': [
            'Maria Anders',
            'Francisco Chang',
            'Roland Mendel',
            'Helen Bennett',
            'Yoshi Tannamuri',
            'Giovanni Rovelli',
          ],
          'status|1-4': 4,
          'position|1': ['Software Engineer', 'Project Manager'],
          'address|1-5': [
            {
              'tag|1': ['家', '公司', '学校'],
              'name|1': '@province @city @county',
            },
          ],
        },
      ],
      'total|100': 100,
    });
    return of(data);
  }
}

// 用户页面缓存数据
export class UserPageCache extends PageCache {}

/// State
@State<UserPageCache>({
  name: 'userPageCache',
  defaults: new UserPageCache(),
})
@Injectable()
export class UserPageCacheState extends PageCacheState {}
