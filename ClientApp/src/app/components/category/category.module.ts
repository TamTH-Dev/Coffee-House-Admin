import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CategoryRoutingModule } from './category-routing.module';
import { MaterialModule } from '../../shared/material.module';
import { CategoryComponent } from './category.component';

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MaterialModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }