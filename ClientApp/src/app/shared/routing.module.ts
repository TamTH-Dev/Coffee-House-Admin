import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { PageNotFoundComponent } from '../components/page-not-found.component';

const ROUTES = [
  { path: 'home', component: HomeComponent },
  {
    path: 'product',
    loadChildren: () => import('../components/product/product.module')
      .then(m => m.ProductModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule { }