import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagelistPage } from './imagelist.page';

const routes: Routes = [
  {
    path: '',
    component: ImagelistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagelistPageRoutingModule {}
