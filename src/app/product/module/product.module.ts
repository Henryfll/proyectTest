import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../components/product/product.component';
import { ROUTE_PRODUCTS } from '../routes/product-rounting.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTE_PRODUCTS),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
