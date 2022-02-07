import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent, ListComponent, EmployeeComponent } from './components';

export const EmployeeRoutes: Routes = [
  {
    path: 'funcionario',
    component: EmployeeComponent,
    children: [
      { path: '', component: FormComponent },
      { path: 'listagem', component: ListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(EmployeeRoutes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
