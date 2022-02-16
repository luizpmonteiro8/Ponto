import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent, ListComponent, EntryComponent } from './components';

export const EntryRoutes: Routes = [
  {
    path: 'lancamento',
    component: EntryComponent,
    children: [
      { path: '', component: FormComponent },
      { path: 'listagem', component: ListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(EntryRoutes)],
  exports: [RouterModule],
})
export class EntryRoutingModule {}
