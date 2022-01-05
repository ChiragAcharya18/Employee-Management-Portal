import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {


  isLogin!: boolean;
  constructor(private _s: SharedService) { }

  ngOnInit(): void {
    this.isLogin = this._s.isLogin;
  }

}
