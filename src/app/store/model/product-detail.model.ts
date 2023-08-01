import { ProductDetailView } from "@HayvnShared/model/product-detail-view.model";

export interface ProductDetail {
    cartProduct: ProductDetailView[],
    userId: string,
    createdDate?: Date
}

export interface ProductDetailAPIList {
    count: number,
    next: string | null,
    previous: string | null,
    results: ProductDetailView[]
}