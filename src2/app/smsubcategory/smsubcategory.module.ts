import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmsubcategoryPageRoutingModule } from './smsubcategory-routing.module';

import { SmsubcategoryPage } from './smsubcategory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmsubcategoryPageRoutingModule
  ],
  declarations: [SmsubcategoryPage]
})
export class SmsubcategoryPageModule {}
