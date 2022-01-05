import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { ShowDepComponent } from './department/show-dep/show-dep.component';
import { AddEditDepComponent } from './department/add-edit-dep/add-edit-dep.component';
import { EmployeeComponent } from './employee/employee.component';
import { ShowEmpComponent } from './employee/show-emp/show-emp.component';
import { AddEditEmpComponent } from './employee/add-edit-emp/add-edit-emp.component';
import { SharedService } from './shared.service';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddPrintDetailsComponent } from './employee/add-print-details/add-print-details.component';
import { PrintEmployeeComponent } from './print-employee/print-employee.component';
import { NgxPrintModule } from 'ngx-print';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { RestoreEmployeeComponent } from './restore-employee/restore-employee.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { httpIntecptorProviders } from './httpIntecptorIndex';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginService } from './login.service';
import { UtilitiesService } from './utilities.service';
import { CookieService } from 'ngx-cookie-service';
import { RegisterUserComponent } from './register-user/register-user.component';



@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    ShowDepComponent,
    AddEditDepComponent,
    EmployeeComponent,
    ShowEmpComponent,
    AddEditEmpComponent,
    LoginComponent,
    AppNavbarComponent,
    AddPrintDetailsComponent,
    PrintEmployeeComponent,
    RestoreEmployeeComponent,
    SpinnerComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPrintModule,
    ConfirmDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [SharedService, httpIntecptorProviders, LoginService, UtilitiesService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
