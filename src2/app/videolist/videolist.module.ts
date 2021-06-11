import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideolistPageRoutingModule } from './videolist-routing.module';

import { VideolistPage } from './videolist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideolistPageRoutingModule
  ],
  declarations: [VideolistPage]
})
export class VideolistPageModule {}
