import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent, SignInComponent } from './components';

export const LoginRoutes: Routes = [
  {
    path: 'login',
    component: SignInComponent,
    children: [{ path: '', component: LoginComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(LoginRoutes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
