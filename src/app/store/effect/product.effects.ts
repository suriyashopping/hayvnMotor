import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { map, exhaustMap, catchError, EMPTY, mergeMap, switchMap, takeUntil } from "rxjs";
import { ProductService } from "@HayvnShared/services/product/product.service";
import { LoadProduct, LoadProductSuccess } from "../action/product.action";
import { ProductDetailAPIList } from "../model/product-detail.model";

@Injectable({
    providedIn: 'root'
})

export class Product {
    constructor(private action$: Actions, private productService: ProductService) {}

    _loadProduct$ = createEffect(() => 
        this.action$.pipe(
            ofType(LoadProduct),
            mergeMap((action) => 
            this.productService.loadProductList(action?.urlPath).pipe(
                map((productListData: ProductDetailAPIList) => LoadProductSuccess({productlist: productListData})),
                catchError(() => EMPTY)
            ))
        ))

}
