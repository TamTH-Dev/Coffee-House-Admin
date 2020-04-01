import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, take, mergeMap, map } from 'rxjs/operators';

import { CategoryService } from './category.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CateogoriesResolver implements Resolve<Category[]> {

  constructor(private categoryService: CategoryService) { }

  resolve(): Observable<Category[]> {
    return this.categoryService.getCategories().pipe(
      take(1),
      map((categories: Category[]) => categories),
      catchError(() => of(null))
    );
  }

}