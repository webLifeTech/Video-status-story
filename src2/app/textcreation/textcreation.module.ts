import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextcreationPageRoutingModule } from './textcreation-routing.module';

import { TextcreationPage } from './textcreation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextcreationPageRoutingModule
  ],
  declarations: [TextcreationPage]
})
export class TextcreationPageModule {}
