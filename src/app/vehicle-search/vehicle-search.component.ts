import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.css']
})
export class VehicleSearchComponent implements OnInit {
  totalUnsold = 0;
  title = 'General Search:';
  vehicleType = ["All", "Car", "Convertible", "Truck", "Van", "SUV"];
  ManufactureList: any;
  ColorList: any;
  ModelYearList = ["All"];
  loginString = "Log In";
  searchRequest = {
    keywords: '',
    vehicleType: "All",
    manufacturer: "All",
    color: "All",
    modelYear: 'All',
    pricelower: '',
    priceUpper: '',
    VIN: '',
    isSold: 'False'
  };
  dataSource: any;
  displayedColumns = ['vin', 'vehicleType', 'modelYear', 'manufacturerName', 'modelName', 'color', 'listPrice', 'descriptionMatch'];
  vehicleVinSearch = false;
  tableisShown = false;
  roleType = '';
  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    private route: Router) { }
  ngOnInit() {
    if (!localStorage.getItem('username')) {
      this.loginString = "Log In";
      this.vehicleVinSearch = false;
      this.searchRequest.isSold = 'False';
    } else {
      this.loginString = "Log Out";
      this.vehicleVinSearch = true;
      this.roleType = localStorage.getItem('roleType') || '';
      if (this.roleType == "manager" || this.roleType == "owner") {
        this.searchRequest.isSold = 'All';
      }
    }
    // if (!localStorage.getItem('manufacture')) {
    //   this.http.get<any>('https://localhost:5001/Vehicle/ManufacturerName').subscribe(data => {
    //     localStorage.setItem('manufacture', JSON.stringify(data));
    //     this.ManufactureList = [{ "ManufacturerName": "All" }].concat(data);
    //     console.log('get manufactureList from server');
    //   });
    // } else {
    //   this.ManufactureList = [{ "ManufacturerName": "All" }].concat(JSON.parse(localStorage.getItem('manufacture') || '[]'));
    // }
    this.http.get<any>('https://localhost:5001/Vehicle/ManufacturerName').subscribe(data => {
      this.ManufactureList = [{ "ManufacturerName": "All" }].concat(data);
      console.log('get manufactureList from server');
    });
    if (!localStorage.getItem('color')) {
      this.http.get<any>('https://localhost:5001/Vehicle/Color').subscribe(data => {
        localStorage.setItem('color', JSON.stringify(data));
        this.ColorList = [{ "Color": "All" }].concat(data);
        console.log('get colorList from server');
      });
    } else {
      this.ColorList = [{ "Color": "All" }].concat(JSON.parse(localStorage.getItem('color') || '[]'));

    }
    for (let i = 2022; i > 2000; i--) {
      this.ModelYearList.push(i.toString());
    }
    this.http.get<any>('https://localhost:5001/Vehicle/GetUnsoldVehiclesNumbers').subscribe(data => {
      this.totalUnsold = data;
    })


  }
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  getRecord(row: any) {
    console.log(row.vin);
    this.route.navigate([]).then(result => { window.open('/vehicleDetail/' + row.vin, '_blank'); });
  }
  Login() {
    if (!localStorage.getItem('username')) {
      // localStorage.setItem('userId', '1234');
      this.loginString = "Log Out";
      this.route.navigate(['/login']);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('roleType');
      this.loginString = "Log In";
      this.roleType = '';
      this.vehicleVinSearch = false;
      this.searchRequest.isSold = "False";
      let snackBarRef = this._snackBar.open('Log out succefully!', 'Close', { duration: 3000 });
    }
  }
  Search() {
    if (parseInt(this.searchRequest.priceUpper) < parseInt(this.searchRequest.pricelower)) {
      let snackBarRef = this._snackBar.open('PriceUpper should be greater than PriceLower, please re-enter a valid price!', 'Close', { duration: 3000 });
      return;
    }
    // console.log(this.searchRequest);
    // return;
    this.http.post<any>('https://localhost:5001/Vehicle/FilterVehicleByUserInput', this.searchRequest).subscribe(data => {
      console.log(data);
      if (data.length == 0) {
        let snackBarRef = this._snackBar.open('Sorry, it looks like we don’t have that in stock!', 'Close', { duration: 3000 });
        this.tableisShown = false;
      } else {
        if (this.searchRequest.keywords != '')
          for (let i = 0; i < data.length; i++) {
            if (data[i].description && data[i].description.search(this.searchRequest.keywords) >= 0) {
              data[i].descriptionMatch = 0;
            } else {
              data[i].descriptionMatch = 1;
            }
          }
        this.dataSource = data;
        this.tableisShown = true;
      }
    });
    console.log(this.searchRequest);
  }
  SearchbyVIN() {
    this.http.get<any>('https://localhost:5001/Vehicle/FilterVehicleByVIN?VIN=' + this.searchRequest.VIN).subscribe(data => {
      if (data.length == 0) {
        let snackBarRef = this._snackBar.open('Sorry, it looks like we don’t have that in stock!', 'Close', { duration: 3000 });
        this.tableisShown = false;
      } else {
        this.dataSource = data;
        this.tableisShown = true;
      }
    });
  }
  AddVehicle() {
    this.route.navigate([]).then(result => { window.open('/addvehicle/', '_blank'); });
  }
  AddRepair() {
    this.route.navigate([]).then(result => { window.open('/repairform/', '_blank'); });
  }
  Viewreports() {
    this.route.navigate([]).then(result => { window.open('/reports/', '_blank'); });
  }
}
