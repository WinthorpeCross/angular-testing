import { Component, OnInit } from '@angular/core';
import { IProduct } from '../IProduct';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products: Array<IProduct>;

  constructor(private readonly _productService: ProductService) {}

  ngOnInit(): void {
    this.products = this._productService.getAll();
  }

  // public async getAllProducts(): Promise<void> {
  //   const allProducts: Array<IProduct> = await this._productService.getAllAsync();
  
  //   this.products = allProducts;
  // }

}