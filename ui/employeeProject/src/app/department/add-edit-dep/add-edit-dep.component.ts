import { Component, OnInit, Input } from '@angular/core';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {

  constructor(private services: SharedService, private confirm: ConfirmDialogService) { }

  @Input() dep: any;
  DepartmentId!: string;
  DepartmentName!: string;


  ngOnInit(): void {
    this.DepartmentId = this.dep.DepartmentId;
    this.DepartmentName = this.dep.DepartmentName;
  }

  addDepartment() {
    if(this.Validate()) {
      var val = {
        DepartmentId: this.DepartmentId,
        DepartmentName: this.DepartmentName
      };
      this.services.addDepartment(val).subscribe(res => {
        //alert(res.toString());
        this.confirm.confirmThis(res.toString(), function () {    
        }, function () { 
        }); 
      });     
    } else {
      this.DepartmentName = '';
    }
  }

  updateDepartment() {
    if(this.Validate()) {
    var val = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
      this.services.updateDepartment(val).subscribe(res => {
        this.confirm.confirmThis(res.toString(), function () {    
        }, function () { 
        })
      });
    } else {
      this.DepartmentName = '';
    }
  }

  Validate() {
    //Regex for Valid Characters i.e. Alphabets and Numbers.
    var regex = /^[A-Za-z0-9]+$/;

    //Validate TextBox value against the Regex.
    var isValid = regex.test(this.DepartmentName);
    if (!isValid) {
        //alert("Only Alphabets and Numbers allowed.");
        this.confirm.confirmThis("Only alphabets and numbers are allowed in department name", () => {}, () => {});
    }

    return isValid;
}

}
