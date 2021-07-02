import { Component, Input} from "@angular/core";
import { IThing } from "./IThing";

@Component({
  selector: 'app-product',
  template: ''
})
export class ProductComponentStub {
  @Input()
  public product: IThing;
}