import { createReducer, on } from "@ngrx/store";
import * as Cart from "@HayvnStore/action/cart.actions";
import { ProductDetail } from "@HayvnStore/model/product-detail.model";
import { ProductDetailView } from "@HayvnApp/shared/model/product-detail-view.model";


export const initialState: ProductDetail = {
    cartProduct: [],
    userId: 'UIN'+(Math.floor(Math.random()*1000)).toString(),
    createdDate: new Date()
};

export const cartReducer = createReducer(
    initialState,
    on(Cart.AddCart, (state: ProductDetail, {product}) => (
        {
            ...state,
            cartProduct: [...state.cartProduct, product]
        }
    )),
    on(Cart.UpdateCart, (state: ProductDetail, {product}) => (
        {
            ...state,
            cartProduct: state.cartProduct.map((cartProduct: ProductDetailView) => {
                if(cartProduct.url == product.url) {
                    cartProduct = product;
                }
                return cartProduct;
            })
        }
    )),
    on(Cart.DeleteCart, (state: ProductDetail, {product}) => (
        {
            ...state,
            cartProduct: state.cartProduct.map((cartProduct: ProductDetailView) => {
                if(cartProduct.url == product.url) {
                    cartProduct = product;
                }
                return cartProduct;
            })
            .filter((cartProduct: ProductDetailView) => (cartProduct.quantity !== 0))
        }
    ))
)