import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-restore-employee',
  templateUrl: './restore-employee.component.html',
  styleUrls: ['./restore-employee.component.css']
})
export class RestoreEmployeeComponent implements OnInit {


  DeletedEmployeeList!: any;
  EmployeeId!: any;

  username!:any;
  password!: any;
  constructor(private service: SharedService, private confirm: ConfirmDialogService) {
    this.refreshEmployeeList();
   }

  ngOnInit(): void {
    this.refreshEmployeeList();
  }

  refreshEmployeeList() {
    this.service.getAllDeletedEmployees().subscribe((data: any) => {
      if(data != null) {
        this.DeletedEmployeeList = data;
      }
    });
  }

  restoreEmployee() {
      this.service.restoreEmployee(this.EmployeeId).subscribe((data:any) => {
        console.log(data);
        if(data != null) {
          this.confirm.confirmThis(data[0]["EmployeeName"],() => {}, () => {});
        } else {
          this.confirm.confirmThis("Api didnt respond",() => {}, () => {});
        }
      });
      this.refreshEmployeeList();
    } 
    
  
}
