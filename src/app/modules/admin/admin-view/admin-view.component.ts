import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { UserDataService } from '../../../services/user-data.service';
import { ViewList, Response, MetaDataList, MetaData, TypeList } from 'src/interfaces/view-list';
import { HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import * as _ from 'underscore';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {

  dashboardData: ViewList[] = [];
  isAdmin: string;
  showLoader = false;
  appsList: TypeList[] = [];
  rolesList: TypeList[] = [];
  appId = '';
  roleId = '';
  pagedResults = [];
  currentPage = 1;
  pageSize = 5;
  confirmationModal = false;
  deleteConfig: ViewList;
  constructor(
    private route: Router,
    private userDataService: UserDataService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.userDataService.resetConfig();
    this.getMetaData();
    // this.getDashboardData();
    this.userDataService.getSampleData();
  }

  getMetaData() {
    this.userDataService.getMetaDataList().subscribe((response) => {
      this.appsList = response.apps;
      this.rolesList = response.roles;
    });
  }

  getDashboardData() {
    if (this.appId) {
      this.showLoader = true;
      this.userDataService.getDashboardData(this.appId).subscribe((response: Response) => {
        this.showLoader = false;
        this.dashboardData = _.sortBy(response.views, function(o) { return -o.configId; }) ;
        this.getPageChanged();
      });
    }
  }

  navigateTo(status = '') {
    if (status === 'user') {
      this.route.navigate(['/user-view']);
    } else {
      this.userDataService.configDetails.viewType = '';
      this.userDataService.resetConfig();
      this.route.navigate(['/createview']);
    }
  }

  preview(view: ViewList, index) {
    this.userDataService.configDetails.viewDetails = view;
    this.userDataService.configDetails.viewType = 'pre-view';
    this.route.navigate(['/pre-view']);
  }

  copyView(view: ViewList, index) {
    this.userDataService.configDetails.viewDetails = view;
    this.userDataService.configDetails.viewType = 'copy';
    this.route.navigate(['/createview']);
  }

  editView(view: ViewList, index) {
    this.userDataService.configDetails.viewDetails = view;
    this.userDataService.configDetails.viewDetails.userRole = 'Sales Representative';
    this.userDataService.configDetails.viewDetails.userRoleId = 'r57uj';
    this.userDataService.configDetails.viewType = 'edit';
    this.route.navigate(['/createview']);
  }

  dateConverstion(date: string) {
    if (date) {
      const year = date.substring(0, 4);
      const month = date.substring(4, 6);
      const day = date.substring(6, 8);
      return day + '/' + month + '/' + year;
    } else {
      return 'N/A';
    }
  }

  search() {
    this.getDashboardData();
  }

  confirmDelete() {
    this.confirmationModal = false;
    this.showLoader = true;
    const body = {
      appId: this.deleteConfig.appId,
      configId: this.deleteConfig.configId,
      configName: this.deleteConfig.configName
    };
    this.userDataService.deleteConfig(body).subscribe((response: any) => {
      this.dashboardData = _.without(this.dashboardData, this.deleteConfig);
      this.getPageChanged();
      this.showLoader = false;
    });
  }

  delete(view: ViewList) {
    this.deleteConfig = view;
    this.confirmationModal = true;
  }

  pageChange(event) {
    this.currentPage = event.currentPage;
    this.getPageChanged();
  }

  getPageChanged() {
    const start: number = (this.currentPage - 1) * this.pageSize;
    const end: number = start + this.pageSize;
    this.pagedResults = this.dashboardData.slice(start, end);
  }

}

