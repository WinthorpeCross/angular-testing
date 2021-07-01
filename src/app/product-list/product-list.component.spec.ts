import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductService } from '../product.service';
import { ProductServiceStub } from '../product.service.stub';
import { ProductComponent } from '../product/product.component';

import { ProductListComponent } from './product-list.component';
import { ProductComponentStub } from '../product.component.stub';
import { TestPromise } from '../_utilities/TestPromise';

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
    // (dependencies.productService.getAll as jasmine.Spy).and.returnValue([
    //   { name: 'product', number: '1' }
    // ]);
  });

  // it('should fetch all of the products', () => {
  //   expect(dependencies.productService.getAll).toHaveBeenCalledWith();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  describe('on initialisation', () => {
    let getProductsPromise: TestPromise;

    beforeEach(() => {
      getProductsPromise = new TestPromise();
      (dependencies.productService.getAllAsync as jasmine.Spy).and.returnValue(
        getProductsPromise.promise
      );
      fixture.detectChanges();
    });

    it('should fetch all of the products', () => {
      expect(dependencies.productService.getAllAsync).toHaveBeenCalledWith();
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


    describe('when the products have been fetched', () => {
      beforeEach(fakeAsync(() => {
        getProductsPromise.resolve([{ name: 'product', number: '1' }]);

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

    describe('when something goes wrong when fetching the products', () => {
      // In our beforeEach block, we make it async (we don’t need fakeAsync this time or detectChanges this time because we are not testing the template). Before we reject our promise, we need to spy on the console.log method. Luckily for us, we can spy on static methods using spyOn.
      beforeEach(waitForAsync(() => {
        spyOn(console, 'log');
    
        getProductsPromise.reject('error!');
      }));
      it('should log the error', () => {
        expect(console.log).toHaveBeenCalledWith('error!');
      });
    });
  });
});
