import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MyShopComponent } from './myshop.component'; 
import { MatModule } from '../mat.module';
import { MyShopRoutingModule } from './myshop-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyShopComponent, 
  ],
  imports: [
    CommonModule, 
    MatModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    MyShopRoutingModule
  ]
})
export class MyShopModule { }
