import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextcreationPage } from './textcreation.page';

const routes: Routes = [
  {
    path: '',
    component: TextcreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextcreationPageRoutingModule {}
