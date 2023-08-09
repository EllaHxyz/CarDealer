import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  searchRequest = {
    Username: '',
    Password: '',
  };
  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    private route: Router,
    private _location: Location
  ) { }

  ngOnInit(): void {
  }
  Login() {
    let Username = this.searchRequest.Username;
    let Password = this.searchRequest.Password;
    this.http.get<any>('https://localhost:5001/Users/Account?Username='
      + Username + '&Password=' + Password).subscribe(data => {
        if (!data) {
          let snackBarRef = this._snackBar.open('User does not exist or password/username was wrongly typed!', 'Close', { duration: 3000 });
          return;
        } else {
          this._location.back();
          let snackBarRef = this._snackBar.open('Log In Successfully!', 'Close', { duration: 3000 });
          localStorage.setItem('username', data.username);
          localStorage.setItem('roleType', data.roleType);
        }
        console.log(data);
      });
    console.log(this.searchRequest);
  }
}
