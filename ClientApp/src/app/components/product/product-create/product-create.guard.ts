import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductCreateComponent } from './product-create.component';

@Injectable({
  providedIn: 'root'
})
export class ProductCreateGuard implements CanDeactivate<ProductCreateComponent> {
  canDeactivate(
    component: ProductCreateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component.isDirty) {
      return confirm(`Navigate anyway and lose all created data?`);
    }

    return true;
  }
}