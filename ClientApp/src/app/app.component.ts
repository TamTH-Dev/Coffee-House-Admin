import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event, ActivatedRoute } from '@angular/router';
import { faHome, faListUl, faFolderPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  faHome = faHome;
  faListUl = faListUl;
  faFolderPlus = faFolderPlus;
  isLogged: boolean = false;
  isErrorPage: boolean = false;
  showLoadingIndicator: boolean = true;
  userDetails: any;

  constructor(private router: Router) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
        const paths = location.pathname.split('/');
        if (paths[1] != 'products' && paths[1] != 'home') {
          this.isErrorPage = true;
        }
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
      this.isLogged = true;
    }
  }

}
