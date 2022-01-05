import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmDialogService } from './confirm-dialog/confirm-dialog.service';
import { LoginService } from './login.service';
import { SharedService } from './shared.service';
import { UtilitiesService } from './utilities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employeeProject';

  isLogin!: string | null;

  constructor(private _s: SharedService, private _r: Router,private _confirm: ConfirmDialogService, private _u: UtilitiesService, private _l: LoginService, private _cookie: CookieService) {
    this.verifyUser();
  }

  verifyUser() {
    this.isLogin = localStorage.getItem("isLogin");
    if(this.isLogin === "pass") {
      var val = {
        username: this._cookie.get("username"),
        password: this._cookie.get("token")
      }
      this._l.verifyToken(val).subscribe((data: any) => {
        if(data != null) {
          //console.log("Data: " + data.Status);
          if(data.Status === "pass"){
            console.log("Token Verification process");
            this._r.navigateByUrl("/employee");
          } else if(data.Status === "fail") {
            console.log("Fail condition");
            this._confirm.confirmThis(data.Username, () => {}, () => {});
            this.signout();
          }
        }
      })
    } else {
      this._r.navigateByUrl("/login");
    }

  }

  ngOnInit() {
    console.log(this._cookie.get("username"), "-",this._cookie.get("token"));
    this.isLogin = localStorage.getItem("isLogin");
  }

  signout() {
    this._s.isLogin = false;
    this._cookie.delete("username");
    this._cookie.delete("token");
    localStorage.setItem("isLogin", "fail");
    this._r.navigateByUrl("/login");
  }
  
}
