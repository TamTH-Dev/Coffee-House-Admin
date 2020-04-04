import { Component, OnInit, NgZone } from '@angular/core';
import { faBell, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { BootController } from 'src/boot-controller';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faBell = faBell;
  faUser = faUser;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  userDetails: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private ngZone: NgZone,
  ) { }

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
    const doesLogout = confirm('Are you sure you want to logout?');
    if (doesLogout) {
      localStorage.removeItem('token');
      this.ngZone.runOutsideAngular(() => BootController.getbootControl().restart());
      this.router.navigateByUrl('user/login');
    }
  }

}
