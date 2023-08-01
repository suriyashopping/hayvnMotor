import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { IInfiniteScrollEvent } from "ngx-infinite-scroll";
import { HttpService } from "@HayvnSharedHttpService/http.service";
import { Apiroute } from "@HayvnShared/constant/apiroute";
import { Observable, forkJoin, map } from "rxjs";
import { ProductDetailView } from '@HayvnApp/shared/model/product-detail-view.model';
import { ProductListView } from "@HayvnShared/model/product-list-view.model";
import  * as ProductImg from "@HayvnAssets/mock-json/vehiclestarship.json";
import { Store } from "@ngrx/store";
import { LoadProduct } from '@HayvnApp/store/action/product.action';
import { ProductDetailAPIList } from '@HayvnApp/store/model/product-detail.model';

@Component({
  selector: 'hayvn-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild('productContainer', {static: false}) private productContainer!: ElementRef<HTMLDivElement>;
  category!: string;
  count!: any;
  expiredValue: any = [];
  
  pageCount: number = 1;
  ProductList: ProductDetailView[] = [];
  TempProductData!: ProductListView | any;
  showScollToTop: boolean = false;
  constructor(private http: HttpService, private route: ActivatedRoute, private store: Store<{productList: any}>) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
      this.category = param?.category;
      //reset page count on category navigatiion
      this.pageCount = 1;
      // reset product listing and fetch initial product source
      this.ProductList = [];
      this.loadProductSource();
    });
    // load all products only once on page load first time
    this.loadProductSourceIsolatedFn();
  }
  
  // load product list in isolated store effects service call to load all products to store
  loadProductSourceIsolatedFn() {
    if(this.category == '' || this.category == undefined) {
      this.store.dispatch(LoadProduct({urlPath:'vehicles/?page=1'}));
      this.store.dispatch(LoadProduct({urlPath:'starships/?page=1'}));
      
      this.store.select('productList').subscribe(res => {
        if((window.performance && window.performance?.navigation?.type == 1) || !(res.AllProductItems?.length)) return;
        // console.log('Fetch All productList Data ==> ', res);
        let APIEndPath = res.AllProductsEntity?.next;
        if((!res.AllProductsEntity) || !APIEndPath || APIEndPath === null ) return;
        APIEndPath = APIEndPath.split('/').slice(-2).join('/');
        this.store.dispatch(LoadProduct({urlPath: APIEndPath}));
        
      })
    }
  }
  /**
   *!loadProductSource: Function to get initial product source
   */
  loadProductSource(): void {
    let productUrl = Apiroute.ProductListBycategory;
    const pageCount = (this.pageCount).toString();
    if(this.category) {
      this.getProductbyCategory(productUrl, pageCount)
    } else {
      this.getAllProduct(productUrl, pageCount)
    }
  }

  /**
   * 
   * @param event 
   * @returns 
   * !Scroll : Get product source on page scroll down like all product or product by category
   */
  onScrollDown(event: IInfiniteScrollEvent) {
    this.pageCount += 1;
    // console.log('scroll triggered..', event);
    let productUrl = Apiroute.ProductListBycategory;
    const currentScrollPosition = event.currentScrollPosition;
    // show scrollToTop option on page scroll
    this.showScollToTop = currentScrollPosition? true: false;
    const pageCount = (this.pageCount).toString();
    let TempProductData = (!(this.TempProductData?.length)) ? this.TempProductData: this.TempProductData[0];
    // multi API null value handling here to call either one or both to prevent next API Call start here
    if(this.TempProductData?.length && (this.TempProductData[0].next === null || this.TempProductData[1].next === null)) {
      if(this.TempProductData[0].next === null && this.TempProductData[1].next === null) {
        TempProductData = this.TempProductData[0];
      } else if(this.TempProductData[0].next !== null) {
        this.getProductbyCategory(productUrl, pageCount, currentScrollPosition, 'vehicles');
        return;
      } else if(this.TempProductData[1].next !== null) {
        this.getProductbyCategory(productUrl, pageCount, currentScrollPosition, 'starships');
        return;
      }
    }
    // multi API null value handling here to call either one or both to prevent next API Call end here

    // return if there is no api call response data available for next API hit 
    if (this.pageCount > 1 && (TempProductData?.next === null)) return;
    if(!this.category) {
      // get all category product list like vehicles and starships categories respectively
      this.getAllProduct(productUrl, pageCount, currentScrollPosition);
    } else {
      // get product list by category like vehicles or starships respectively
      this.getProductbyCategory(productUrl, pageCount, currentScrollPosition);
    }
    
  }

/**
 * 
 * @param event to hide or show scrollToTop option
 */
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (this.productContainer){
      const rect = this.productContainer.nativeElement.getBoundingClientRect();
      this.showScollToTop = (rect.top < window.innerHeight && window.pageYOffset!==0)? true: false;
      
    }
  };
  // Scroll to Top while click on ScrollToTop Fn
  ScrollToTop() {
    window.scrollTo(0, 0);
  }

  /**
   * !getAllProduct Fn: to Fetch all category's products
   * @param productUrl 
   * @param pageCount 
   * @param currentScrollPosition 
   */
  getAllProduct(productUrl: string, pageCount: string, currentScrollPosition?: number) {
    const VehiclesPatchURI = productUrl.replace('<<categoryName>>', 'vehicles').replace('<<pageCount>>', pageCount);
    const StarshipsPatchURI = productUrl.replace('<<categoryName>>', 'starships').replace('<<pageCount>>', pageCount);
    
    const combinedProduct$ = forkJoin(
      this.http.get(VehiclesPatchURI).pipe(map((product: any)=> {
        if(product?.results) {
          const results = (product.results).map((productData: ProductDetailView, index: number) => {
            if(productData?.cost_in_credits !== 'unknown' && pageCount == '1' && index%2 == 0) {
              productData['cost_in_percentage'] = this.calculatePercentage(productData.cost_in_credits);
              productData['hot_sale_start_date'] = new Date();
              productData['hot_sale_expire'] = this.calculateHotSaleTime();
            }
            const ImgDir = (productData.name).split(' ').join('-');
            var formatProductImg = JSON.parse(JSON.stringify(ProductImg));
            productData['images'] = (formatProductImg[ImgDir]?.length)? formatProductImg[ImgDir]: formatProductImg['Placeholder-Img'];
            return productData;
          })
          product.results = results;
        }
        return product;
      })),
      this.http.get(StarshipsPatchURI).pipe(map((product: any)=> {
        if(product?.results) {
          const results = (product.results).map((productData: ProductDetailView, index: number) => {
            if(productData?.cost_in_credits !== 'unknown' && pageCount == '1' && index%2 == 0) {
              productData['cost_in_percentage'] = this.calculatePercentage(productData.cost_in_credits);
              productData['hot_sale_start_date'] = new Date();
              productData['hot_sale_expire'] = this.calculateHotSaleTime();
            }
            const ImgDir = (productData.name).split(' ').join('-');
            var formatProductImg = JSON.parse(JSON.stringify(ProductImg));
            productData['images'] = (formatProductImg[ImgDir]?.length)? formatProductImg[ImgDir]: formatProductImg['Placeholder-Img'];
            return productData;
          })
          product.results = results;
        }
        return product;
      }))
    ).subscribe((res: any) => {
      // console.log('combined product list ', res);
      this.TempProductData = res;
      this.ProductList = [...this.ProductList, ...res[0]?.results, ...res[1]?.results];
      if(!currentScrollPosition) return;
      setTimeout(()=> {
        window.scroll(0, currentScrollPosition);
      },100)
    })
  }
  
  /**
   * 
   * @param productUrl 
   * @param pageCount 
   * @param currentScrollPosition 
   * @param category to fetch data based on category either vehicles or starships
   */
  getProductbyCategory(productUrl: string, pageCount: string, currentScrollPosition?: number, category?: string) {
    const categoryName = category? category: this.category
    const PatchURI = productUrl.replace('<<categoryName>>', categoryName).replace('<<pageCount>>', pageCount);
    
    this.http.get(PatchURI)
    .pipe(map((product: any)=> {
      if(product?.results) {
        const results = (product.results).map((productData: ProductDetailView, index: number) => {
          if(productData?.cost_in_credits !== 'unknown' && pageCount == '1' && index%2 == 0) {
            productData['cost_in_percentage'] = this.calculatePercentage(productData.cost_in_credits);
            productData['hot_sale_start_date'] = new Date();
            productData['hot_sale_expire'] = this.calculateHotSaleTime();
          }
          const ImgDir = (productData.name).split(' ').join('-');
          var formatProductImg = JSON.parse(JSON.stringify(ProductImg));
          productData['images'] = (formatProductImg[ImgDir]?.length)? formatProductImg[ImgDir]: formatProductImg['Placeholder-Img'];
          return productData;
        })
        product.results = results;
      }
      return product;
    }))
    .subscribe((res: ProductListView) => {
      // console.log(`${this.category} product list `, res);
      this.TempProductData = res;
      this.ProductList = [...this.ProductList, ...res.results];
      if(!currentScrollPosition) return;
      setTimeout(()=> {
        window.scroll(0, currentScrollPosition);
      },100)
    })
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

  /**
   * 
   * @param product 
   * @returns single product image to view on product listing
   */
  getProductImg(product: ProductDetailView) {
    var formatProductImg = JSON.parse(JSON.stringify(ProductImg));
    return product?.images?.length? product?.images[0].url: formatProductImg['Placeholder-Img'][0].url;
  }

  // generate hot sale time over here
  calculateHotSaleTime() {
    const minutes = this.generateRandomMin();
    return  new Date(new Date().getTime() + minutes * 60 * 1000);
  }

  // To generate random minites to build offer expire time
  generateRandomMin() {
    return ([2,4,10,30,50,20, 5, 3, 1].sort((a,b)=>0.5-Math.random()))[2];
  }

  // To generate random offer numbers
  generateRandomOff() {
    return ([3,5,2,6,4].sort((a,b)=>0.5-Math.random()))[2];
  }

  //calculate offer percentage based on random offer number
  calculatePercentage(price: string) {
    const converteToNumPrice = Number(price);
    return (Math.round((((converteToNumPrice/this.generateRandomOff()) - converteToNumPrice)/converteToNumPrice)*100))+'% OFF';
  }
}