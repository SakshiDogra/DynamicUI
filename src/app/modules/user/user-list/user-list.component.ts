import { Component, OnInit } from '@angular/core';
import { ViewList, MetaData, Response } from 'src/interfaces/view-list';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { DatePipe } from '@angular/common';
import 'rxjs-compat/add/operator/map';
import { UserListResponse } from 'src/interfaces/common.interface';
import * as _ from 'underscore';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  filteredData = [];
  appIdList = [];
  headerCoulmns = [];
  materialDetails = [];
  selectedAppDetails;
  appNumber = '';
  workItemID = '';
  showLoader = false;
  workItemsList = [];
  pagedResults = [];
  currentPage = 1;
  workItemPagedResults = [];
  workItemCurrentPage = 1;
  pageSize = 5;
  constructor(
    private route: Router,
    private userDataService: UserDataService
  ) { }

  ngOnInit() {
    this.userDataService.resetConfig();
    this.getMetaData();
  }

  getMetaData() {
    this.showLoader = true;
    this.userDataService.getMetaDataList().subscribe((response) => {
      this.appIdList = response.apps;
      this.showLoader = false;
    });
  }

  getConfigWorkItemsIds() {
    if (this.selectedAppDetails.appId) {
      this.showLoader = true;
      this.userDataService.getUserWorkItemDetails(this.selectedAppDetails.appId).subscribe((response: any) => {
        this.workItemsList = _.sortBy(response.workItemList, function(o) { return -o.workitemId; });
        this.getWorkItemPageChanged();
        this.showLoader = false;
      });
    }
  }

  getConfigDetails() {
    if (this.selectedAppDetails.appId) {
      this.getConfigWorkItemsIds();
      this.showLoader = true;
      this.userDataService.getDashboardData().subscribe((response: Response) => {
        this.showLoader = false;
        this.materialDetails = _.sortBy(response.views, function(o) { return -o.configId; });
        this.getPageChanged();
      });
    }
  }

  getWorkItemsID() {
    if (this.workItemID) {
      this.showLoader = true;
      this.userDataService.getUserWorkItemID(this.workItemID).subscribe((response: any) => {
        console.log(response);
        this.showLoader = false;
      });
    }
  }

  editWorkItem(workItem) {
    this.userDataService.userTypeView = workItem.keyId ? 'EditMaterialItem' : 'EditWorkItem';
    this.userDataService.userAppId = this.selectedAppDetails.appId;
    this.userDataService.userConfigId = '';
    this.userDataService.workItemDetails = workItem;
    this.route.navigate(['/user-view']);
  }

  createMaterial() {
    this.userDataService.userTypeView = 'CreateView';
    this.userDataService.userAppId = '';
    this.userDataService.userConfigId = '';
    this.route.navigate(['/user-view']);
  }

  createUseView(view) {
    if (this.selectedAppDetails.appId) {
      this.userDataService.userTypeView = 'CreateView';
      this.userDataService.userAppId = this.selectedAppDetails.appId;
      this.userDataService.userConfigId = view.configId;
      this.route.navigate(['/user-view']);
    }
  }

  getObjectData() {
    const body = {
      appId: this.selectedAppDetails.appId,
      number: this.appNumber
    };
    this.userDataService.getUserSearchDetails(body).subscribe((response: UserListResponse) => {
      this.headerCoulmns = response.columns;
      this.filteredData = response.data;
      this.selectedAppDetails = {};
      this.appNumber = '';
      this.showLoader = false;
    });
  }

  addSpacing(columnName: string) {
    columnName.replace(/[A-Z]/g, ' ');
    return columnName;
  }

  convertDateFormat(jsonDate: string) {
    if (jsonDate) {
      const nowDate = new Date(parseInt(jsonDate.substr(6)));
      let day = nowDate.getDate().toString();
      day = (day.length === 1) ? ('0' + day) : day;
      const month = (1 + nowDate.getMonth()).toString();
      return day + '/' + ((month.length === 1) ? ('0' + month) : month) + '/' + nowDate.getFullYear().toString();
    }
    return 'N/A';
  }

  pageChange(event) {
    this.currentPage = event.currentPage;
    this.getPageChanged();
  }

  getPageChanged() {
    const start: number = (this.currentPage - 1) * this.pageSize;
    const end: number = start + this.pageSize;
    this.pagedResults = this.materialDetails.slice(start, end);
  }

  workItemPageChange(event) {
    this.workItemCurrentPage = event.currentPage;
    this.getWorkItemPageChanged();
  }

  getWorkItemPageChanged() {
    const start: number = (this.workItemCurrentPage - 1) * this.pageSize;
    const end: number = start + this.pageSize;
    this.workItemPagedResults = this.workItemsList.slice(start, end);
  }

}
