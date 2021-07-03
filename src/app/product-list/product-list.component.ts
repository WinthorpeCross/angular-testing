import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, share, take } from 'rxjs/operators';

import { IProduct } from '../IProduct';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent { // implements OnInit {
  //public products: Array<IProduct>;
  //public errorObjectPipe = null;
  public errorObjectSubject = null;
  public productsSubject: Subject<Array<IProduct>> = new Subject();
  products$: Observable<Array<IProduct>>

  constructor(private readonly _productService: ProductService) {
    this._getAllProducts();
  }

  //ngOnInit(): void { }

  private async _getAllProducts(): Promise<void> {
    this._productService.getAllObservableAsync()
      .pipe(take(1),
        catchError(err => {
          this.errorObjectSubject = err;
          return throwError(err);
        })
      ).subscribe(result => { this.productsSubject.next(result) });
  }

  // private _getAllProducts(): Observable<Array<IProduct>> {
  //   return this._productService.getAllObservableAsyncPipe()
  //     .pipe((take(1), //share()
  //       catchError(err => {
  //         this.errorObjectPipe = err;
  //         return throwError(err);
  //       }))
  //     );
  // }

  // private _getAllProducts() {
  //   this._productService.getAllObservableAsync.subscribe(() => {
  //     this.productsSubject.next();
  //   });

  // }

  // public async getAllProducts(): Promise<void> {
  //   try {
  //     const allProducts: Array<IProduct> = await this._productService.getAllAsync();
  //     //this.products = allProducts;
  //     this.productsSubject.next(allProducts);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

}
