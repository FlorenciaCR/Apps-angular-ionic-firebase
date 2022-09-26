import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Chat4BPage } from './chat4-b.page';

const routes: Routes = [
  {
    path: '',
    component: Chat4BPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Chat4BPageRoutingModule {}
