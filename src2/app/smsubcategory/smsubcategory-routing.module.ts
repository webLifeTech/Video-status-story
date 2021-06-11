import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmsubcategoryPage } from './smsubcategory.page';

const routes: Routes = [
  {
    path: '',
    component: SmsubcategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsubcategoryPageRoutingModule {}
