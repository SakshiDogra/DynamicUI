import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FieldSet } from '../field-list/field-list.component';
import * as _ from 'underscore';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterViewInit, OnInit {
  @Input() tabList: Array<any>;
  @Input() tabIndex: number;
  @Input() isAdmin: Boolean = true;
  @Input() form: FormGroup;
  @Input() answers = {};
  fieldList: FieldSet[] = [];
  fieldItems;
  constructor() { }

  ngOnInit() {
    if (this.tabList.length) {
      const activeTab = _.where(this.tabList, { active: true });
      if (activeTab) {
        this.showActiveTabList(activeTab[0]);
      } else {
        this.tabList[0].active = true;
        this.showActiveTabList(this.tabList[0]);
      }
    }
  }

  ngAfterViewInit() {
  }

  showActiveTabList(item) {
    this.tabList.forEach((element) => {
      element.active = false;
      if (item === element) {
        item.active = true;
        this.fieldItems = Object.keys(item);
        this.fieldList = item;
      }
    });
  }

}
