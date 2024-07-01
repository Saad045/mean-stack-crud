import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrudComponent } from './crud/crud.component';

// const routes: Routes = [];
const routes: Routes = [
  { path: '', redirectTo: 'crud', pathMatch: 'full' },
  // {path: 'Crud',loadChildren: './crud/index.module#CrudModule'},
  { 
    path: 'crud',
    loadChildren: () => import('./crud/index.module').then(x => x.CrudModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routing: ModuleWithProviders = RouterModule.forRoot(routes);







