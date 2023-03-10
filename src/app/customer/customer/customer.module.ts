import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [CustomerListComponent],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class CustomerModule { }
