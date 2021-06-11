import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideolistPage } from './videolist.page';

const routes: Routes = [
  {
    path: '',
    component: VideolistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideolistPageRoutingModule {}
