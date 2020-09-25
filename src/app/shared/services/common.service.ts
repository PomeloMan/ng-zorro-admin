import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

/**
 * 公共服务接口
 */
export interface CommonService<T> {
  /**
   * 详情
   * @param id 详情ID
   */
  info(id): Observable<T>;

  /**
   * 分页
   * @param body 查询条件
   */
  page(body?: any): Observable<Page<T[]>>;

  /**
   * 列表
   * @param body 查询条件
   */
  list(body?: any): Observable<T[]>;

  /**
   * 保存
   * @param T 泛型对象
   */
  save(T): Observable<T>;

  /**
   * 修改
   * @param T 泛型对象
   */
  update(T): Observable<T>;

  /**
   * 删除
   * @param ids ID集合
   */
  delete(ids: any[]): Observable<any>;
}

/**
 * options: { observe: 'response' }
 * 后台完整数据返回类型，如果不设置 options则只返回 body内容
 */
export interface ResponseEntity<T> {
  body?: T;
  headers?: HttpHeaders;
  ok?: boolean;
  status?: number;
  statusText?: string;
  type?: number;
  url?: string;
}

/**
 * 后台分页返回数据类型
 */
export interface Page<T> {
  content?: T;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: string;
  totalElements?: number;
  totalPages?: number;
}
