import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { CategoryService } from './category.service';
import { Category } from '../models/product.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CateogoriesResolver implements Resolve<Category[]> {

  constructor(private categoryService: CategoryService) { }

  resolve(): Observable<Category[]> {
    return this.categoryService.getCategories()
      .pipe(catchError(() => of(null)));
  }

}
