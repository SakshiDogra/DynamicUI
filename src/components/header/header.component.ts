import { Component, Input } from '@angular/core';
import { Header } from './header.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Input() header: Header;
  constructor(
    private route: Router
  ) {

  }

  logout() {
    this.route.navigate(['']);
  }
}
