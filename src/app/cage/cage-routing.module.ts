import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CageCreateComponent} from "./cage-create/cage-create.component";
import {AuthGuard} from "../sercurity/auth.guard";
import {CageEditComponent} from "./cage-edit/cage-edit.component";
import {CageListComponent} from "./cage-list/cage-list.component";

const routes: Routes = [
    {path:'employee/cage',component: CageListComponent, canActivate: [AuthGuard], data:{expectedRole: ['ROLE_EMPLOYEE', 'ROLE_ADMIN']}},
  {path: 'employee/cage/create', component: CageCreateComponent, canActivate:[AuthGuard], data:{expectedRole: ['ROLE_EMPLOYEE', 'ROLE_ADMIN']}},
  {path: 'employee/cage/edit/:id', component: CageEditComponent, canActivate:[AuthGuard], data:{expectedRole: ['ROLE_EMPLOYEE', 'ROLE_ADMIN']}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CageRoutingModule { }
