import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-income',
  templateUrl: './customer-income.component.html',
  styleUrls: ['./customer-income.component.css']
})
export class CustomerIncomeComponent implements OnInit {
  title='Gross Customer Income Report'
  tableisShown=false;
  dataSource:any;
  displayedColumns = ["Name",
  "FirstSaleorRepairStartDate",
  "MostRecentSaleorRepairStartDate",
  "NumberofSales",
  "NumberofRepairs",
  "GrossIncome",
  "getdetails"];

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    private route: Router) { }

  ngOnInit(): void {

  }
  GetCustomer() {
    this.http.get<any>('https://localhost:5001/Report/ReportGrossCustomerIncome' ).subscribe(data => {
      if (data.length==0) {
        let snackBarRef = this._snackBar.open('No data in the report!', 'Close', { duration: 3000 });
        this.tableisShown = false;
      } else {
        this.dataSource = data;
        this.tableisShown = true;
      }
    });
  }
  getRecord(row: any) {
    console.log(row);
    this.route.navigate([]).then(result => { window.open('/customer-detail/'+row.CuId); });
  }

}
