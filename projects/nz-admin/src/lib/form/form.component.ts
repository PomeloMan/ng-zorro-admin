import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ValidatorFn,
  FormControl,
  FormArray,
} from '@angular/forms';

export interface NzaFormItem {
  id?: string;
  type?: 'input' | 'select' | 'radio' | 'datepicker';
  key: string;
  label?: string;
  value?: any;
  visible?: boolean;
  options?: Array<{ label: string; value: any }>;
  validators?: Array<ValidatorFn>;
  valueType?: 'array' | 'object-array' | null;
  valueAttrs?: Array<NzaFormItem>; // valueType: 'object-array'时，定义子对象属性
  max?: number; // 如果valueType='array'，控制Array最大长度
  addButtonText?: string;
}

export type NzaFormLayout = 'horizontal' | 'vertical' | 'inline';

export function initFormControlConfig(
  formItems: Array<NzaFormItem>
): { [key: string]: any } {
  const controlsConfig = {};
  formItems.forEach((fi) => {
    if (fi.valueType === 'array') {
      // 处理 FormArray
      const formControls: Array<FormControl> = [];
      if (!(fi.value && fi.value.length > 0)) {
        fi.value = [null];
      }
      fi.value.forEach((val) => {
        formControls.push(
          new FormControl(val, fi.validators ? [...fi.validators] : null)
        );
      });
      controlsConfig[fi.key] = new FormArray(formControls);
    } else if (fi.valueType === 'object-array') {
      // 对象数组
      const value = fi.value || [{}]; // 字段值
      const valueAttrs = fi.valueAttrs; // 字段子属性集合
      const valueArray = [];
      value.forEach((val) => {
        const valueControlsConfig = {};
        // 预填默认值
        valueAttrs.forEach((attr) => {
          valueControlsConfig[attr.key] = new FormControl(
            val[attr.key],
            attr.validators ? [...attr.validators] : null
          );
        });
        valueArray.push(new FormGroup(valueControlsConfig));
      });
      controlsConfig[fi.key] = new FormArray(valueArray);
    } else {
      // 处理简单数据类型
      controlsConfig[fi.key] = new FormControl(
        fi.value,
        fi.validators ? [...fi.validators] : null
      );
    }
  });
  return controlsConfig;
}
/**
 * 表单验证
 * @param form FormGroup
 */
export function validateForm(form: FormGroup): boolean {
  Object.keys(form.controls).forEach((key) => {
    form.controls[key].markAsDirty();
    form.controls[key].updateValueAndValidity();
    if (form.controls[key] instanceof FormArray) {
      // 验证数组
      const formArray: FormArray = form.controls[key] as FormArray;
      formArray.controls.forEach((formControl) => {
        if (formControl instanceof FormGroup) {
          // 验证数组对象
          Object.keys(formControl.controls).forEach((cKey) => {
            formControl.controls[cKey].markAsDirty();
            formControl.controls[cKey].updateValueAndValidity();
          });
        } else {
          formControl.markAsDirty();
          formControl.updateValueAndValidity();
        }
      });
    }
  });
  return form.valid;
}

@Component({
  selector: 'nz-admin-form',
  exportAs: 'nzAdminForm',
  templateUrl: './form.component.html',
})
export class NzaFormComponent {
  // 表单
  @Input() nzaForm: FormGroup;
  // 表单字段
  @Input() nzaFormItems: Array<NzaFormItem> = [];
  // 一行显示列数
  @Input() nzaColumn: 1 | 2 | 3 | 4;
  // 表单布局
  @Input() nzaLayout: NzaFormLayout = 'horizontal';
  // 表单样式
  @Input() nzaFormStyle = { padding: '16px' };
  // 重置文案
  @Input() nzaClearText = 'Reset';
  // 确定文案
  @Input() nzaOkText = 'Ok';
  // 是否显示底部表单操作按钮
  @Input() nzaShowActions = true;
  // 表单验证模板
  @Input() nzaErrorTemplate: TemplateRef<{
    $implicit: FormControl;
  }> | null = null;
  // 提交表单
  @Output() nzaSubmitted: EventEmitter<any> = new EventEmitter();

  constructor() {}

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.nzaForm.reset();
    Object.keys(this.nzaForm.controls).forEach((key) => {
      this.nzaForm.controls[key].markAsPristine();
      this.nzaForm.controls[key].updateValueAndValidity();
    });
  }

  submitForm(): void {
    if (validateForm(this.nzaForm)) {
      this.nzaSubmitted.emit(this.nzaForm.value);
    }
  }

  addField(formItem: NzaFormItem, event: MouseEvent): void {
    event?.preventDefault();
    const formArray: FormArray = this.nzaForm.controls[
      formItem.key
    ] as FormArray;

    if (formItem.valueType === 'object-array') {
      const fgc = {};
      formItem.valueAttrs.forEach((vt) => {
        fgc[vt.key] = new FormControl(
          null,
          vt.validators ? [...vt.validators] : null
        );
      });
      formArray.push(new FormGroup(fgc));
    } else if (formItem.valueType === 'array') {
      formArray.push(
        new FormControl(
          null,
          formItem.validators ? [...formItem.validators] : null
        )
      );
    }
  }

  removeField(formItem: NzaFormItem, index: number, event: MouseEvent): void {
    event?.preventDefault();
    const formArray: FormArray = this.nzaForm.controls[
      formItem.key
    ] as FormArray;
    formArray.removeAt(index);
  }
}
