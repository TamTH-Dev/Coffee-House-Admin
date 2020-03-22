import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ProductService } from './product.service';
import { Product } from '../models/product.model';

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
    return this.productService.getProduct(+id);
  }
}
