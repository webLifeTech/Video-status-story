import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideocatPageRoutingModule } from './videocat-routing.module';

import { VideocatPage } from './videocat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideocatPageRoutingModule
  ],
  declarations: [VideocatPage]
})
export class VideocatPageModule {}
