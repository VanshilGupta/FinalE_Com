import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChowkidaarGuard } from './chowkidaar.guard';
import { ProductPage } from './product/product.page';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then( m => m.HomepagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./page1/page1.module').then( m => m.Page1PageModule),
    canActivate : [ChowkidaarGuard]
  },

  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate : [ChowkidaarGuard]
  },
 
  {
    path: 'men',
    loadChildren: () => import('./mens/mens.module').then( m => m.MensPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
    canActivate : [ChowkidaarGuard]
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule),
    canActivate : [ChowkidaarGuard]
  },
  {
    path: 'women',
    loadChildren: () => import('./women/women.module').then( m => m.WomenPageModule),
  },
  {
    path : 'women/product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },
  {
    path : 'men/product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },
  {
    path : 'watches/product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },
  {
    path : 'test',
    component : TestComponent
  },
  {
    path : 'product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },

  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule),
    canActivate : [ChowkidaarGuard]
  },
  {
    path: 'watches',
    loadChildren: () => import('./watches/watches.module').then( m => m.WatchesPageModule)
  },
  {
    path: 'weboffers',
    loadChildren: () => import('./weboffers/weboffers.module').then( m => m.WeboffersPageModule)
  },
  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
