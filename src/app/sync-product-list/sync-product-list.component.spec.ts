import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductComponentStub } from '../product.component.stub';
import { ProductService } from '../product.service';
import { ProductServiceStub } from '../product.service.stub';

import { SyncProductListComponent } from './sync-product-list.component';

describe('SyncProductListComponent', () => {
  let component: SyncProductListComponent;
  let fixture: ComponentFixture<SyncProductListComponent>;
  let dependencies: { productService: ProductServiceStub };

  function getProducts(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.directive(ProductComponentStub));
  }

  beforeEach(async () => {
    dependencies = {
      productService: new ProductServiceStub()
    };

    await TestBed.configureTestingModule({
      declarations: [SyncProductListComponent, ProductComponentStub],
      providers: [
        { provide: ProductService, useValue: dependencies.productService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncProductListComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    (dependencies.productService.getAll as jasmine.Spy).and.returnValue([
      { name: 'product', number: '1' }
    ]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //
  describe('on initialisation', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });


    it('should fetch all of the products', () => {
      expect(dependencies.productService.getAll).toHaveBeenCalledWith();
    });

    it('should display the products', () => {
      // console.log(fixture.nativeElement);
      fixture.detectChanges();
      expect(getProducts()[0].componentInstance.product).toEqual({
        name: 'product',
        number: '1'
      });

    });

  });

});
