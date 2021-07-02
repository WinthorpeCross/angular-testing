import { Component, Input, OnInit } from '@angular/core';
import { IThing } from '../IThing';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input()
  public product: IThing;

  constructor() { }

  ngOnInit(): void { }
}
