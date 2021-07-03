import { Component, OnInit } from '@angular/core';
import { IProduct } from '../IProduct';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-sync-product-list',
  templateUrl: './sync-product-list.component.html',
  styleUrls: ['./sync-product-list.component.css']
})
export class SyncProductListComponent implements OnInit {
  public products: Array<IProduct>;

  constructor(private readonly _productService: ProductService) {
    // this.products = this._productService.getAll();
  }
  ngOnInit(): void { 
    this.products = this._productService.getAll();
  }

}
