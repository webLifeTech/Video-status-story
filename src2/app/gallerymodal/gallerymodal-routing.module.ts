import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GallerymodalPage } from './gallerymodal.page';

const routes: Routes = [
  {
    path: '',
    component: GallerymodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GallerymodalPageRoutingModule {}
