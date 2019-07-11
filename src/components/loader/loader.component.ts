import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  styleUrls: ['loader.component.scss'],
  templateUrl: 'loader.component.html'
})

export class LoaderComponent implements OnInit {
  @Input() showLoader = false;

  ngOnInit() {

  }
}
