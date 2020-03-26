import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';

import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserService } from './services/user.service';
import { UserDetails } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ClientApp';
  faHome = faHome;
  faListUl = faListUl;
  faFolderPlus = faFolderPlus;
  faBell = faBell;
  faUser = faUser;
  showLoadingIndicator = true;
  userDetails: any;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (
        routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError
      ) {
        this.showLoadingIndicator = false;
      }
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.userService.getUserProfile().subscribe({
        next: (res: any) => {
          this.userDetails = res;
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }

  onLogout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('user/login');
  }
}
