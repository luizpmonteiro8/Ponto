import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MenuModule } from './menu';
import { LoginModule, LoginRoutingModule, SignupModule, SignUpRoutingModule } from './authentication';
import { JobRoutingModule, JobModule } from './job';
import { EmployeeRoutingModule, EmployeeModule } from './employee';
import { BuildingRoutingModule, BuildingModule } from './building';
import { BuildingEmployeeModule, BuildingEmployeeRoutingModule } from './buildingEmployee';
import { EntryModule, EntryRoutingModule } from './entry';
import { PaymentModule, PaymentRoutingModule } from './payment';

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
    BuildingModule,
    BuildingRoutingModule,
    BuildingEmployeeModule,
    BuildingEmployeeRoutingModule,
    EntryModule,
    EntryRoutingModule,
    PaymentModule,
    PaymentRoutingModule,

    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
