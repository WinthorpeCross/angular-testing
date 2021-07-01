import { Injectable } from '@angular/core';
import { IProduct } from './IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  public getAll(): Array<IProduct> {
    return [
      {
        name: 'Product 1',
        number: '1'
      }
    ];
  }

  public getAllAsync(): Array<IProduct> {
    return [
      {
        name: 'Product 1',
        number: '1'
      }
    ];
  }
}

// ToDo: Move to own file


