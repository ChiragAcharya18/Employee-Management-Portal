import { Component, OnInit, Input } from '@angular/core';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  
  constructor(private services: SharedService, private confirm: ConfirmDialogService) { }

  @Input() emp: any;
  EmployeeId: string | undefined;
  EmployeeName: string | undefined;
  Department!: string;
  DateOfJoining!: string;
  ProfileFileName!: string;
  PhotoFilePath!: string;

  DepartmentList: any = [];

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList() {
    this.services.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentList = data;

      this.EmployeeId = this.emp.EmployeeId;
      this.EmployeeName = this.emp.EmployeeName;
      this.Department = this.emp.Department;
      this.DateOfJoining = this.emp.DateOfJoining.slice(0,10);
      this.ProfileFileName = this.emp.ProfileFileName;
      this.PhotoFilePath = this.services.photoUrl + this.ProfileFileName;
    })
  }

  addEmployee() {
    if(this.EmployeeId === null || this.EmployeeName === null || this.Department === null || this.DateOfJoining === null ||
      this.EmployeeId === "" || this.EmployeeName === "" || this.Department === "" || this.DateOfJoining === "" ) {
        this.confirm.confirmThis("Please enter all the employee details!", () => {}, () => {});
        return;
      }

    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      ProfileFileName: this.ProfileFileName
    };
      this.services.addEmployee(val).subscribe(res => {
        this.confirm.confirmThis(res.toString(), () => {}, () => {});
        if(res.toString() == "Employee Added Successfully!") {
          this.EmployeeName = '';
          this.Department = '';
          this.DateOfJoining = '';
        }
      });
      

  }

  updateEmployee() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      ProfileFileName: this.ProfileFileName
    };
      this.services.updateEmployee(val).subscribe(res => {
        this.confirm.confirmThis(res.toString(), () => {}, () => {});
      });
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploaddFile',file,file.name)
    this.services.UploadPhoto(formData).subscribe((data: any) => {
      this.ProfileFileName = data.toString();
      this.PhotoFilePath = this.services.photoUrl + this.ProfileFileName;
    })
  }

}
