import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IThing } from './IThing';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly _http: HttpClient) { }

  public getAllObservableAsync(): Observable<Array<IThing>> {
    return this._http.get<Array<IThing>>('assets/products1.json');
    //return throwError('error'); 
  }
}

// ToDo: Move to own file


