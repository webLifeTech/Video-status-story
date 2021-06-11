import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatussaverPage } from './statussaver.page';

const routes: Routes = [
  {
    path: '',
    component: StatussaverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatussaverPageRoutingModule {}
