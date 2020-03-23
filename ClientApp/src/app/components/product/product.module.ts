import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MaterialModule } from '../../shared/material.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

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
    ProductRoutingModule
  ]
})
export class ProductModule { }