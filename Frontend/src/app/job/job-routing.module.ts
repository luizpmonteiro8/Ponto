import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent, ListComponent, JobComponent } from './components';

export const JobRoutes: Routes = [
  {
    path: 'cargo',
    component: JobComponent,
    children: [
      { path: '', component: FormComponent },
      { path: 'listagem', component: ListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(JobRoutes)],
  exports: [RouterModule],
})
export class JobRoutingModule {}
