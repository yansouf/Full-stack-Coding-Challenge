import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//import { MyGuard } from './shared/my.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  //{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [MyGuard]},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), },
  { path: 'myshop', loadChildren: () => import('./myshop/myshop.module').then(m => m.MyShopModule), },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
