import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { GeneratedFile } from '@angular/compiler';

@Component({
  selector: 'app-sale-monthly',
  templateUrl: './sale-monthly.component.html',
  styleUrls: ['./sale-monthly.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SaleMonthlyComponent implements OnInit {

  salesdata: any;
  persondata: any;
  root: any;
  idMapping: any;
  
  tableisShown = false;
  tableisShown_person = false;
  columnsToDisplay = [
    'SoldMonth',
    'TotalNumberOfVehiclesSold',
    'TotalSalesIncome',
    'TotalNetIncome',
    'SoldInvoicePercentage'
  ];
  columnsToDisplay2 = [
    'YearMonth',
    'FirstName',
    'LastName',
    'TotalNumberofVehiclesSold',
    'TotalSalesIncome',
    'sales_rank'
  ];
  displayedColumns: string[] = ['S-Firstname', 'S-Lastname', 'S-Total-number', 'S-Total-sale','S-salesrank'];
  expandedElement!: PersonElement | null;

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    private route: Router
  ) { }

  ngOnInit() {
    
    
  
  }

Getmonthlysale(){
  this.http.get<any>('https://localhost:5001/Report/ReportMonthlySalesByMonth').subscribe(data => {

    if (data.length == 0) {
      let snackBarRef = this._snackBar.open('Sorry, we do not have that report!', 'Close', { duration: 3000 });
      this.tableisShown = false;
    } else {
      data.forEach((el: any) => {
        el.SalesPerson = '';
      })
      this.idMapping = data.reduce((acc: any, el: any, i: any) => {
        acc[el.SoldMonth] = i;
        return acc;
      }, {});
      this.salesdata = data;
      this.tableisShown = true;
      console.log(data);
    }
  });

  this.http.get<any>('https://localhost:5001/Report/ReportMonthlySalesByPerson').subscribe(data => {

    if (data.length == 0) {
      let snackBarRef = this._snackBar.open('Sorry, we do not have that report!', 'Close', { duration: 3000 });
      this.tableisShown_person = false;
    } else {
      let root = data.forEach((el: any) => {
        if (el.YearMonth === null) {
          this.root = el;
          return;
        }
         const parentel = this.salesdata[this.idMapping[el.YearMonth]];
         parentel.SalesPerson = [...(parentel.SalesPerson || []), el];

      });

      this.persondata = data;
      this.root = root;
      this.tableisShown_person = true;
      console.log(data);
    }
  });

}



}

export interface PersonElement {

  FirstName: string;
  LastName: string;
  YearMonth: any;
  TotalNumberofVehiclesSold: number;
  TotalSalesIncome: number;
  sales_rank: number;

}
