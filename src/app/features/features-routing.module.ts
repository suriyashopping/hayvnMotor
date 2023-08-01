import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreFeatureComponent } from './core-feature.component';

const routes: Routes = [
  {
    path: '',
    component: CoreFeatureComponent,
    children: [
      {
        path: 'overview',
        pathMatch: 'prefix',
        loadChildren: () => import('./product-view/product-view.module').then(m => m.ProductViewModule)
      },
      {
        path: 'cart-view',
        pathMatch: 'full',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
      },
      {
        path: '',
        pathMatch: 'prefix',
        loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
