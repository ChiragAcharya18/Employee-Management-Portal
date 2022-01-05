import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/shared.service';
import { NgxPrintModule } from 'ngx-print';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-add-print-details',
  templateUrl: './add-print-details.component.html',
  styleUrls: ['./add-print-details.component.css']
})
export class AddPrintDetailsComponent implements OnInit {

  constructor(private services: SharedService, private confirm: ConfirmDialogService) { 
    
  }
 EmpName: any;
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
  printDetails: any;
  errorMsg!: any;
  EmployeeType!: any;
  PrintId!: any;


  // Address
  State!: any;
  City!: any;
  Country!: any;
  Zip!: any;
  Addr!: any;
  District!: any;

  //Api Variables
  Countries!: any;
  States!: any;
  Cities!: any;

  EmployeeTypeList: any = [];
  submitFlag = true;

  ngOnInit(): void {
    this.onCancel();
    this.refreshEmpList();
    this.services.getAllEmployeeTypes().subscribe((data: any) => {
      if(data !== null) {
        this.EmployeeTypeList = data;
      }
    });

    this.services.getAllCountries().subscribe((data: any) => {
      if(data != null) {
        this.Countries = data["data"];
      }
    })
    //console.log("Countries List" ,this.Countries);
  }

  selectState() {
    var val = {
      country: this.Country
    }
    this.services.getAllStates(val).subscribe((data: any) => {
      if(data != null) {
        this.States = data["data"]["states"];
      }
    })
  }

  getCities() {
    var val = {
      country: this.Country,
      state: this.State
    }
    this.services.getAllCities(val).subscribe((data: any) => {
      if(data != null) {
        this.Cities = data["data"];
      }
    })
  }

  onRefresh() {
    this.refreshEmpList();
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
        this.Employees = null;
        setTimeout(() => {
          this.refreshEmpList();
        }, 5000)
      } else {
      this.Employees = data;
      }
    });

    this.services.getAllEmployeeTypes().subscribe((data: any) => {
      if(data !== null) {
        this.EmployeeTypeList = data;
      }
    })
  }

  employeeChange() {
    this.onCancel();
    this.services.getEmployeePrintDetails(this.EmployeeId).subscribe((data: any) => {
      if(data !== null) {
        this.PrintId = data["PrintId"];
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
        this.confirm.confirmThis("Data already present. You can update it!", () => {}, () => {});
        this.submitFlag = false; // update
      } else {
        this.submitFlag = true; // submit
      }
    });
    
    this.getDepartmentID(this.EmployeeId);
    
    //console.log(this.DepartmentName);
    //console.log("Emp on change: "+this.DepartmentId);
    //console.log("Emp on change: "+this.DepartmentName);
    
    
  }

  onSubmit() {
    this.confirm.confirmThis("Are you sure you want to submit?", () => {
    if(this.validateAllFields()) {
    this.printDetails = {
      EmployeeId: parseInt(this.EmployeeId),
      DepartmentId: this.DepartmentId,
      Email: this.Email,
      Dob: this.Dob+"T00:00:00",
      Salary: parseInt(this.Salary),
      PfNumber: this.PfNumber,
      Assets: this.Assets,
      Address: (this.Addr === null? this.Address: (this.Addr + "," + this.City + "," + this.District + "," + this.State + "," + this.Country + "," + this.Zip)),
      JobTitle: this.JobTitle,
      EmployeeTypeId: parseInt(this.EmployeeTypeIdValue),
      BloodGroup: this.BloodGroup,
      MaritalStatus: this.MaritalStatus,
      PhoneNumber : this.PhoneNumber
    }
    
    this.services.addEmployeePrintDetails(this.printDetails).subscribe((res: any) => {
      this.confirm.confirmThis(res.toString(), () => {}, () => {});
    });
  }}, () => {});

  }

  onUpdate() {
    this.confirm.confirmThis("Are you sure you want to update?", () => {
      if(this.validateAllFields()) {
      this.printDetails = {
        PrintId: parseInt(this.PrintId),
        EmployeeId: parseInt(this.EmployeeId),
        DepartmentId: this.DepartmentId,
        Email: this.Email,
        Dob: this.Dob+"T00:00:00",
        Salary: parseInt(this.Salary),
        PfNumber: this.PfNumber,
        Assets: this.Assets,
        Address: (this.Addr == null || this.Addr == ''? this.Address: (this.Addr + "," + this.City + "," + this.District + "," + this.State + "," + this.Country + "," + this.Zip)),
        JobTitle: this.JobTitle,
        EmployeeTypeId: parseInt(this.EmployeeTypeIdValue),
        BloodGroup: this.BloodGroup,
        MaritalStatus: this.MaritalStatus,
        PhoneNumber : this.PhoneNumber
      }
      this.services.updateEmployeePrintDetails(this.printDetails).subscribe((res: any) => {
        this.confirm.confirmThis(res.toString(), () => {}, () => {});
      });
    }}, () => {});
  }

  validateAllFields() {
    var res = '';
    if(this.State == null ||
      this.City == null ||
      this.Country == null ||
      this.Addr == null ||
      this.Zip == null ||
      this.District == null)  {
        this.confirm.confirmThis("Warning: Some address fields are null", () => {}, () => {});
      }
      //console.log(this.DepartmentId + "On validation function");
      
    if(this.DepartmentId == null? res+='DepartmentId ':
        this.DepartmentName == null? res+='DepartmentName ':
        this.Email == null? res+='Email ':      
        this.Salary == null? res+='Salary ':
        this.PfNumber== null? res+='PfNumber ':
        this.Assets== null? res+='Assets ':
        this.JobTitle== null? res+='JobTitle ':
        //this.Address == null? res+='Address ':
        this.EmployeeTypeIdValue == null? res+='EmployeeTypeIdValue ':
        //this.EmployeeType == null? res+='EmployeeType ':
        this.BloodGroup == null? res+='BloodGroup ':
        this.MaritalStatus == null? res+='MaritalStatus ':
        this.PhoneNumber== null? res+='phno;': '')
        {
          this.confirm.confirmThis("Following Fields are empty: " + res, () => {}, () => {});
          return false;
        }
        return true;
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
        this.State = null;
        this.City = null;
        this.Country = null;
        this.Addr = null;
        this.Zip = null;
        this.District = null;

        this.refreshEmpList();
  }

  getDepartmentID(id: any) {
   var dname = '';
   
    this.Employees.forEach((emp: any) => {
      
      if(emp["EmployeeId"] == id) {
        dname = emp["Department"];
        
        this.DepartmentName = dname;
      }
    });

    this.services.getDepList().subscribe((data: any) => {
      //console.log(data);
      if(data != null){
        data.forEach((dep : any) => { 
          //console.log(dep["DepartmentName"] + "-" + dep["DepartmentId"]);
          if(dep["DepartmentName"].toString() === this.DepartmentName.toString()) {
           this.DepartmentId = dep["DepartmentId"];
           //console.log(this.DepartmentId + "did "+ dep["DepartmentId"]);
           //return dep["DepartmentId"];
          }
        });
      }
    })
    
  }

}
