import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatussaverPageRoutingModule } from './statussaver-routing.module';

import { StatussaverPage } from './statussaver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatussaverPageRoutingModule
  ],
  declarations: [StatussaverPage]
})
export class StatussaverPageModule {}
