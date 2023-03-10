import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {SecurityModule} from "./sercurity/security.module";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EntitiesModule} from "./entities/entities.module";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {EntitiesService} from "./service/entities.service";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { authInterceptorProviders } from './sercurity/auth.interceptor ';
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { ComponentModule } from './component/component.module';
import {EmployeeModule} from "./employee/employee.module";
import {NewModule} from "./new/new.module";
import {NewsService} from "./service/news.service";
import {CageModule} from "./cage/cage.module";
import { WeatherComponent } from './weather/weather.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],

  providers: [
    EntitiesService,
    authInterceptorProviders,
    NewsService
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    EntitiesModule,
    CageModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ComponentModule,
    AppRoutingModule,
    SecurityModule,
    EmployeeModule,
    NewModule,
    CageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
