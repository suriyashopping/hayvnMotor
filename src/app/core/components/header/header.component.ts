import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MenuList } from "@HayvnShared/model/menu-list.model";
import { Store } from "@ngrx/store";
import { ProductDetail } from "@HayvnStore/model/product-detail.model";
import { BehaviorSubject, Observable, Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ProductDetailView } from '@HayvnApp/shared/model/product-detail-view.model';

@Component({
  selector: 'hayvn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  MAINMENULIST: MenuList[] = [{path: 'starships', text: 'starships'}, {path: 'vehicles', text: 'vehicles'}, {path: '', text: 'all products'}];
  value: string = '';
  userCart$!: Observable<ProductDetail>;
  productList: any;
  showSearchResult: boolean = false;
  private search$ = new BehaviorSubject('');
  private destroy$ = new Subject<void>();
  searchProductResult: ProductDetailView[] = [];
  navbarCollapsed = true;

  @ViewChild('searchResult') searchResult: any;

  constructor(private store: Store<{cart: ProductDetail, productList: any}>) {
    this.userCart$ = this.store.select('cart');
    this.store.select('productList').subscribe(res=> {
      this.productList = res.AllProductItems
    });
  }

  ngOnInit(): void {
    this.search$.pipe(
      // debounce for 2sec
      debounceTime(2000),
      // only emit if the value has actually changed
      distinctUntilChanged(),
      // unsubscribe when the provided observable emits
      takeUntil(this.destroy$)
    ).subscribe((search) => this.searchProductList(search)); 
  }

  searchProductList(searchText: string): void {
    // filter from store product data
    searchText = searchText.toLowerCase();
    // console.log(searchText,' ====> ', this.productList);
    this.searchProductResult = this.productList.filter((productObj: ProductDetailView) => {
      return (productObj.name).toLowerCase().indexOf(searchText) > -1 || (productObj.model).toLowerCase().indexOf(searchText) > -1
      
    })
    // console.log(this.searchProductResult);
    
  }

  /**
   * call behaviour subject to create observable 
   * to make delay and debounch the user input value
   * @param event 
   */
  searchProduct(searchQuery: string, event: Event) {
    this.search$.next(searchQuery);
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
   * @param event to handle outside click and 
   * close product search list option UI while click ouside of search list
   */
  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.searchResult.nativeElement.contains(event.target)) {
      this.showSearchResult = false;
    }
  }

  // Unsubscribe to clear garbage collection to avoid memory leakage
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}