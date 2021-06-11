import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoplayPage } from './videoplay.page';

const routes: Routes = [
  {
    path: '',
    component: VideoplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoplayPageRoutingModule {}
