import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmcreatePageRoutingModule } from './smcreate-routing.module';

import { SmcreatePage } from './smcreate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmcreatePageRoutingModule
  ],
  declarations: [SmcreatePage]
})
export class SmcreatePageModule {}
