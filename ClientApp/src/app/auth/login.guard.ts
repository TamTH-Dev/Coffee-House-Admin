
import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { BootController } from 'src/boot-controller';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private ngZone: NgZone
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token') == null) {
      return true;
    }
    this.ngZone.runOutsideAngular(() => BootController.getbootControl().restart());
    this.router.navigate(['/home']);
    return false;
  }

}
