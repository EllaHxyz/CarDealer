import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saleform',
  templateUrl: './saleform.component.html',
  styleUrls: ['./saleform.component.css']
})
export class SaleformComponent implements OnInit {
  VIN = '';
  roleType = '';
  order = {
    customer: '',
    soldPrice: 0,
    vin: '',
    username: '',
    customerId: '',
    salesDate: new Date().toISOString().slice(0, 10).replace('T', ' ')
  };
  customer: any;
  vehicleData: any;
  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    private route: Router,
    private _Activatedroute: ActivatedRoute,) { }

  ngOnInit(): void {
    if (this._Activatedroute.snapshot.paramMap.get("id")) {
      this.VIN = this._Activatedroute.snapshot.paramMap.get("id") || '';
      this.http.get<any>('https://localhost:5001/Vehicle/FilterVehicleByVIN?VIN=' + this.VIN).subscribe(data => {
        if (!data) {
          let snackBarRef = this._snackBar.open('Sorry, it looks like we don’t have that in stock!', 'Close', { duration: 3000 });
        } else {
          this.vehicleData = data[0];
        }
      });
      console.log(this.VIN);
    }
    if (localStorage.getItem('roleType')) {
      this.roleType = localStorage.getItem('roleType') || '';
      console.log(this.roleType);
    }
  }
  Search() {
    this.http.get<any>('https://localhost:5001/Customer/GetCustomerById?CustomerIdentification=' + this.order.customer).subscribe(data => {
      console.log(data);
      this.customer = data;
    }, error => {
      console.log(error);
    });
  }
  AddCustomer() {
    this.route.navigate([]).then(result => { window.open('/addcustomer/', '_blank'); });
  }
  AddSale() {
    this.order.customerId = this.customer.customerId;
    this.order.salesDate = new Date().toISOString().slice(0, 10).replace('T', ' ');
    this.order.vin = this.VIN;
    this.order.username = localStorage.getItem('username') || '';
    if (this.roleType!='owner' && this.order.soldPrice <= this.vehicleData.listPrice * 0.95) {
      let snackBarRef = this._snackBar.open('Please re-input soldPrice!', 'Close', { duration: 3000 });
      return;
    }
    this.http.post<any>('https://localhost:5001/Sales/AddSales', this.order).subscribe(data => {
    }, error => {
      if (error.status==200){
        let snackBarRef = this._snackBar.open('Add sale successfully!', 'Close', { duration: 3000 });
      } else {
        let snackBarRef = this._snackBar.open('Sorry, Add sale fail, the car had been sold already!', 'Close', { duration: 3000 });
      }
    });
  }
}
