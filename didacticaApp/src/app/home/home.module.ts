import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NumerosComponent } from '../components/numeros/numeros.component';
import { AnimalesComponent } from '../components/animales/animales.component';
import { ColoresComponent } from '../components/colores/colores.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,NumerosComponent,AnimalesComponent,ColoresComponent]
})
export class HomePageModule {}
