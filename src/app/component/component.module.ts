import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { Error404Component } from './error404/error404.component';
import {EntitiesModule} from "../entities/entities.module";
import {RouterModule} from "@angular/router";
import { ContactComponent } from './contact/contact.component';
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [FooterComponent, HeaderComponent, Error404Component, ContactComponent],
    imports: [
        CommonModule,
        EntitiesModule,
        RouterModule,
        ReactiveFormsModule
    ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ContactComponent
  ],
})
export class ComponentModule { }
