import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, of  } from 'rxjs';
import { Router } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import jsPDF from 'jspdf';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

 

  constructor(private services: SharedService, private _r: Router, private confirm: ConfirmDialogService) {
    if(services.isLogin == false) {
      _r.navigateByUrl("/login")
    }
   }
   //@ViewChild('closePrintModal')  closeModal!: ElementRef;
  
  @ViewChild('printContainer', { static: false })
  element!: ElementRef;

  EmployeeList!: any;
  EmployeeListWithoutFilter: any = [];
  ModalTitle: string | undefined;
  ActivateAddEditEmpComp: boolean = false;
  emp: any;
  ShowEmployeeModal!: any;
  PhotoFilePath!: string;
  errorMsg! : string;
  isLogin!: boolean;
  EmployeeIdFilter: string = "";
  EmployeeNameFilter: string = "";
  DepartmentFilter: string = "";
  tempEmpId!: any;


  //Employee Print
  Employees!: any; 
  EmployeeId!: any;
  DepartmentName!: any;
  DepartmentId!: any;
  Email: any;
  Dob!: Date;
  Salary!: any;
  PfNumber!: any;
  Assets: any;
  Address: any;
  JobTitle: any;
  EmployeeTypeIdValue: any;
  BloodGroup: any;
  MaritalStatus: any;
  PhoneNumber: any;
  EmpName: any;
  EmployeeType: any;
  PrintId: any;
  Doj: any;
  PhotoFilePathTemp!: any;
   disablePrint!: boolean;
  TempEmployeeId!: any;

  printValues!: any;

  ngOnInit(): void {
    this.EmployeeList = null;
    this.refreshEmpList();
    //setInterval(this.refreshEmpList, 5000);
    var temp = localStorage.getItem("isLogin");
    this.isLogin = (temp === "pass")? true: false;
  }



  showEmployeeModal(val: any) {
    this.ShowEmployeeModal = val;
    this.PhotoFilePath = this.services.photoUrl + val.ProfileFileName;
  
  }

  refreshEmpList() {
    this.services.getEmpList()
    .pipe(
      catchError((error) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMsg = `Error: ${error.error.message}`;
        } else {
          this.errorMsg = `Error: ${error.message}`;
        }
          return of(true);
      })
      )
    .subscribe(data => {
      if(data === true) {
        this.EmployeeList = null;
        setTimeout(() => {
          this.refreshEmpList();
        }, 5000)
      } else {
      this.EmployeeList = data;
      this.EmployeeListWithoutFilter = data;
      }
    });
  }
  
  addClick() {
      this.emp = {
        EmployeeId: 0,
        EmployeeName: "",
        Department: "",
        DateOfJoining: "",
        ProfileFileName: "anonymous.png"
      };
      this.ModalTitle = "Add Employee";
      this.ActivateAddEditEmpComp = true;
  }
  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }
  editClick(item: any) {
    this.emp = item;
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item: any) {
    this.confirm.confirmThis("Are you sure?" , () => {
      this.services.deleteEmployee(item.EmployeeId).subscribe(data => {
        this.confirm.confirmThis(data.toString(), () => {}, () => {});
        this.refreshEmpList();
      })
    } , () => {

    })
  }

  sortResult(prop: any, order: boolean) {
    this.EmployeeList = this.EmployeeListWithoutFilter.sort(function(a:  any,b: any){
      if(order) {
        return (a[prop]>b[prop])? 1: ((a[prop]<b[prop])? -1:0);
      } else {
        return (b[prop]>a[prop])? 1: ((b[prop]<a[prop])? -1:0);
      }
    })
}

FilterFn() {
  var EmployeeIdFilter = this.EmployeeIdFilter;
  var EmployeeNameFilter = this.EmployeeNameFilter;
  var DepartmentFilter = this.DepartmentFilter;
   var tempEmp = this.EmployeeListWithoutFilter.filter((data: any) => {
    return data.EmployeeId.toString().toLowerCase().includes(
      EmployeeIdFilter.toString().trim().toLowerCase()
    ) && data.EmployeeName.toString().toLowerCase().includes(
      EmployeeNameFilter.toString().trim().toLowerCase()
    ) && data.Department.toString().toLowerCase().includes(
      DepartmentFilter.toString().trim().toLowerCase()
    )
  })
  if(tempEmp.length !== 0) {
    this.EmployeeList = tempEmp;
  }

}

PrintEmployee() {
  var Id = this.TempEmployeeId;
  let pdf = new jsPDF("p","pt","a4",true);
  pdf.setFont("helvetica");
  pdf.setFontSize(5);
  pdf.setProperties({ title: 'Employee Details' });
  //pdf.text(this.PrintId, 5,5)
  pdf.html(this.element.nativeElement,{
    callback: (pdf) => {
      //pdf.save("EmployeePrint-"+ Id);
      var blob = pdf.output("blob");
      window.open(URL.createObjectURL(blob));
    } 
  });
  
}

openPrintModel(Id:  any) {
  this.onCancel();
  this.services.getEmployeePrintDetails(Id).subscribe((data: any) => {
    if(data !== null) {
      this.PrintId = data["PrintId"];
      this.EmployeeId = data["EmployeeId"]
      this.DepartmentId = data["DepartmentId"];
      this.DepartmentName = data["DepartmentName"];
      this.EmpName = data["EmployeeName"];
      this.Email = data["Email"];
      this.Dob = data["Dob"].slice(0,10);        
      this.Salary = data["Salary"];
      this.PfNumber= data["PfNumber"];
      this.Assets= data["Assets"];
      this.JobTitle= data["JobTitle"];
      this.Address = data["Address"];
      this.EmployeeTypeIdValue = data["EmployeeTypeId"];
      this.EmployeeType = data["EmployeeType"];
      this.BloodGroup = data["BloodGroup"];
      this.MaritalStatus = data["MaritalStatus"];
      this.PhoneNumber= data["PhoneNumber"];
      var pfn = data["ProfileFileName"].toString();
      this.PhotoFilePathTemp = this.services.photoUrl + pfn;
      this.disablePrint = true;
      //console.log(this.PhotoFilePathTemp);
    } else {
      this.disablePrint = false;
      //alert("Sorry! Cannot fetch employee data!");
      //this.closeModal.nativeElement.click(); 
    }
  });
}

onCancel() {
  this.DepartmentId = null;
  this.DepartmentName = null;
  this.Email = null;      
  this.Salary = null;
  this.PfNumber= null;
  this.Assets= null;
  this.JobTitle= null;
  this.Address = null;
  this.EmployeeTypeIdValue = null;
  this.EmployeeType = null;
  this.BloodGroup = null;
  this.MaritalStatus = null;
  this.PhoneNumber= null;
  this.PrintId = null;
  this.EmployeeId = null;
  this.EmployeeType = null;
  this.EmpName = null;
}

}
