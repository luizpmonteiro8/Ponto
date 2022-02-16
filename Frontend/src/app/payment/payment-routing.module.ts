import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentComponent, EmployeeListComponent } from './components';

export const PaymentRoutes: Routes = [
  {
    path: 'salario',
    component: PaymentComponent,
    children: [{ path: '', component: PaymentComponent }],
  },
  {
    path: 'salario/listagem',
    component: EmployeeListComponent,
    children: [{ path: '', component: EmployeeListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(PaymentRoutes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
