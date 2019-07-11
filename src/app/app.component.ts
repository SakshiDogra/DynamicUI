import { Component } from '@angular/core';
import { HeaderModel, Header } from '../components/header/header.model';
import { SideNavModel } from '../components/side-nav/side-nav.model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'dynamic-view',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Dynamic-View';
  buttonText = 'Support';
  // Inputs to be passed to components
  headerData: Header;
  sideNavData: SideNavModel;

  constructor( ) {

    this.headerData = new HeaderModel(
      this.title,
      this.buttonText
    );
  }

  ngOnInit() { }
}
