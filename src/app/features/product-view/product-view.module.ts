import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ProductViewRoutingModule } from './product-view-routing.module';
import { ProductViewComponent } from './product-view.component';

import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    ProductViewComponent
  ],
  imports: [
    CommonModule,
    ProductViewRoutingModule,
    CarouselModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class ProductViewModule { }
