import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  CuId='';
  salesdata:any;
  repairdata:any;
  saleisShown=false;
  repairisShown=false;
  title='Sales Detail';
  title2 = 'Repair Detail';
  displayedColumns = ["SoldDate",
  "SoldPrice",
  "VIN",
  "ModelYear",
  "ManufacturerName",
  "ModelName",
  "SalespersonNamme"];
  displayedColumns2 = ["StartDate",
  "EndDate",
  "VIN",
  "Odometer",
  "PartsCost",
  "LaborChages",
  "TotalCost",
  "ServiceWriter"];


  constructor(private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private route: Router) { }

  ngOnInit(): void {if (this._Activatedroute.snapshot.paramMap.get("id")) {
    this.CuId = this._Activatedroute.snapshot.paramMap.get("id") || '';
    this.http.get<any>('https://localhost:5001/Report/ReportGrossCustomerSalesSingleEntity?CustomerID=' + this.CuId).subscribe(data => {
      if (!data) {
        let snackBarRef = this._snackBar.open('It looks like we don’t have sales record for this customer.', 'Close', { duration: 3000 });
      } else {
        this.salesdata = data;
        this.saleisShown=true;
        console.log(data);
      }
    });
  }
  if (this._Activatedroute.snapshot.paramMap.get("id")) {
    this.CuId = this._Activatedroute.snapshot.paramMap.get("id") || '';
    this.http.get<any>('https://localhost:5001/Report/ReportGrossCustomerRepairSingleEntity?CustomerID=' + this.CuId).subscribe(data => {
      if (!data) {
        let snackBarRef = this._snackBar.open('It looks like we don’t have repair record for this customer.', 'Close', { duration: 3000 });
      } else {
        this.repairdata = data;
        this.repairisShown = true;
        console.log(data);
      }
    });
  }



  }

}
