import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import { NzaFormComponent } from './form.component';

import { MinusCircleOutline } from '@ant-design/icons-angular/icons';
const icons = [MinusCircleOutline];

@NgModule({
  declarations: [NzaFormComponent],
  exports: [NzaFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzRadioModule,
    NzSelectModule,
    NzButtonModule,
    NzDividerModule,
    NzIconModule,
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class NzaFormModule {}
