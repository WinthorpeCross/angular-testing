import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { SyncProductListComponent } from './sync-product-list/sync-product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FetchDataComponent,
    ProductListComponent,
    ProductComponent,
    SyncProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
