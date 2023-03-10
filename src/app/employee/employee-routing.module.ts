import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {AuthGuard} from "../sercurity/auth.guard";
import {EmployeeCreateComponent} from "./employee-create/employee-create.component";

const routes: Routes = [
  {
    path: 'admin/employee',
    children: [
      {path: '', component: EmployeeListComponent, canActivate: [AuthGuard], data:{expectedRole: ['ROLE_ADMIN']}},
      {path: 'create', component: EmployeeCreateComponent, canActivate: [AuthGuard], data:{expectedRole: ['ROLE_ADMIN']}},
      {path: 'update/:employeeId', component: EmployeeEditComponent, canActivate: [AuthGuard], data:{expectedRole: ['ROLE_ADMIN']}}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class EmployeeRoutingModule { }
