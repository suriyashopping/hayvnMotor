import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment as Env } from "@HayvnEnv/environment";
import { Apiroute } from "@HayvnShared/constant/apiroute";
import { ProductDetailView } from '@HayvnApp/shared/model/product-detail-view.model';
import { ProductDetailAPIList } from "@HayvnStore/model/product-detail.model";
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  loadProductList(url: any): Observable<ProductDetailAPIList> {
    // const ProductDetailList = Apiroute.ProductListBycategory.replace('<<categoryName>>', 'vehicles').replace('<<pageCount>>', '1');
    // if(typeof url === 'string') {
      const PatchURI = `${Env.apiUrl}/${url}`;
      return (this.http.get<ProductDetailAPIList>(PatchURI));
    // }
    //  else {
    //   return of([]);
    // }
  }

  loadMultiProductList(): Observable<ProductDetailAPIList[]> {
    const ProductDetailList = Apiroute.ProductListBycategory.replace('<<categoryName>>', 'vehicles').replace('<<pageCount>>', '1');
    let PatchURI = `${Env.apiUrl}/${ProductDetailList}`;
    return forkJoin(this.http.get<ProductDetailAPIList>(PatchURI), this.http.get<ProductDetailAPIList>(PatchURI));
  }
}
