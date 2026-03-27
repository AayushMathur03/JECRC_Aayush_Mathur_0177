import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { EmployeeList } from './employee/employee-list/employee-list';
import { EmployeeAdd } from './employee/employee-add/employee-add';
import { EmployeeEdit } from './employee/employee-edit/employee-edit';
import { EmployeeView } from './employee/employee-view/employee-view';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'employees', component: EmployeeList, canActivate: [authGuard] },
    { path: 'employees/add', component: EmployeeAdd, canActivate: [authGuard] },
    { path: 'employees/edit/:id', component: EmployeeEdit, canActivate: [authGuard] },
    { path: 'employees/view/:id', component: EmployeeView, canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
