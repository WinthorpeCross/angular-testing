import { Component, Input} from "@angular/core";
import { IProduct } from "./IProduct";

@Component({
  selector: 'app-product',
  template: ''
})
export class ProductComponentStub {
  @Input()
  public product: IProduct;
}