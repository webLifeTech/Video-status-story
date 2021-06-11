import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WallpapermodalPage } from './wallpapermodal.page';

const routes: Routes = [
  {
    path: '',
    component: WallpapermodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WallpapermodalPageRoutingModule {}
