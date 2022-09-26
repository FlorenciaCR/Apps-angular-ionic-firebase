import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Chat4APageRoutingModule } from './chat4-a-routing.module';

import { Chat4APage } from './chat4-a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Chat4APageRoutingModule
  ],
  declarations: [Chat4APage]
})
export class Chat4APageModule {}
