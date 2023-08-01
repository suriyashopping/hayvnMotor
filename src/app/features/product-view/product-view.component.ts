import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpService } from "@HayvnSharedHttpService/http.service";
import { ProductDetailView } from "@HayvnShared/model/product-detail-view.model";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { map } from 'rxjs/operators';
import  * as ProductImg from "@HayvnAssets/mock-json/vehiclestarship.json";
import { Store } from "@ngrx/store";
import { AddCart, UpdateCart } from "@HayvnStore/action/cart.actions";
import { ProductDetail } from "@HayvnStore/model/product-detail.model";
import { Router } from "@angular/router";

@Component({
  selector: 'hayvn-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  URIEndPath!: string;
  ProductDetails!: ProductDetailView;
  userCart!: ProductDetail;
  selectedImage!: string;
  imageSize = 430;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoWidth: true,
    autoHeight: true,
    items: 1,
    // navText: [ '<i class="fa-chevron-left">Prev</i>', '<i class="fa-chevron-right">Next</i>' ],
    nav: false
  }
  productQty: number = 1;
  showMAxQtyWarn: boolean = false;
  productExistOnCart: ProductDetailView | undefined;
  constructor(private route: ActivatedRoute, private http: HttpService, private store: Store<{cart: ProductDetail}>, private router: Router) {
    this.store.select('cart').subscribe((res: ProductDetail) => {
      this.userCart = res;
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
      this.URIEndPath = `${param['category']}/${param['productId']}`;
      // console.log(this.URIEndPath);
      this.fetchProductDetail();
    });
  }

  fetchProductDetail() {
    this.http.get(this.URIEndPath)
    .pipe(map((product: any)=> {
      const ImgDir = (product.name).split(' ').join('-');
      var formatProductImg = JSON.parse(JSON.stringify(ProductImg));
      product['images'] = (formatProductImg[ImgDir]?.length)? formatProductImg[ImgDir]: formatProductImg['Placeholder-Img'];
      return product;
    }))
    .subscribe((res: ProductDetailView) => {
      // console.log(res);
      this.productExistOnCart = (this.userCart?.cartProduct).find((product)=> (product.url == res.url));
      // console.log('productExistOnCart==> ',this.productExistOnCart);
      res.quantity = this.productQty = (this.productExistOnCart?.quantity)?? 1;
      this.ProductDetails = res;
    })
  }

  changeimage(image: string){
    this.selectedImage = image;
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
  updateCartQty(mode: string, qty: number = 0) {
    // console.log(mode);
    if(mode == 'increase') {
      if((Number(qty) === 10)) {
      this.showMAxQtyWarn = true;
      setTimeout(() => {
        this.showMAxQtyWarn = false;
      }, 2000);
    }
      this.productQty = (Number(qty) !== 10)? Number(qty)+1: 10;
    } else {
      this.productQty = (Number(qty) !== 1)? Number(qty)-1: 1;
    }
  }

  /**
   * !addToCart Fn to add product to cart and will store in state to retrieve whereever need throughout app 
   */
  addToCart() {
    this.ProductDetails['quantity'] = this.productQty;
    const product = this.ProductDetails
    if(!(this.productExistOnCart)) {
      this.store.dispatch(AddCart({product: product}));
    } else {
      this.store.dispatch(UpdateCart({product: product}));
    }
    this.router.navigate(['/hayvn', 'cart-view']);
  }

}
