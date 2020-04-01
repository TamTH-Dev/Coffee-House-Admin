import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogged: boolean = false;
  isErrorPage: boolean = false;
  doesShowLoadingIndicator: boolean = true;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.doesShowLoadingIndicator = true;
        const paths = location.pathname.split('/');
        if (paths[1] != 'home' && paths[1] != 'products' && paths[1] != 'categories') {
          this.isErrorPage = true;
        }
      }
      if (
        routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError
      ) {
        this.doesShowLoadingIndicator = false;
      }
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.isLogged = true;
    }
  }

}
