import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmcategoryPage } from './smcategory.page';

const routes: Routes = [
  {
    path: '',
    component: SmcategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmcategoryPageRoutingModule {}
