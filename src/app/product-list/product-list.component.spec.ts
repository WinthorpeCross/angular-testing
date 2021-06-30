import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductService } from '../product.service';
import { ProductServiceStub } from '../product.service.stub';
import { ProductComponent } from '../product/product.component';

import { ProductListComponent } from './product-list.component';
import { ProductComponentStub } from '../product.component.stub';

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
    (dependencies.productService.getAll as jasmine.Spy).and.returnValue([
      { name: 'product', number: '1' }
    ]);
  });

  // it('should fetch all of the products', () => {
  //   expect(dependencies.productService.getAll).toHaveBeenCalledWith();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('on initialisation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should fetch all of the products', () => {
      expect(dependencies.productService.getAll).toHaveBeenCalledWith();
    });

    it('should display the products', () => {
      expect(getProducts()[0].componentInstance.product).toEqual({
        name: 'product',
        number: '1'
      });
    });
  });
});
