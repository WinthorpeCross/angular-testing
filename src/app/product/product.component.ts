import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../IProduct';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input()
  public product: IProduct;

  constructor() { }

  ngOnInit(): void { }
}
