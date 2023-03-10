import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EntitiesListComponent} from "./entities-list/entities-list.component";
import {AuthGuard} from "../sercurity/auth.guard";
import {EntitiesEditComponent} from "./entities-edit/entities-edit.component";

import {Error404Component} from "../component/error404/error404.component";
import {EntitiesDeleteComponent} from "./entities-delete/entities-delete.component";
import {EntitiesCreateComponent} from "./entities-create/entities-create.component";



const routes: Routes = [
  {path:'employee/entities',component: EntitiesListComponent, canActivate: [AuthGuard], data:{expectedRole: ['ROLE_EMPLOYEE', 'ROLE_ADMIN']}},
  {path:'employee/entities/update/:id',component: EntitiesEditComponent, canActivate: [AuthGuard], data:{expectedRole: ['ROLE_EMPLOYEE', 'ROLE_ADMIN']}},
  {path:'employee/entities/delete/:id',component: EntitiesDeleteComponent, canActivate: [AuthGuard], data:{expectedRole: ['ROLE_EMPLOYEE', 'ROLE_ADMIN']}},
  {path:'employee/entities/create',component: EntitiesCreateComponent, canActivate: [AuthGuard], data:{expectedRole: ['ROLE_EMPLOYEE', 'ROLE_ADMIN']}},
  {path: '404', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class EntitiesRoutingModule { }
