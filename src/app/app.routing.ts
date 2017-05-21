import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Login } from './login/login.component';
import { AuthGuard } from './auth.service';
import { Categorys } from './Category/category.component';
import { Countrys } from './country/country.component';
import { BaiViet } from './baiviet/baiviet.component';
import { Members } from './member/member.component';
const routes: Routes = [

    {
        path: '',
        redirectTo: 'category', pathMatch: 'full'
    },
    {
        path: 'loai',
        component: Categorys,
        canActivate: [AuthGuard]
    },
    {
        path: 'thanh-pho',
        component: Countrys,
        canActivate: [AuthGuard]
    },
    {
        path: 'bai-viet',
        component: BaiViet,
        canActivate: [AuthGuard]
    },
     {
        path: 'doi-ngu',
        component: Members,
        canActivate: [AuthGuard]
       
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: '**',
        redirectTo:'loai',
    },
   

];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });