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
    path: ':id/edit',
    component: ProductEditComponent,
    resolve: { resolvedProduct: ProductResolver }
  }
]

@NgModule({
  declarations: [ProductCreateComponent, ProductListComponent, ProductEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MaterialModule,
    RouterModule.forChild(PRODUCT_ROUTES)
  ]
})
export class ProductModule { }