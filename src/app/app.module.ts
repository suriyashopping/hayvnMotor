import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from "@HayvnCore/core.module";
import { SharedModule } from "@HayvnShared/shared.module";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { cartReducer } from './store/reducer/cart.reducer';
import { Product } from './store/effect/product.effects';
import { productReducer } from './store/reducer/product.reducer';
import { reducers, metaReducers } from './store';
import { HydrationEffects } from './store/effect/hydration.effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([Product, HydrationEffects]),
    StoreDevtoolsModule.instrument({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
