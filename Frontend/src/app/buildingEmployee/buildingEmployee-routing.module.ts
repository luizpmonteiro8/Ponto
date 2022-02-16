import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent, ListComponent, BuildingEmployeeComponent } from './components';

export const BuildingEmployeeRoutes: Routes = [
  {
    path: 'funcionarioconstrucao',
    component: BuildingEmployeeComponent,
    children: [{ path: '', component: BuildingEmployeeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(BuildingEmployeeRoutes)],
  exports: [RouterModule],
})
export class BuildingEmployeeRoutingModule {}
