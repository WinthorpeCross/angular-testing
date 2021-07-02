import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductService } from '../product.service';
import { ProductServiceStub } from '../product.service.stub';

import { ProductListComponent } from './product-list.component';
import { ProductComponentStub } from '../product.component.stub';
import { TestPromise } from '../_utilities/TestPromise';
import { of, Subject, throwError } from 'rxjs';
import { IThing } from '../IThing';
import { catchError, take } from 'rxjs/operators';

describe('ProductListComponent', () => {
  let component: ProductListComponent,
    fixture: ComponentFixture<ProductListComponent>,
    dependencies: { productService: ProductServiceStub };

  function getProducts(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.directive(ProductComponentStub));
  }

  beforeEach(async () => {
    dependencies = {
      productService: new ProductServiceStub()
    };
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent, ProductComponentStub],
      providers: [
        { provide: ProductService, useValue: dependencies.productService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  describe('on initialisation', () => {
    let getProductsSubject: Subject<Array<IThing>>; // TestPromise;

    beforeEach(() => {
      getProductsSubject = new Subject();
      (dependencies.productService.getAllObservableAsync as jasmine.Spy).and.returnValue(
        getProductsSubject.asObservable()
      );
      fixture.detectChanges();
    });

    it('should fetch all of the products', () => {
      //fixture.detectChanges();
      expect(dependencies.productService.getAllObservableAsync).toHaveBeenCalledWith();
    });

  
    describe('when the products have been fetched', () => {

      beforeEach(fakeAsync(() => {
        getProductsSubject.next([]); //[{ name: 'product', number: '1' }]); // .resolve([{ name: 'product', number: '1' }]);
        //getProductsSubject.pipe().subscribe()

        tick();

        fixture.detectChanges();
      }));

      it('should display the products', () => {
        expect(getProducts()[0].componentInstance.product).toEqual({
          name: 'product',
          number: '1'
        });
      });
    });

    


    // tests synchronous code
    // describe('on initialisation', () => {
    //   beforeEach(() => {
    //     fixture.detectChanges();
    //   });

    //   it('should create component', () => {
    //     expect(component).toBeTruthy();
    //   });

    //   it('should fetch all of the products', () => {
    //     expect(dependencies.productService.getAll).toHaveBeenCalledWith();
    //   });

    //   it('should display the products', () => {
    //     expect(getProducts()[0].componentInstance.product).toEqual({
    //       name: 'product',
    //       number: '1'
    //     });
    //   });
  //   describe('when something goes wrong when fetching the products', () => {
  //     // In our beforeEach block, we make it async (we don’t need fakeAsync this time or detectChanges this time because we are not testing the template). Before we reject our promise, we need to spy on the console.log method. Luckily for us, we can spy on static methods using spyOn.
  //     beforeEach(waitForAsync(() => {
  //       spyOn(console, 'log');
    
  //       getProductsSubject.reject('error!');
  //     }));
  //     it('should log the error', () => {
  //       expect(console.log).toHaveBeenCalledWith('error!');
  //     });
  //   });
   });
});
