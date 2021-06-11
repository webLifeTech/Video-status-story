import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextlistPageRoutingModule } from './textlist-routing.module';

import { TextlistPage } from './textlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextlistPageRoutingModule
  ],
  declarations: [TextlistPage]
})
export class TextlistPageModule {}
