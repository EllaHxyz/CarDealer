import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewrepair',
  templateUrl: './viewrepair.component.html',
  styleUrls: ['./viewrepair.component.css']
})
export class ViewrepairComponent implements OnInit {
  RepairID='';
  RepairData:null;
  constructor(private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private route: Router) { }

  ngOnInit(): void {
    if (this._Activatedroute.snapshot.paramMap.get("id")) {
      this.RepairID = this._Activatedroute.snapshot.paramMap.get("id") || '';
      this.http.get<any>('https://localhost:5001/Repair/GetRepairViewById?RepairId=' + this.RepairID).subscribe(data => {
        if (!data) {
          let snackBarRef = this._snackBar.open('Sorry, it looks like we don’t have that in stock!', 'Close', { duration: 3000 });
        } else {
          console.log(data);
          this.RepairData=data;
        }
      });
    }
  }

}
