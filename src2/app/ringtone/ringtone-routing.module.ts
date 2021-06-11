import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RingtonePage } from './ringtone.page';

const routes: Routes = [
  {
    path: '',
    component: RingtonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RingtonePageRoutingModule {}
