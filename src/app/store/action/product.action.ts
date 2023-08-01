import { createAction, props } from "@ngrx/store";
import { ProductDetailView } from "@HayvnShared/model/product-detail-view.model";
import { ProductDetailAPIList } from "../model/product-detail.model";

export const LOAD_PRODUCT = "[ PRODUCT LIST ] Load Product List"
export const LOAD_PRODUCT_SUCCESS = "[ PRODUCT LIST ] Load Product Success"

export const LoadProduct = createAction(
    LOAD_PRODUCT,
    props <{urlPath: string}> ()
    )

export const LoadProductSuccess = createAction(
    LOAD_PRODUCT,
    props <{productlist: ProductDetailAPIList}> ()
    )
