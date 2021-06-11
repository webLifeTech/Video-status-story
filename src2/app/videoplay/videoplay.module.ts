import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoplayPageRoutingModule } from './videoplay-routing.module';

import { VideoplayPage } from './videoplay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoplayPageRoutingModule
  ],
  declarations: [VideoplayPage]
})
export class VideoplayPageModule {}
