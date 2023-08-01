import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { hydrationMetaReducer } from "./reducer/hydration.reducer";

import { cartReducer } from './reducer/cart.reducer';
import { productReducer } from './reducer/product.reducer';

export const reducers: ActionReducerMap<any> = {
    cart: cartReducer,
    productList: productReducer 
}

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];