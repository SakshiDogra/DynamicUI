import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormFieldModel } from 'src/models/form-field.model';
import { Panel } from 'src/interfaces/panel.interface';
import { FieldSet } from '../field-list/field-list.component';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent implements OnInit, OnChanges {
  @Input() label = 'Label';
  @Input() fieldName: string;
  @Input() type = '';
  @Input() data: FieldSet;
  @Input() panel: Panel;
  @Input() disable: Boolean = false;
  @Output() toggleChange = new EventEmitter<FormFieldModel>();
  @Output() togglePanelChange = new EventEmitter<Panel>();
  selected = false;
  constructor( ) { }

  ngOnInit() {
    if (!this.type) {
      this.selected = this.data[this.fieldName];
    } else {
      this.selected = this.panel[this.fieldName];
    }
    this.ngOnChanges();
  }

  ngOnChanges() {
    if (!this.type) {
      this.selected = this.data[this.fieldName];
    } else {
      // this.selected = this.panel[this.fieldName];
      // if (this.fieldName === 'collapsable' && !this.selected) {
      //   this.panel['collapsed'] = true;
      // }
    }
  }

  onChange() {
    this.selected = !this.selected;
    if (!this.type) {
      this.toggleChange.emit(this.data);
    } else {
      this.panel[this.fieldName] = this.selected;
      if (this.fieldName === 'collapsable' && !this.selected) {
        this.panel['collapsed'] = true;
      }
      this.togglePanelChange.emit(this.panel);
    }
  }

}
