import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CateogoriesResolver } from '../../services/category-resolver.service';
import { CategoryComponent } from './category.component';

const CATEGORIES_ROUTES = [
  {
    path: '',
    component: CategoryComponent,
    resolve: {
      resolvedCategories: CateogoriesResolver
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(CATEGORIES_ROUTES)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
