import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ProductListRoutingModule } from './product-list-routing.module';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProductListComponent } from './product-list.component';
import { OfferCountdownComponent } from "@HayvnShared/component/offer-countdown/offer-countdown.component";
import { CounterDirective } from '@HayvnShared/directive/counter.directive';

@NgModule({
  declarations: [
    ProductListComponent,
    OfferCountdownComponent,
    CounterDirective
  ],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    InfiniteScrollModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [{provide: CounterDirective, multi: true}]
})
export class ProductListModule { }
