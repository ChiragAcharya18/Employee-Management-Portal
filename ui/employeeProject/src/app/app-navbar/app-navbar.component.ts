import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../shared.service';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  title = 'employeeProject';

  isLogin!: string | null;
  userNameDisplay!: any;

  constructor(private _s: SharedService, private _r: Router, private _u: UtilitiesService, private _cookie: CookieService) {
    this.isLogin = localStorage.getItem("isLogin");
    this.userNameDisplay = _cookie.get("username");
  }

  ngOnInit() {
    this.isLogin = localStorage.getItem("isLogin");
  }

  signout() {
    this.userNameDisplay = null;
    this._s.isLogin = false;
    this._cookie.delete("username");
    this._cookie.delete("token");
    localStorage.setItem("isLogin", "fail");
    this._r.navigateByUrl("/login");
  }
  

}
