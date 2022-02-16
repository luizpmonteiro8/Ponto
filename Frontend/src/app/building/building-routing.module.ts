import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent, ListComponent, BuildingComponent } from './components';

export const BuildingRoutes: Routes = [
  {
    path: 'construcao',
    component: BuildingComponent,
    children: [
      { path: '', component: FormComponent },
      { path: 'listagem', component: ListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(BuildingRoutes)],
  exports: [RouterModule],
})
export class BuildingRoutingModule {}
