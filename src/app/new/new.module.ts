import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRoutingModule } from './new-routing.module';
import { NewCreateComponent } from './new-create/new-create.component';
import { NewEditComponent } from './new-edit/new-edit.component';
import { NewDeleteComponent } from './new-delete/new-delete.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NewListComponent} from "./new-list/new-list.component";
import { WeatherComponent } from './weather/weather.component';
import { StatiticalComponent } from './statitical/statitical.component';
import { NewDetailsComponent } from './new-details/new-details.component';


@NgModule({
  declarations: [NewListComponent, NewCreateComponent, NewEditComponent, NewDeleteComponent, WeatherComponent, StatiticalComponent, NewDetailsComponent],
    imports: [
        CommonModule,
        NewRoutingModule,
        ReactiveFormsModule
    ]
})
export class NewModule { }
