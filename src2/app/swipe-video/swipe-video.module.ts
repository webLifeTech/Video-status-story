import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwipeVideoPageRoutingModule } from './swipe-video-routing.module';

import { SwipeVideoPage } from './swipe-video.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwipeVideoPageRoutingModule
  ],
  declarations: [SwipeVideoPage]
})
export class SwipeVideoPageModule {}
