
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-salelc',
  templateUrl: './salelc.component.html',
  styleUrls: ['./salelc.component.css']
})


export class SalelcComponent implements OnInit, AfterViewInit {

  title = 'Below Cost Sales';
  tableisShown = false;
  salesdata: any;
  displayedColumns = ["SoldDate","InvoicePrice", "SoldPrice", "SoldInvoicePercentage", "CustomerName", "SalespersonName"];
  

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    private route: Router,
    private _liveAnnouncer: LiveAnnouncer) { }


    ngOnInit() {
      this.http.get<any>('https://localhost:5001/Report/ReportBelowCostSales').subscribe(data => {
        
        if (data==[]) {
          let snackBarRef = this._snackBar.open('Sorry, we do not have that report!', 'Close', { duration: 3000 });
          this.tableisShown = false;
        } else {
          console.log(data);
          this.salesdata = data;
          this.tableisShown = true;
        }
        this.salesdata.sort = this.sort; 
      })
    }
        
    
    
  
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  ngAfterViewInit() {
    console.log(this.salesdata);
    

    
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}




