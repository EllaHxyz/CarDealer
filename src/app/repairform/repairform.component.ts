import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repairform',
  templateUrl: './repairform.component.html',
  styleUrls: ['./repairform.component.css']
})
export class RepairformComponent implements OnInit {
  repairDataO = {
    vin: '',
    customerId: '',
    customer: '',
    startDate: new Date().toISOString().slice(0, 10).replace('T', ' '),
    username: '',
    description: '',
    odometer: 0,
    laborCharges: 0,
    parts: []
  }
  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    private route: Router) { }
  searchRequest = {
    VIN: '',
  };
  VIN = '';
  tableisShown = false;
  dataSource: any;
  repairStatus = false;
  repairData: any;
  customer: any;
  // displayedColumns = ['vin', 'vehicleType', 'modelYear', 'manufacturerName', 'modelName', 'color', 'listPrice'];
  displayedColumns = ['vin', 'vehicleType', 'modelYear', 'manufacturerName', 'modelName', 'color'];
  parts = {
    partNumber: '',
    vendorName: "",
    quantity: 0,
    price: 0
  }
  updateRepairData: any;
  updatePartsNumber = 2;
  updateLarborCharges = 0;
  roleType='';
  ngOnInit(): void {
    this.repairData = this.repairDataO;
    if (localStorage.getItem('roleType')) {
      this.roleType = localStorage.getItem('roleType') || '';
      console.log(this.roleType);
    }
  }
  SearchbyVIN() {
    this.http.get<any>('https://localhost:5001/Vehicle/FilterVehicleByVIN?VIN=' + this.searchRequest.VIN).subscribe(data => {
      console.log(data);
      this.customer = null;
      if (data.length == 0) {
        let snackBarRef = this._snackBar.open('Sorry, it looks like we don’t have that in stock!', 'Close', { duration: 3000 });
        this.tableisShown = false;
      } else {
        this.dataSource = data;
        this.VIN = data[0].vin;
        this.http.get<any>('https://localhost:5001/Repair/GetRepairViewByVIN?VIN=' + this.VIN).subscribe(data => {
          console.log(data);
          if (data.vehicleStatus == "BeingRepaired") {
            this.repairStatus = true;
            this.updateRepairData = data;
            this.updatePartsNumber = data.parts.length;
            this.tableisShown = true;
            this.updateLarborCharges = data.laborCharges;
          } else if (data.vehicleStatus == "OpentoBeRepaired") {
            this.repairStatus = false;
            this.tableisShown = true;
          } else if (data.vehicleStatus == "Unsold") {
            this.tableisShown = false;
            let snackBarRef = this._snackBar.open('Sorry, this car cannot be repaired!', 'Close', { duration: 3000 });
          }
        }, error => {
          this.repairStatus = false;
        });
      }
    });
  };
  SearchCustomer() {
    this.http.get<any>('https://localhost:5001/Customer/GetCustomerById?CustomerIdentification=' + this.repairData.customer).subscribe(data => {
      console.log(data);
      this.customer = data;
      this.repairData = this.repairDataO;
      if (data) {
        this.repairData.customerId = data.customerId;
      } else {
        this.repairData = this.repairDataO;
      }
    }, error => {
      console.log(error);
    });
  }
  AddCustomer() {
    this.route.navigate([]).then(result => { window.open('/addcustomer/', '_blank'); });
  }
  ChangeStatus() {
    this.repairStatus = !this.repairStatus;
  };
  DeletePart(index: any) {
    this.repairData.parts.splice(index, 1);
  }
  DeletePartForUpdate(index: any) {
    this.updateRepairData.parts.splice(index, 1);
  }
  AddPart() {
    this.repairData.parts.push(this.parts);
    this.parts = {
      partNumber: '',
      vendorName: "",
      quantity: 0,
      price: 0
    };
  }
  AddPartForUpdate() {
    this.updateRepairData.parts.push(this.parts);
    this.parts = {
      partNumber: '',
      vendorName: "",
      quantity: 0,
      price: 0
    };
  }
  addRepair() {
    console.log(this.repairData);
    this.repairData.vin = this.VIN;
    this.repairData.username = localStorage.getItem('username');
    this.http.post<any>('https://localhost:5001/Repair/AddRepair', this.repairData).subscribe(data => {
      console.log(data);
    }, error => {
      if (error.error.text) {
        let snackBarRef = this._snackBar.open('Add Repair Successfully!', 'Close', { duration: 3000 });
      }
    })
  }
  updateRepair() {
    if (this.roleType!='owner'&&this.updateRepairData.laborCharges < this.updateLarborCharges) {
      let snackBarRef = this._snackBar.open('Sorry, new update larborcharge should not be less than the former larborcharge! Please re-input!', 'Close', { duration: 3000 });
      return;
    }
    console.log(this.updateRepairData);
    this.updateRepairData.startDate = this.updateRepairData.startDate.slice(0, 10).replace('T', ' ');
    this.http.post<any>('https://localhost:5001/Repair/UpdateRepair', this.updateRepairData).subscribe(data => {
      console.log(data);
    },error=>{
      if (error.status==200){
      let snackBarRef = this._snackBar.open("Update Repair successfully", 'Close', { duration: 3000 });
      }
    })
  }
  completeRepair() {
    if (this.roleType!='owner'&&this.updateRepairData.laborCharges < this.updateLarborCharges) {
      let snackBarRef = this._snackBar.open('Sorry, new update larborcharge should not be less than the former larborcharge! Please re-input!', 'Close', { duration: 3000 });
      return;
    }
    console.log(this.updateRepairData);
    this.updateRepairData.completeDate = new Date().toISOString().slice(0, 10).replace('T', ' ');
    this.updateRepairData.startDate = this.updateRepairData.startDate.slice(0, 10).replace('T', ' ');
    console.log(this.updateRepairData);
    this.http.post<any>('https://localhost:5001/Repair/UpdateRepair', this.updateRepairData).subscribe(data => {
      console.log(data);
    },error=>{
      if (error.status==200){
        let snackBarRef = this._snackBar.open("Complete Repair successfully", 'Close', { duration: 3000 });
        }
    })
  }
}
