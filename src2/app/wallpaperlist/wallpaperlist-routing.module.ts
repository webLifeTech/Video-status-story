import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WallpaperlistPage } from './wallpaperlist.page';

const routes: Routes = [
  {
    path: '',
    component: WallpaperlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WallpaperlistPageRoutingModule {}
