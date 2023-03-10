import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EntitiesListComponent} from "../entities/entities-list/entities-list.component";
import {AuthGuard} from "../sercurity/auth.guard";
import {ContactComponent} from "./contact/contact.component";


const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CageRoutingModule { }
