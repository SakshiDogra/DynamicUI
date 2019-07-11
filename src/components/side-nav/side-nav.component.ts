import { Component, Input } from '@angular/core';
import { SideNavModel, NavItems } from './side-nav.model';
import { Router } from '@angular/router';

@Component({
  selector: 'dynamic-side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['side-nav.component.scss']
})

export class SideNavComponent {

  @Input() sideNavData: SideNavModel;
  constructor(
    public router: Router
  ) { }

  navigateTo(item) {
    this.sideNavData.navItems.forEach((element: NavItems) => {
      element.active = false;
      if (item === element) {
        item.active = true;
      }
    });
    this.router.navigate([item.url]);
  }
}
