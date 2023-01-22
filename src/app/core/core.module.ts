import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../layout/header/header.component";
import {MaterialModule} from "../material/material.module";
import {ContentComponent} from "../layout/content/content.component";
import {RouterOutlet} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {AddressDetailPopupComponent} from "../layout/address-detail-popup/address-detail-popup.component";




@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
    AddressDetailPopupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterOutlet,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    MaterialModule,
    ContentComponent,
    AddressDetailPopupComponent
  ]
})
export class CoreModule { }
