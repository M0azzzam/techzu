import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailRoutingModule } from './user-detail-routing.module';
import { UserDetailComponent } from './component/user-detail-container/user-detail.component';
import { UserDetailUiComponent } from './component/user-detail-ui/user-detail-ui.component';
import {MatTableModule} from "@angular/material/table";
import {CoreModule} from "../core/core.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserDetailComponent,
    UserDetailUiComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    CoreModule,
    UserDetailRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserDetailModule { }
