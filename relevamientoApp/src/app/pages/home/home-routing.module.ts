import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CosasLindasFeasComponent } from 'src/app/components/cosas-lindas-feas/cosas-lindas-feas.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
