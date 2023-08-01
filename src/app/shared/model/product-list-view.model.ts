import { ProductDetailView } from "./product-detail-view.model";

export interface ProductListView {
count: number,
next: string,
previous: string, 
results: ProductDetailView[]
}