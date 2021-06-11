import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmcreatePage } from './smcreate.page';

const routes: Routes = [
  {
    path: '',
    component: SmcreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmcreatePageRoutingModule {}
