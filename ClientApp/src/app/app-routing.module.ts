import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const APP_ROUTES = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  {
    path: 'user/login', component: LoginComponent
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'products',
    loadChildren: () => import('./components/product/product.module')
      .then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }