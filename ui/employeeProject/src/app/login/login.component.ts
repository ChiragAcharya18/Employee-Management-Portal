import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../shared.service';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';
import { LoginService } from '../login.service';
import { UtilitiesService } from '../utilities.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _r: Router, private _s: SharedService, private confirm: ConfirmDialogService, private _l: LoginService, private _u: UtilitiesService, private _cookie: CookieService) { }
  
  ngOnInit(): void {
  }

  onLogin(val : any) {
    var user = {
      username: val.username,
      password: val.password
    }
    this._l.authUser(user).subscribe((data: any) => {
      if(data !== null) {
        //console.log(data);
        if(data.Status == "pass"){
          this._s.isLogin = true;
          localStorage.setItem("isLogin", "pass");
          this._cookie.set("token",data.Token,14);
          this._cookie.set("username",data.Username,14);
          this._r.navigateByUrl("/employee");
        } else {
          this.confirm.confirmThis("Hi Imposter! Wrong Credentials", () => {}, () => {});
        }
      }
    })
  }

}
