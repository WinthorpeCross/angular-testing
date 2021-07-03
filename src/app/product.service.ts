import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from './IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly _http: HttpClient) { }

  public getAllObservableAsync(): Observable<Array<IProduct>> {
    return this._http.get<Array<IProduct>>('assets/products1.json');
    //return throwError('error'); 
  }

  public getAll(): Array<IProduct> {
    return [
      {
        name: 'Product 1',
        number: '1'
      }
    ];
  }
}



