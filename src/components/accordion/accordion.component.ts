import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Panel } from '../../interfaces/panel.interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as _ from 'underscore';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() panels: Array<Panel>;
  @Input() isAdmin: Boolean = true;
  @Input() form: FormGroup;
  @Input() answers = {};
  @Output() deletePanel = new EventEmitter<Panel>();
  confirmationModal = false;
  deleteSection: Panel;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildFormControl();
  }

  buildFormControl() {
    this.panels.forEach((panel: Panel) => {
      if (panel.sectionName) {
        const form = this.form.get(panel.sectionId);
        if (form) {
        } else {
          const control = this.formBuilder.control(panel.sectionName, [Validators.required]);
          this.form.addControl(panel.sectionId, control);
        }
      }
    });
  }

  toggleChange(event: Panel, index, panel: Panel, isCollapsable = false) {
    if (isCollapsable) {
      this.panels[index].collapsable = event.collapsable;
      if (!this.panels[index].collapsable) {
        this.panels[index].collapsed =  true;
        this.panels[index].isOpen = false;
      }
    } else {
      this.panels[index].collapsed = event.collapsed;
    }
  }

  isFieldValid(field: string) {
    if (field) {
      return !this.form.get(field).valid && this.form.get(field).touched;
    }
    return false;
  }

  onChange(index) {
    this.panels[index].sectionName = this.form.get(this.panels[index].sectionId).value;
  }

  delete(section) {
    this.deleteSection = section;
    this.confirmationModal = true;
  }

  confirmDeletePanel() {
    this.confirmationModal = false;
    this.panels = _.without(this.panels, this.deleteSection);
    this.deletePanel.emit(this.deleteSection);
  }
}
