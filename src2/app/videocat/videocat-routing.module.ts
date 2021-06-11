import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideocatPage } from './videocat.page';

const routes: Routes = [
  {
    path: '',
    component: VideocatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideocatPageRoutingModule {}
