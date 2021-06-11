import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmcategoryPageRoutingModule } from './smcategory-routing.module';

import { SmcategoryPage } from './smcategory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmcategoryPageRoutingModule
  ],
  declarations: [SmcategoryPage]
})
export class SmcategoryPageModule {}
