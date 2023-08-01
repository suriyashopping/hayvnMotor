export interface ProductImage {
    url: string,
    key: string
}
export interface ProductDetailView {
  "name": string,
  "model": string,
  "images"?: ProductImage[], 
  "manufacturer": string,
  "cost_in_credits": string,
  "length": string,
  "max_atmosphering_speed": string,
  "crew": string,
  "passengers": string,
  "cargo_capacity": string,
  "consumables": string,
  "hyperdrive_rating": string,
  "MGLT": string,
  "starship_class"?: string,
  "vehicle_class"?: string
  "pilots": [],
  "films": [],
  "created": string,
  "edited": string,
  "url": string,
  "quantity"?: number,
  "cost_in_percentage"?: string,
  "hot_sale_start_date"?: Date,
  "hot_sale_expire"?: Date,
}