import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagelistPageRoutingModule } from './imagelist-routing.module';

import { ImagelistPage } from './imagelist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagelistPageRoutingModule
  ],
  declarations: [ImagelistPage]
})
export class ImagelistPageModule {}
