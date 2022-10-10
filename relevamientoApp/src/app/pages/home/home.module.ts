import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { CosasLindasFeasComponent } from 'src/app/components/cosas-lindas-feas/cosas-lindas-feas.component';
import { PerfilComponent } from 'src/app/components/perfil/perfil.component';
import { GraficosComponent } from 'src/app/components/graficos/graficos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage,CosasLindasFeasComponent,PerfilComponent,GraficosComponent]
})
export class HomePageModule {}
