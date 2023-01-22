import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './component/user-container/user.component';
import {UserRoutingModule} from "./user-routing.module";
import {MatTableModule} from "@angular/material/table";
import { UserListComponent } from './component/user-list/user-list.component';
import {UserFilterModule} from "../user-filter/user-filter.module";
import {CoreModule} from "../core/core.module";



@NgModule({
  declarations: [
    UserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoreModule,
    UserFilterModule
  ]
})
export class UserModule { }
