import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.css']
})
export class AddvehicleComponent implements OnInit {
  vehicleType = ["Car", "Convertible", "Truck", "Van", "SUV"];
  ManufactureList: any;
  vehicleData = {
    vin: '',
    modelName: '',
    vehicleType: '',
    manufacturerName: '',
    modelYear: 2021,
    color: null,
    invoicePrice: 0,
    listPrice: 0,
    username: '',
    description: '',
    isSold: false,
    inStockDate: new Date(),
    doorCount: 4,
    roofType: '',
    backSeatCount: 2,
    cargoCapacity: 40.2,
    cargoCoverType: '',
    rearAxles: 2,
    hasBackdoor: false,
    cupholderCount: 0,
    drivetrainType: '',
  };
  roleType = '';
  ColorList: any;
  constructor(private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private route: Router) { }

  ngOnInit(): void {
    this.ManufactureList = JSON.parse(localStorage.getItem('manufacture') || '[]');
    this.ColorList = JSON.parse(localStorage.getItem('color') || '[]');
    this.vehicleData.username = localStorage.getItem('username') || '[]';
  }
  addVehicle() {
    this.vehicleData.inStockDate = new Date();
    let message = '';
    if (this.vehicleData.vin == '') { message = "Please input valid vin!"; }
    if (this.vehicleData.modelName == '') { message = "Please input valid modelName!"; }
    if (this.vehicleData.manufacturerName == '') { message = "Please input valid manufacturerName!"; }
    if (this.vehicleData.vehicleType == '') { message = "Please input valid vehicleType!"; }
    if (!Number.isInteger(this.vehicleData.modelYear)) { message = "Please input valid modelYear!"; }
    if (this.vehicleData.color == []||!this.vehicleData.color) { message = "Please choose at least one color!"; }
    if (!this.vehicleData.invoicePrice) { message = "Please input valid invoicePrice!"; }
    if (this.vehicleData.vehicleType == 'Car' && !Number.isInteger(this.vehicleData.doorCount)) { message = "Please input valid doorCount!"; }
    if (this.vehicleData.vehicleType == 'Convertible' && !Number.isInteger(this.vehicleData.backSeatCount)) { message = "Please input valid backSeatCount!"; }
    if (this.vehicleData.vehicleType == 'Convertible' && this.vehicleData.roofType == '') { message = "Please input valid roofType!"; }
    if (this.vehicleData.vehicleType == 'Truck' && !this.vehicleData.cargoCapacity) { message = "Please input valid cargoCapacity!"; }
    if (this.vehicleData.vehicleType == 'Truck' && !Number.isInteger(this.vehicleData.rearAxles)) { message = "Please input valid rearAxles!"; }
    if (this.vehicleData.vehicleType == 'SUV' && !Number.isInteger(this.vehicleData.cupholderCount)) { message = "Please input valid cupholderCount!"; }
    if (this.vehicleData.vehicleType == 'SUV' && !this.vehicleData.drivetrainType) { message = "Please input valid drivetrainType!"; }
    if (message != '') {
      let snackBarRef = this._snackBar.open(message, 'Close', { duration: 3000 });
      return;
    }
    console.log(this.vehicleData);
    // return;
    this.http.post<any>('https://localhost:5001/Vehicle/AddVehicle', this.vehicleData).subscribe(data => {
      // console.log(data);
    },error=>{
      if (error.error.text){
        this.route.navigate(['/vehicleDetail/'+this.vehicleData.vin]);
      } else {
        let snackBarRef = this._snackBar.open('This vehicle exists in the inventory, please check again!', 'Close', { duration: 3000 });
      }
    });
  }
}