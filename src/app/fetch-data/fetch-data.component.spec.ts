import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchDataComponent } from './fetch-data.component';

describe('FetchDataComponent', () => {
  // let component: FetchDataComponent;
  // let fixture: ComponentFixture<FetchDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchDataComponent ]
    })
    .compileComponents();
  });

  it('should create the fetch component', () => {
    const fixture = TestBed.createComponent(FetchDataComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(FetchDataComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });


});
