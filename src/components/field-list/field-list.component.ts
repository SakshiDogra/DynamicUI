import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'underscore';

export interface FieldSet {
  displayName: string;
  fieldName: string;
  fieldValue: string;
  mandatory: boolean;
  required: boolean;
  optional: boolean;
  dataType: string;
  fieldType: string;
  selected: boolean;
  hidden: boolean;
  validations: any;
}

export interface FormGroupConfig {
  [property: string]: {};
}
@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss']
})
export class FieldListComponent implements OnInit, OnChanges {
  @Input() fieldList: FieldSet[] = [];
  @Input() form: FormGroup;

  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if (this.fieldList.length) {
      this.buildFormGroup();
    }
  }

  ngOnChanges() {
  }

  getFormGroup(config: FormGroupConfig): FormGroup {
    return this.formBuilder.group(config);
  }

  buildFormGroup() {
    _.forEach(this.fieldList, (fieldSet: FieldSet) => {
      const form = this.form.get(fieldSet.fieldName);
      if (form) {
      } else {
        const control = this.formBuilder.control(fieldSet.displayName, [Validators.required]);
        this.form.addControl(fieldSet.fieldName, control);
      }
      if (fieldSet.hidden) {
        this.form.get(fieldSet.fieldName).disable();
      }
    });
  }

  toggleChange(event: FieldSet, index, isHidden = false) {
    if (!event.required) {
      if (isHidden) {
        event.hidden = !event.hidden;
        const inputControl = this.form.get(event.fieldName);
        if (event.hidden) {
          inputControl.disable();
          event.optional = false;
        } else {
          inputControl.enable();
        }
      } else {
        event.optional = !event.optional;
      }
      this.fieldList[index] = event;
    }
    this.updateValidations(event);
  }

  onChange(event: FieldSet, index) {
    event.displayName = this.form.get(event.fieldName).value;
  }

  updateValidations(fieldSet: FieldSet) {
    const control = this.form.get(fieldSet.fieldName);
    control.setValidators(fieldSet.optional ? [Validators.required] : null);
    control.updateValueAndValidity();
  }

  isFormControlValid(fieldName: string) {
    const control = this.form.get(fieldName);
    return control ? (control.touched && control.invalid) : false;
  }

}
