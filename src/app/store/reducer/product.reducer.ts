import { createReducer, on } from "@ngrx/store";
import { ProductDetailView } from "@HayvnShared/model/product-detail-view.model";
import * as Product from '@HayvnStore/action/product.action';
import { ProductDetailAPIList } from "../model/product-detail.model";

export interface ProductState {
    AllProductsEntity: ProductDetailAPIList | {},
    AllProductItems: ProductDetailView[] | [],

}

export const initialState: ProductState = {
    AllProductsEntity: {},
    AllProductItems: []
}

export const productReducer = createReducer(
    initialState,
    on(Product.LoadProductSuccess, (state: ProductState, {productlist}) => (
        {
            ...state,
            AllProductsEntity: productlist,
            AllProductItems: [...state.AllProductItems, ...(JSON.parse(JSON.stringify((productlist?.results)? productlist.results: [])))]
        }
    ))
)
