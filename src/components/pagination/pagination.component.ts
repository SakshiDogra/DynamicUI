import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as _ from 'underscore';

@Component({
    selector: 'app-pagination',
    styleUrls: ['pagination.component.scss'],
    templateUrl: 'pagination.component.html'
})

export class PaginationComponent implements OnInit {
    @Input() dataLength;
    @Input() pageSize;
    @Output() pageChange = new EventEmitter<any>();
    currentPage = 1;
    pages = [];

    ngOnInit() {
        let arrayLength = this.dataLength / this.pageSize;
        const arrayLengthSplit = arrayLength.toString().split('.');
        arrayLength = arrayLengthSplit.length > 1 ? parseInt(arrayLengthSplit[0]) + 1 : parseInt(arrayLengthSplit[0]);
        for (let i = 1; i <= arrayLength; i = i + 1) {
            this.pages.push(i);
        }
    }

    changePage(event) {
        this.currentPage = event;
        this.pageChange.emit({ currentPage: event });
    }

    changePageToFirstLastNextPrev(pageType) {
        let currentPage: number;
        switch (pageType) {
            case 'first':
                currentPage = 1;
                break;
            case 'previous':
                currentPage = this.currentPage - 1;
                break;
            case 'next':
                currentPage = this.currentPage + 1;
                break;
            case 'last':
                currentPage = this.pages[this.pages.length - 1];
                break;
        }
        this.changePage(currentPage);
    }
}
