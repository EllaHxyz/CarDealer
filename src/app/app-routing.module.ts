import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleSearchComponent } from './vehicle-search/vehicle-search.component';
import { LoginComponent } from './login/login.component';
import { AddvehicleComponent } from './addvehicle/addvehicle.component';
import { SaleformComponent } from './saleform/saleform.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { ViewcustomerComponent } from './viewcustomer/viewcustomer.component';
import { RepairformComponent } from './repairform/repairform.component';

//import report component
import { SalebyModelComponent } from './saleby-model/saleby-model.component';
import { SalelcComponent } from './salelc/salelc.component';
import { SalesreportComponent } from './salesreport/salesreport.component';
import { SaleMonthlyComponent } from './sale-monthly/sale-monthly.component';
import { ReportsComponent } from './reports/reports.component';
import { SalebymanufacturerComponent } from './salebymanufacturer/salebymanufacturer.component';
import { CustomerIncomeComponent } from './customer-income/customer-income.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { ViewrepairComponent } from './viewrepair/viewrepair.component';


const routes: Routes = [
  { path: '', redirectTo: '/vehiclesearch', pathMatch: 'full'},
  { path: 'vehiclesearch', component: VehicleSearchComponent },
  { path: 'vehicleDetail/:id', component: VehicleDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addvehicle', component: AddvehicleComponent },
  { path: 'sellVehicle/:id', component: SaleformComponent },
  { path: 'viewcustomer/:id', component: ViewcustomerComponent},
  { path: 'addcustomer', component: AddcustomerComponent },
  { path: 'repairform', component: RepairformComponent },
  { path: 'saleby-model', component: SalebyModelComponent},
  { path: 'salelc', component: SalelcComponent},
  { path: 'salesreport', component: SalesreportComponent},
  { path: 'sale-monthly', component: SaleMonthlyComponent},
  { path: 'reports', component: ReportsComponent},
  { path: 'salebymanufacturer', component: SalebymanufacturerComponent },
  { path: 'customer-income', component: CustomerIncomeComponent},
  { path: 'customer-detail/:id', component: CustomerDetailComponent},
  { path: 'viewrepair/:id', component: ViewrepairComponent }
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
