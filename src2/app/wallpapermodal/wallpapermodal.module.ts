import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WallpapermodalPageRoutingModule } from './wallpapermodal-routing.module';

import { WallpapermodalPage } from './wallpapermodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WallpapermodalPageRoutingModule
  ],
  declarations: [WallpapermodalPage]
})
export class WallpapermodalPageModule {}
