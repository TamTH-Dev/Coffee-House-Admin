import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ProductService } from './product.service';
import { Product } from '../models/product.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      return null;
    }
    return this.productService.getProduct(+id)
      .pipe(catchError(() => of(null)));
  }

}

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<Product[]> {

  constructor(private productService: ProductService) { }

  resolve(): Observable<Product[]> {
    return this.productService.getProducts()
      .pipe(catchError(() => of(null)));
  }

}
