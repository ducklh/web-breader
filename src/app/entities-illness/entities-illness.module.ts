import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntitiesIllnessRoutingModule } from './entities-illness-routing.module';
import { EnititiesIllnessListComponent } from './enitities-illness-list/enitities-illness-list.component';
import { EntitiesIllnessCreateComponent } from './entities-illness-create/entities-illness-create.component';
import { EntitiesIllnessEditComponent } from './entities-illness-edit/entities-illness-edit.component';
import { EntitiesIllnessDeleteComponent } from './entities-illness-delete/entities-illness-delete.component';
import {EntitiesRoutingModule} from "../entities/entities-routing.module";


@NgModule({
  declarations: [EnititiesIllnessListComponent, EntitiesIllnessCreateComponent, EntitiesIllnessEditComponent, EntitiesIllnessDeleteComponent],
  imports: [
    CommonModule,
    EntitiesIllnessRoutingModule,
    EntitiesRoutingModule,
  ]
})
export class EntitiesIllnessModule { }
