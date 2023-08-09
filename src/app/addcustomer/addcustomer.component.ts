import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {
  customer = {
    phone: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    email: '',
    type: 'Individual',
    fName: '',
    lName: '',
    driverLicense: '',
    bName: '',
    title: '',
    taxIdentification: '',
    username: '',
  }
  constructor(private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private route: Router) { }

  ngOnInit(): void {
    this.customer.username = localStorage.getItem('username') || '';
  }
  addCustomer() {
    let message = '';
    if (this.customer.phone == '') { message = "Please input valid Phone!"; }
    if (this.customer.street == '') { message = "Please input valid Street!"; }
    if (this.customer.city == '') { message = "Please input valid City!"; }
    if (this.customer.state == '') { message = "Please input valid State!"; }
    if (this.customer.country == '') { message = "Please input valid Country!"; }
    if (this.customer.fName == '') { message = "Please input valid First Name!"; }
    if (this.customer.lName == '') { message = "Please input valid Last Name!"; }
    if (this.customer.type == 'Individual' && this.customer.driverLicense == '') { message = "Please input valid DriverLicense!"; }
    if (this.customer.type == 'Company' && this.customer.title == '') { message = "Please input valid Title!"; }
    if (this.customer.type == 'Company' && this.customer.taxIdentification == '') { message = "Please input valid TaxIdentification!"; }
    if (this.customer.type == 'Company' && this.customer.bName == '') { message = "Please input valid Business Name!"; }
    if (message != '') {
      let snackBarRef = this._snackBar.open(message, 'Close', { duration: 3000 });
      return;
    }
    if (this.customer.type == 'Individual') {
      this.http.post<any>('https://localhost:5001/Customer/Individual', this.customer).subscribe(data => {
        console.log(data);
      }, error => {
        if (error.status == 200) {
          let snackBarRef = this._snackBar.open("Add individual customer successfully!", 'Close', { duration: 3000 });
          this.route.navigate(['/viewcustomer/'+this.customer.driverLicense]);
        } else {
          let snackBarRef = this._snackBar.open("This customer exist in our system，please check again!", 'Close', { duration: 3000 });
        }
      });
    } else {
      this.http.post<any>('https://localhost:5001/Customer/Company', this.customer).subscribe(data => {
        console.log(data);
      }, error => {
        if (error.status == 200) {
          let snackBarRef = this._snackBar.open("Add company customer successfully!", 'Close', { duration: 3000 });
          this.route.navigate(['/viewCustomer/' + this.customer.taxIdentification]);
        } else {
          let snackBarRef = this._snackBar.open("This customer exist in our system，please check again!", 'Close', { duration: 3000 });
        }
      });
    }
  }
}
