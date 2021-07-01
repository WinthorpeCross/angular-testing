import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from '../IProduct';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  //public products: Array<IProduct>;
  public productsSubject: Subject<Array<IProduct>> = new Subject();

  constructor(private readonly _productService: ProductService) { }

  ngOnInit(): void {
    //this.products = this._productService.getAll(); //synchronous method
    this.getAllProducts();
  }

  public async getAllProducts(): Promise<void> {
    try {
      const allProducts: Array<IProduct> = await this._productService.getAllAsync();
      //this.products = allProducts;
      this.productsSubject.next(allProducts);
    } catch (e) {
      console.log(e);
    }
  }

}
