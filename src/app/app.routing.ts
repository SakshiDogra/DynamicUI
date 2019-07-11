import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'view-list', loadChildren: './modules/admin/admin-view/admin-view.module#AdminViewModule' },
    { path: 'createview', loadChildren: './modules/admin/create-view/create-view.module#CreateViewModule' },
    { path: 'pre-view', loadChildren: './modules/admin/preview/preview.module#PreViewModule' },
    { path: 'user-view', loadChildren: './modules/user/user-view/user-view.module#UserViewModule' },
    { path: 'user-list', loadChildren: './modules/user/user-list/user-list.module#UserListModule' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouters { }
