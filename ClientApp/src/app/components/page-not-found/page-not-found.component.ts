import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { BootController } from 'src/boot-controller';

@Component({
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) { }

  onBackToHome(): void {
    this.ngZone.runOutsideAngular(() => BootController.getbootControl().restart());
    this.router.navigateByUrl('/home');
  }
}