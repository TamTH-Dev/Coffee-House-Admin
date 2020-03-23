import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductResolver, ProductsResolver } from '../../services/product-resolver.service';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const PRODUCT_ROUTES = [
  {
    path: '',
    component: ProductListComponent,
    resolve: { resolvedProducts: ProductsResolver }
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'all',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path: 'all',
    //     component: ProductListContentComponent
    //   },
    //   {
    //     path: 'milk-tea',
    //     component: ProductListContentComponent
    //   },
    //   {
    //     path: 'coffee',
    //     component: ProductListContentComponent
    //   },
    //   {
    //     path: 'pudding',
    //     component: ProductListContentComponent
    //   }
    // ]
  },
  {
    path: 'add',
    component: ProductCreateComponent
  },
  {
    path: ':id',
    component: ProductDetailComponent,
    resolve: { resolvedProduct: ProductResolver }
  },
  {
    path: ':id/edit',
    component: ProductEditComponent,
    resolve: { resolvedProduct: ProductResolver }
  }
]

@NgModule({
  imports: [RouterModule.forChild(PRODUCT_ROUTES)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
