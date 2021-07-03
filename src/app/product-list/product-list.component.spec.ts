import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductService } from '../product.service';


import { ProductListComponent } from './product-list.component';
import { ProductComponentStub } from '../product.component.stub';
import { TestPromise } from '../_utilities/TestPromise';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';
import { IProduct } from '../IProduct';
import { catchError, take } from 'rxjs/operators';
import { ProductServiceStub } from '../product.service.stub';

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
    // !! This (.createComponent) is when the constructor is called, so mock the observable
    // before here and change the subject to a BehaviorSubject.
    // Maybe subject will work as well.
    let productsSubject = new Subject<Array<IProduct>>(); // BehaviorSubject([{ name: 'product', number: '1' }]);
    (dependencies.productService.getAllObservableAsync as jasmine.Spy).and.returnValue(
      productsSubject.asObservable()
    );
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  
    // });  <----- this ends the beforeEach(() block!!!!!!!




    //fixture.detectChanges();
    // fixture = TestBed.createComponent(ProductListComponent);
    // component = fixture.componentInstance;
    //fixture.detectChanges();


    describe('on initialisation', () => {
      //let productsSubject: Subject<Array<IProduct>>; // TestPromise;


      it('should fetch all of the products', () => {
        fixture.detectChanges();
        expect(dependencies.productService.getAllObservableAsync).toHaveBeenCalledWith();
      });


      describe('when the products have been fetched', () => {

        beforeEach(fakeAsync(() => {
          //productsSubject = new BehaviorSubject([{ name: 'product', number: '1' }]);
          //productsSubject.next(); //[{ name: 'product', number: '1' }]); // .resolve([{ name: 'product', number: '1' }]);
          //productsSubject.pipe().subscribe()
          productsSubject.next([{ name: 'product', number: '1' }]);

          tick();

          fixture.detectChanges();
        }));

        it('should display the products', () => {
          // console.log(fixture.nativeElement);
          // console.log(getProducts()[0].componentInstance.product);
          //fixture.detectChanges();
          expect(getProducts()[0].componentInstance.product).toEqual({
            name: 'prodct', //<-- should fail here
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

      //       productsSubject.reject('error!');
      //     }));
      //     it('should log the error', () => {
      //       expect(console.log).toHaveBeenCalledWith('error!');
      //     });
      //   });
    });
  });
});
