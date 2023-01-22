import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFilterRoutingModule } from './user-filter-routing.module';
import { UserFilterComponent } from './user-filter.component';
import {CoreModule} from "../core/core.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserFilterComponent
  ],
  imports: [
    CommonModule,
    UserFilterRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ],
  exports: [
    UserFilterComponent
  ]
})
export class UserFilterModule { }
