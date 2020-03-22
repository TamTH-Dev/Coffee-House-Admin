import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list/product-list.component';
import { MaterialModule } from '../../shared/material.module';
import { ProductEditComponent } from './product-edit/product-edit/product-edit.component';
import { ProductResolver } from '../../services/product-resolver.service';
import { ProductDetailComponent } from './product-detail/product-detail/product-detail.component';

const PRODUCT_ROUTES = [
  {
    path: '',
    component: ProductListComponent
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
  declarations: [
    ProductCreateComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MaterialModule,
    RouterModule.forChild(PRODUCT_ROUTES)
  ]
})
export class ProductModule { }