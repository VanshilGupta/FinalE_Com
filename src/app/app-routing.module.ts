import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProductPage } from './product/product.page';

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
    path: 'page1',
    loadChildren: () => import('./page1/page1.module').then( m => m.Page1PageModule)
  },

  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
 
  {
    path: 'login',
    loadChildren: () => import('./page1/page1.module').then( m => m.Page1PageModule)
  },
  {
    path: 'mens',
    loadChildren: () => import('./mens/mens.module').then( m => m.MensPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
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
    path : 'mens/product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },
  {
    path : 'product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },

  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },  {
    path: 'watches',
    loadChildren: () => import('./watches/watches.module').then( m => m.WatchesPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
