import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormFieldModel } from '../../models/form-field.model';
import { UserDataService } from 'src/app/services/user-data.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-multi-select-dropdown-component',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss']
})
export class MultiSelectDropDownComponent implements OnInit {
  @Input() data: FormFieldModel;
  @Input() panel: string;
  @Input() inputForm: FormGroup;
  @Input() disable: Boolean = false;
  options: any = [];
  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService
  ) { }

  ngOnInit() {
    const group = {};
    const dropdowns = _.find(this.userDataService.dropDownList, { 'fieldName': this.data.fieldName});
    if (dropdowns) {
      this.options = dropdowns.dropdowns;
    }
    group[this.data.fieldName] = new FormControl('');
    const form = this.inputForm.get(this.data.fieldName);
    if (form && (this.data.fieldType === 'F4')) {
      this.inputForm.get(this.data.fieldName).setValue(this.data['fieldValue']);
    } else {
      const control = this.fb.control(this.data['fieldValue'], [Validators.required]);
      this.inputForm.addControl(this.data.fieldName, control);
    }
  }

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

}
