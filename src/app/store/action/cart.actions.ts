import { createAction, props } from "@ngrx/store";
import { ProductDetailView } from "@HayvnShared/model/product-detail-view.model";

export const AddToCart = '[ADD CART] Add To Cart';
export const UpdateToCart = '[UPDATE CART] Update To Cart';
export const DeleteFromCart = '[DELETE CART] Delete From Cart';

// Add to cart action
export const AddCart = createAction(
    AddToCart,
    props <{product: ProductDetailView}> ()
    )
    
// Update to cart action
export const UpdateCart = createAction(
    UpdateToCart,
    props <{product: ProductDetailView}> ()
)

// Delete product from cart action
export const DeleteCart = createAction(
    DeleteFromCart,
    props <{product: ProductDetailView}> ()
)