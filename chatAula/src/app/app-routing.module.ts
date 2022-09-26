import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'login', 
    component:LoginComponent 
  },
  {
    path: 'chat4-a',
    loadChildren: () => import('./pages/chat4-a/chat4-a.module').then( m => m.Chat4APageModule)
  },
  {
    path: 'chat4-b',
    loadChildren: () => import('./pages/chat4-b/chat4-b.module').then( m => m.Chat4BPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
