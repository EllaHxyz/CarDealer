import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';


export interface RepairsCount1 {

  VehicleType: string;
  CountofRepairds: number;
  TotalPartsCharge: number;
  TotalLaborCharge: number;
  TotalRepairCosts: number;

}

export interface RepairsCount2 {

  VehicleModel: string;
  CountofRepairds: number;
  TotalPartsCharge: number;
  TotalLaborCharge: number;
  TotalRepairCosts: number;

}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class ReportsComponent implements OnInit {


  /*boolean for different tables*/
  colortableisShown = false;
  manufacturertableisShown = false;
  belowcosttableisShown = false;
  timeininventorytableisShown = false;
  partstatstableisShown = false;
  repairtableisShown = false;
 
  /*results holders for different reports*/
  reportSalesbyColor: any;
  reportSalesbyManufacturer: any;
  reportBelowCostSales: any;
  reporttimeininventory: any;
  reportpartsStats: any;
  reportrepair: any;

  /*displayed columns for different reports*/
  displayedColumns = ['VehicleColor', 'NumberOfCarsSold'];
  displayedColumnsmanufacturer = ['VehicleManufacturer', 'NumberOfCarsSold'];
  displayedColumnsbelowcostsales = ['SoldDate', 'InvoicePrice', 'SoldPrice', 'SoldInvoicePercentage', 'CustomerName', 'SalespersonName'];
  displayedColumntimeininventory = ['VehicleType', 'AverageDaysinInventory'];
  displayedColumnpartsStats = ['VendorName', 'totalcost', 'totalquantity'];
  displayedColumnRepair1 = [
    'ManufacturerName',
    'CountofRepairds',
    'TotalPartsCharge',
    'TotalLaborCharge',
    'TotalRepairCosts'
  ];
  displayedColumnRepair2 = [
    'VehicleType',
    'CountofRepairs',
    'TotalPartsCharge',
    'TotalLaborCharge',
    'TotalRepairCosts'
  ];
  displayedColumnRepair3 = [
    'VehicleModel',
    'CountofRepairds',
    'TotalPartsCharge',
    'TotalLaborCharge',
    'TotalRepairCosts'
  ];

  dateRange = ['Past 30 days', 'Past 1 year', 'Over all time'];
  daysbyColor = '';
  daysbyManufacturer = '';
  daysbyType = '';
  searchRequest = {
    dateRange: "All"
  };

  expandedElement1!: RepairsCount1 | null;
  expandedElement2!: RepairsCount2 | null;

  constructor(private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

  };

  SalebyColor() {
    if (this.searchRequest.dateRange == 'Past 30 days') {
      this.daysbyColor = '30';
    } else if (this.searchRequest.dateRange == 'Past 1 year') {
      this.daysbyColor = '360';
    } else {
      this.daysbyColor = '1000';
    };
    this.http.get<any>('https://localhost:5001/Report/ReportSalesByColor?Days=' + this.daysbyColor).subscribe(data => {
      if (data.length == 0) {
        let snackBarRef = this._snackBar.open('Sorry, it looks like we don’t have any color registered!', 'Close', { duration: 3000 });
        this.colortableisShown = false;
      } else {
        this.colortableisShown = true;
        data.sort((a: { VehicleColor: string }, b: { VehicleColor: string }) => a.VehicleColor.localeCompare(b.VehicleColor));
        this.reportSalesbyColor = data;
        console.log(data);
      };
    })
  };
  SalebyColorReset() {
    this.daysbyColor = '';
    this.colortableisShown = false;
    this.reportSalesbyColor = [];
  };


  SalebyManufacturer() {
    if (this.searchRequest.dateRange == 'Past 30 days') {
      console.log(this.daysbyManufacturer)
      this.daysbyManufacturer = '30';
    } else if (this.searchRequest.dateRange == 'Past 1 year') {
      console.log(this.daysbyManufacturer)
      this.daysbyManufacturer = '360';
    } else {
      console.log(this.daysbyManufacturer)
      this.daysbyManufacturer = '1000';
    };
    this.http.get<any>('https://localhost:5001/Report/ReportSalesByManufacturer?Days=' + this.daysbyManufacturer).subscribe(data => {
      if (data.length == 0) {
        let snackBarRef = this._snackBar.open('Sorry, it looks like we don’t have any Manufacturer registered!', 'Close', { duration: 3000 });
        this.manufacturertableisShown = false;
      } else {
        this.manufacturertableisShown = true;
        data.sort((a: { VehicleManufacturer: string }, b: { VehicleManufacturer: string }) => a.VehicleManufacturer.localeCompare(b.VehicleManufacturer));
        this.reportSalesbyManufacturer = data;
        console.log(data);
      };
    })

  };  
  SalebyManufacturerReset() {
  	this.manufacturertableisShown = false;
    this.reportSalesbyManufacturer = [];
    this.daysbyManufacturer = '';
  };


  SalebyType() {
    if (this.searchRequest.dateRange == 'Past 30 days') {
      this.daysbyType = '30';
    } else if (this.searchRequest.dateRange == 'Past 1 year') {
      this.daysbyType = '360';
    } else {
      this.daysbyType = '1000';
    };
  };
  SalebyTypeReset() {
    this.daysbyType = '';
  };


  BelowCostSales() {
    this.http.get<any>('https://localhost:5001/Report/ReportBelowCostSales').subscribe(data => {
      if (data.length == 0) {
        let snackBarRef = this._snackBar.open('Sorry, it looks like we don’t have any sales record registered!', 'Close', { duration: 3000 });
        this.belowcosttableisShown = false;
      } else {
        this.belowcosttableisShown = true;
        this.reportBelowCostSales = data;
        console.log(data);
      };
    })
  };
  BelowCostSalesReset() {
    this.belowcosttableisShown = false;
    this.reportBelowCostSales = [];
  };


  AveTimeinInventory() {
    this.http.get<any>('https://localhost:5001/Report/ReportAverageTime').subscribe(data => {
      if (data.length == 0) {
        let snackBarRef = this._snackBar.open('Sorry, it looks like we don’t have any vehicel sold!', 'Close', { duration: 3000 });
        this.timeininventorytableisShown = false;
      } else {
        this.timeininventorytableisShown = true;
        this.reporttimeininventory = data;
        console.log(data);
      };
    })
  };
  AveTimeinInventoryReset() {
    this.timeininventorytableisShown = false;
    this.reporttimeininventory = [];
  };


  PartsStats() {
    this.http.get<any>('https://localhost:5001/Report/ReportPartsStatistics').subscribe(data => {
      if (data.length == 0) {
        let snackBarRef = this._snackBar.open('Sorry, it looks like we don’t have any part ised!', 'Close', { duration: 3000 });
        this.partstatstableisShown = false;
      } else {
        this.partstatstableisShown = true;
        this.reportpartsStats = data;
        console.log(data);
      };
    })
  };
  PartsStatsReset() {
    this.partstatstableisShown = false;
    this.reportpartsStats = [];
  };


  ConstructRepairTree() {
    this.http.get<any>('https://localhost:5001/Report/ReportRepairByManufacturer').subscribe(grandparent => {
      if (grandparent.length != 0) {
        grandparent.forEach((ele: any) => {
          let manu = ele.ManufacturerName
          this.http.get<any>('https://localhost:5001/Report/ReportRepairByVehicleType?Manufacturer=' + manu).subscribe(parent => {
            if (parent.length != 0) {
              parent.forEach((ele2: any) => {
                //console.log(ele2);
                let type = ele2.VehicleType
                this.http.get<any>('https://localhost:5001/Report/ReportRepairByVehicleModel?Manufacturer=' + manu + '&VehicleType=' + type).subscribe(child => {
                  ele2.children = child;
                });
              });
            }
            ele.children = parent;
          });
        });
        this.reportrepair = grandparent;
        let a = setTimeout(()=>{
          this.repairtableisShown = true;
        }, 2000);  
        console.log(this.reportrepair);
      }
    });
  };

  RepairReportReset() {
    this.reportrepair = [];
    this.repairtableisShown = false;
  }


}

