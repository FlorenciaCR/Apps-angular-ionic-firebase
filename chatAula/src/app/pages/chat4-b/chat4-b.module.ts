import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Chat4BPageRoutingModule } from './chat4-b-routing.module';

import { Chat4BPage } from './chat4-b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Chat4BPageRoutingModule
  ],
  declarations: [Chat4BPage]
})
export class Chat4BPageModule {}
