import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WallpaperlistPageRoutingModule } from './wallpaperlist-routing.module';

import { WallpaperlistPage } from './wallpaperlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WallpaperlistPageRoutingModule
  ],
  declarations: [WallpaperlistPage]
})
export class WallpaperlistPageModule {}
