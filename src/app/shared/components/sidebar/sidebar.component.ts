import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  public routes: string[] = [
    '',
    'about',
    'contact',
    'countries/by-capital',
    'countries/by-country',
    'countries/by-region',
  ];
}
