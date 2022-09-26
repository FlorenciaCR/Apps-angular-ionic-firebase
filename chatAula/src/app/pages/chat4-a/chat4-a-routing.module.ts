import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Chat4APage } from './chat4-a.page';

const routes: Routes = [
  {
    path: '',
    component: Chat4APage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Chat4APageRoutingModule {}
