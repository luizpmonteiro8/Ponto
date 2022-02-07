import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MenuModule } from './menu';
import { LoginModule, LoginRoutingModule, SignupModule, SignUpRoutingModule } from './authentication';
import { JobRoutingModule, JobModule } from './job';
import { EmployeeRoutingModule, EmployeeModule } from './employee';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MenuModule,
    LoginModule,
    LoginRoutingModule,
    SignupModule,
    SignUpRoutingModule,
    JobModule,
    JobRoutingModule,
    EmployeeModule,
    EmployeeRoutingModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
