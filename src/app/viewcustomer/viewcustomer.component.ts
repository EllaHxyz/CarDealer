import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.css']
})
export class ViewcustomerComponent implements OnInit {
  customerIdentification='';
  customerdata:any;
  constructor(private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private route: Router) { }

  ngOnInit(): void {
    if (this._Activatedroute.snapshot.paramMap.get("id")) {
      this.customerIdentification = this._Activatedroute.snapshot.paramMap.get("id") || '';
      this.http.get<any>('https://localhost:5001/Customer/GetCustomerById?CustomerIdentification=' + this.customerIdentification).subscribe(data => {
        if (!data) {
          let snackBarRef = this._snackBar.open('Sorry, it looks like we don’t have that Customer!', 'Close', { duration: 3000 });
        } else {
          this.customerdata = data;
          console.log(data);
        }
      });
    }
  }

}
