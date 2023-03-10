
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {NewListComponent} from "./new/new-list/new-list.component";
import {ContactComponent} from "./component/contact/contact.component";
import {CageListComponent} from "./cage/cage-list/cage-list.component";

const routes: Routes = [
  {path: 'contact', component: ContactComponent},
  {path: '', component: NewListComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
