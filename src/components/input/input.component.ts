import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormFieldModel } from '../../models/form-field.model';
import { FieldSet } from '../field-list/field-list.component';

@Component({
  selector: 'app-input',
  styleUrls: ['input.component.scss'],
  templateUrl: 'input.component.html'
})

export class InputComponent implements OnInit, OnChanges {
  @Input() data: FieldSet;
  @Input() panel: string;
  @Input() inputForm: FormGroup;
  @Input() isAdmin = false;
  @Input() disable: Boolean = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const group = {};
    const validations = this.setValidaitons();
    group[this.data.fieldName] = validations.length ? new FormControl('', validations) : new FormControl('');
    const form = this.inputForm.get(this.data.fieldName);
    if (form && (this.data.fieldType === 'C')) {
      this.inputForm.get(this.data.fieldName).setValue(this.data['fieldValue'].toString() || '');
    } else {
      const control = this.fb.control(this.isAdmin ?
        this.data.displayName : (this.data['fieldValue'].toString() || ''), [Validators.required]);
      this.inputForm.addControl(this.data.fieldName, control);
    }
    this.updateControl();
  }

  ngOnChanges() {
    this.updateControl();
    this.onChange(true);
  }
  updateControl() {
    const control = this.inputForm.get(this.data.fieldName);
    if (control) {
      if (this.data.hidden) {
        control.disable();
      } else {
        control.enable();
      }
    }
  }

  onChange(status = false) {
    if (this.isAdmin) {
      this.data.displayName = this.inputForm.get(this.data.fieldName).value;
    } else {
      this.data.fieldValue = status ? this.data.fieldValue : this.inputForm.get(this.data.fieldName).value;
    }
  }

  setValidaitons() {
    const validations = [];
    if (this.data.required) {
      validations.push(Validators.required);
    }
    if (this.data.validations) {
      const validationRules = this.data.validations;
      if (validationRules.minLength) {
        validations.push(Validators.minLength(validationRules.minLength));
      }
      if (validationRules.maxLength) {
        validations.push(Validators.minLength(validationRules.maxLength));
      }
      if (validationRules.pattern) {
        validations.push(Validators.pattern(validationRules.pattern));
      }
    }
    return validations;
  }

  // setInputProperties() {
  //   if (this.data.value) {
  //     this.inputForm.get(this.data.fieldName).setValue(this.data.value);
  //   }
  //   if (this.data.disabled) {
  //     this.inputForm.get(this.data.fieldName).disable();
  //   }
  // }

  isFieldValid(field: string) {
    return !this.inputForm.get(field).disabled && !this.inputForm.get(field).valid && this.inputForm.get(field).touched;
  }

  displayError(field: string) {
    return {
      'has-error': !this.inputForm.get(field).valid
    };
  }

  displayFieldCss(field: string) {
    return {
      'error': true
    };
  }

  convertDisplayName(displayName: string) {
    return displayName.substring(0, 20);
  }
}
