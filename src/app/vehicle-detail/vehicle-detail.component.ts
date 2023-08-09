import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {
  VIN = '';
  vehicleData: any;
  roleType = '';
  repairData: any = [];
  saleData: any=null;
  displayedColumns = ['Name', 'ServiceWritter', 'StartDate', 'EndDate', 'Larborchages', 'partscost', 'totalcost'];
  constructor(private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private route: Router) { }

  ngOnInit(): void {
    if (this._Activatedroute.snapshot.paramMap.get("id")) {
      this.VIN = this._Activatedroute.snapshot.paramMap.get("id") || '';
      this.http.get<any>('https://localhost:5001/Vehicle/FilterVehicleByVIN?VIN=' + this.VIN).subscribe(data => {
        if (!data) {
          let snackBarRef = this._snackBar.open('Sorry, it looks like we don’t have that in stock!', 'Close', { duration: 3000 });
        } else {
          this.vehicleData = data[0];
          this.vehicleData.inStockDate=this.vehicleData.inStockDate.slice(0, 10).replace('T', ' ');
          console.log(data);
        }
      });
    }
    if (localStorage.getItem('roleType')) {
      this.roleType = localStorage.getItem('roleType') || '';
      if (this.roleType == "owner" || this.roleType == "manager") {
        this.http.get<any>('https://localhost:5001/Repair/GetRepairViewByVINManager?VIN=' + this.VIN).subscribe(data => {
          this.repairData = data;
          for (let i = 0; i < this.repairData.length; i++) {
            let str: string = this.repairData[i]["Start Date"];
            this.repairData[i]["Start Date"] = str.slice(0, 10).replace('T', ' ');
            str = this.repairData[i]["End Date"];
            this.repairData[i]["End Date"] = str.slice(0, 10).replace('T', ' ');
          }
        });
      }
      if (this.roleType == "owner" || this.roleType == "sales_person"|| this.roleType == "manager") {
        this.http.get<any>('https://localhost:5001/Vehicle/GetSalesDataByVIN?VIN=' + this.VIN).subscribe(data => {
          console.log(data);
          if (!data){
            return;
          }
          this.saleData = data;
          this.saleData.SoldDate=this.saleData.SoldDate.slice(0, 10).replace('T', ' ');
        });
      }
      console.log(this.roleType);
    }
  }
  sellVehicle() {
    this.route.navigate(['/sellVehicle/' + this.VIN]);
  }
}
