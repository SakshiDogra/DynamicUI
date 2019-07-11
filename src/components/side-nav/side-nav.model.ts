export class SideNavModel {

  navItems: NavItems[];
  title: string;

  constructor(
    title: string,
    navItems: NavItems[]
  ) {
    this.navItems = navItems;
    this.title = title;
  }
}

export interface NavItems {
  item: string;
  url?: string;
  active: boolean;
}
