import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salebymanufacturer',
  templateUrl: './salebymanufacturer.component.html',
  styleUrls: ['./salebymanufacturer.component.css']
})
export class SalebymanufacturerComponent implements OnInit {
	
	title = 'Sales Report by Vehicle Manufacturer';
  Days= ''
  tableisShown = false;
  salesdata: any;
  displayedColumns = ['VehicleManufacturer','NumberOfCarsSold'];
  dtchoice = '';

  view='Manufacturer';
  //views=['Type','Manufacturer'];
		
	
  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    private route: Router,
    private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
  	
  	
  }
  ReportbyDays() {
    switch(this.dtchoice){
      case "MONTH":
        this.Days = '30';
        break;
      case 'YEAR':
        this.Days = '365';
        break;
      case 'ALL':
        this.Days =  '1000';
        break;
      default:
        this.Days = '';
        break;
    }

    this.http.get<any>('https://localhost:5001/Report/ReportSalesBy'+this.view+'?Days=' + this.Days).subscribe(data => {
      console.log(data);
      if (data==[]) {
        let snackBarRef = this._snackBar.open('Sorry, we do not have that report!', 'Close', { duration: 3000 });
        this.tableisShown = false;
      } else {
        console.log(data);
        this.salesdata = data;
        this.tableisShown = true;
      }
    });
  }
  
  
  

}
