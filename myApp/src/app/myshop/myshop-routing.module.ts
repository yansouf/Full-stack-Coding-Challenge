import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyShopComponent } from './myshop.component';
 

const routes: Routes = [
  { path: '',   component: MyShopComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyShopRoutingModule { }
