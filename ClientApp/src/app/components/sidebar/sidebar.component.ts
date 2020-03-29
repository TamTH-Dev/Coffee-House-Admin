import { Component } from '@angular/core';
import { faHome, faListUl, faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  faHome = faHome;
  faListUl = faListUl;
  faTable = faTable;
}
