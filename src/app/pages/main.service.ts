import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { NzaMenu } from 'nz-admin';

@NgModule()
export class MainServiceModule {}

@Injectable({ providedIn: MainServiceModule })
export class MainService {
  constructor(private service: ApiService) {}

  getMenus(): Observable<Array<NzaMenu>> {
    return this.service.get('/assets/mocks/menu/list.json');
  }
}
