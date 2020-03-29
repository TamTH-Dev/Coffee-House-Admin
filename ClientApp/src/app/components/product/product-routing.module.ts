import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductResolver, ProductsResolver } from '../../services/product-resolver.service';
import { CateogoriesResolver } from '../../services/category-resolver.service';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductCreateGuard } from './product-create/product-create.guard';
import { ProductEditGuard } from './product-edit/product-edit.guard';

const PRODUCT_ROUTES = [
  {
    path: '',
    component: ProductListComponent,
    resolve: {
      resolvedProducts: ProductsResolver,
      resolvedCategories: CateogoriesResolver
    }
  },
  {
    path: 'add',
    component: ProductCreateComponent,
    canDeactivate: [ProductCreateGuard],
    resolve: { resolvedCategories: CateogoriesResolver }
  },
  {
    path: ':id',
    component: ProductDetailComponent,
    resolve: {
      resolvedProduct: ProductResolver,
      resolvedCategories: CateogoriesResolver
    }
  },
  {
    path: ':id/edit',
    component: ProductEditComponent,
    resolve: {
      resolvedProduct: ProductResolver,
      resolvedCategories: CateogoriesResolver
    },
    canDeactivate: [ProductEditGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(PRODUCT_ROUTES)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
