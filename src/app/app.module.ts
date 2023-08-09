import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleSearchComponent } from './vehicle-search/vehicle-search.component';
import { LoginComponent } from './login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';

// import { AngularMaterialModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { AddvehicleComponent } from './addvehicle/addvehicle.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SaleformComponent } from './saleform/saleform.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { ViewcustomerComponent } from './viewcustomer/viewcustomer.component';
import { RepairformComponent } from './repairform/repairform.component';
import { SalebyModelComponent } from './saleby-model/saleby-model.component';
import { SalelcComponent } from './salelc/salelc.component';
import { MatSortModule } from '@angular/material/sort';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { SaleMonthlyComponent } from './sale-monthly/sale-monthly.component';
import { ReportsComponent } from './reports/reports.component';
import { SalebymanufacturerComponent } from './salebymanufacturer/salebymanufacturer.component';
import { CustomerIncomeComponent } from './customer-income/customer-income.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ViewrepairComponent } from './viewrepair/viewrepair.component';

@NgModule({
  declarations: [
    AppComponent,
    VehicleDetailComponent,
    VehicleSearchComponent,
    LoginComponent,
    AddvehicleComponent,
    SaleformComponent,
    AddcustomerComponent,
    ViewcustomerComponent,
    RepairformComponent,
    SalebyModelComponent,
    SalelcComponent,
    SalesreportComponent,
    SaleMonthlyComponent,
    ReportsComponent,
    SalebymanufacturerComponent,
    CustomerIncomeComponent,
    CustomerDetailComponent,
    ViewrepairComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
