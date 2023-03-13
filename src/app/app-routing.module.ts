import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: '', component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent,
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
