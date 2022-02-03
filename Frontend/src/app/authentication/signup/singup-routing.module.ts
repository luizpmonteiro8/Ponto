import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent, AccessComponent } from './components';

export const SignUpRoutes: Routes = [
  {
    path: 'SignUp',
    component: AccessComponent,
    children: [{ path: '', component: SignupComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(SignUpRoutes)],
  exports: [RouterModule],
})
export class SignUpRoutingModule {}
