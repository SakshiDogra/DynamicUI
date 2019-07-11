import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  styleUrls: ['modal.component.scss'],
  templateUrl: 'modal.component.html'
})

export class ModalComponent implements OnInit {
  @Input() showLoader = false;

  ngOnInit() {

  }
}
