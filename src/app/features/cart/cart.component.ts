import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { ProductDetail } from "@HayvnStore/model/product-detail.model";
import { ProductDetailView } from "@HayvnShared/model/product-detail-view.model";
import { Observable } from 'rxjs';
import { DeleteCart, UpdateCart } from '@HayvnApp/store/action/cart.actions';

@Component({
  selector: 'hayvn-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  displayedColumns: string[] = ['Item Details', 'Price', 'Quantity', 'Subtotal', 'Action'];
  dataSource: ProductDetailView[] = [];
  userCart$!: Observable<ProductDetail>;
  productQty: Array<number> = [];
  showMAxQtyWarn: boolean = false;

  constructor(private store: Store<{cart: ProductDetail}>) {
    this.userCart$ = this.store.select('cart');
    this.userCart$.subscribe((res: ProductDetail) => {
      this.dataSource = res.cartProduct;
    })
    // console.log('User Cart List ==> ', this.userCart$);
    
  }


  /**
   * 
   * @param mode 
   * @param qty 
   * @param index 
   * @param product 
   * @param min limit : 1
   * @param max limit : 10 
   */
  updateCartQty(mode: string, qty: number = 0, index:number, product: ProductDetailView) {
    // console.log(mode);
    if(mode == 'increase') {
      if((Number(qty) === 10)) {
      this.showMAxQtyWarn = true;
      setTimeout(() => {
        this.showMAxQtyWarn = false;
      }, 2000);
    }
      this.productQty[index] = (Number(qty) !== 10)? Number(qty)+1: 10;
    } else {
      this.productQty[index] = (Number(qty) !== 1)? Number(qty)-1: 1;
    }
    product = JSON.parse(JSON.stringify(product));
    product['quantity'] = this.productQty[index];
    this.store.dispatch(UpdateCart({product: product}));
  }

  isExistInCart(productObj: ProductDetailView, index: number) {
      this.productQty[index] = Number(productObj?.quantity);
      return true;
  }

  calculateTotal() {
    let totalAmount = 0;
    for(let obj of this.dataSource) {
      totalAmount += (Number(obj.cost_in_credits) * Number(obj.quantity));
    }
    return totalAmount;
  }

  deleteProductFromCart(product: ProductDetailView) {
    product = JSON.parse(JSON.stringify(product));
    product['quantity'] = 0;
    this.store.dispatch(DeleteCart({product: product}));
  }

  
  /**
   * 
   * @param url 
   * @returns category name to generate product detail page route
   */
  getCategoryName(url: string) {
    const FormatUrlArray = url.split('/');
    return FormatUrlArray[FormatUrlArray.length-3];
  }

  /**
   * 
   * @param url 
   * @returns product id to generate product detail page route
   */
  getProductId(url: string) {
    const FormatUrlArray = url.split('/');
    return FormatUrlArray[FormatUrlArray.length-2];
  }
}
