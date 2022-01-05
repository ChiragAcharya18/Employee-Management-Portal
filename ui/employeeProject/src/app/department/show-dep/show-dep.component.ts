import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, of  } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private services: SharedService, private _r: Router, private confirm: ConfirmDialogService) { 
    if(services.isLogin == false) {
      _r.navigateByUrl("/login")
    }
  }

  DepartmentList!: any;
  ModalTitle: string | undefined;
  ActivateAddEditDepComp: boolean = false;
  dep: any;
  errorMsg!: string;
  DepartmentIdFilter: string = "";
  DepartmentNameFilter: string = "";
  DepartmentListWithoutFilter: any = [];
  isLogin!: boolean;


  ngOnInit(): void {
    this.DepartmentList = null;
    this.refreshDepList();
    var temp = localStorage.getItem("isLogin");
    this.isLogin = (temp === "pass")? true: false;
    
  }

  refreshDepList() {  
      this.services.getDepList()
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
      .subscribe((data: any) => {
        this.DepartmentList = null;
        if(data === true) {
          setTimeout(() => {
            this.refreshDepList();
          }, 5000)
        } else {
          this.DepartmentList = data;
          this.DepartmentListWithoutFilter = data;
        }
      });

  }

  FilterFn() {
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;
    this.DepartmentList = this.DepartmentListWithoutFilter.filter((data: any) => {
      return data.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      ) && data.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      )
    })
  }

  sortResult(prop: any, order: boolean) {
      this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a:  any,b: any){
        if(order) {
          return (a[prop]>b[prop])? 1: ((a[prop]<b[prop])? -1:0);
        } else {
          return (b[prop]>a[prop])? 1: ((b[prop]<a[prop])? -1:0);
        }
      })
  }

  addClick() {
      this.dep = {
        DepartmentId: 0,
        DepartmentName: ""
      };
      this.ModalTitle = "Add Department";
      this.ActivateAddEditDepComp = true;
  }
  closeClick() {
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();
  }
  editClick(item: any) {
    this.dep = item;
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepComp = true;
  }

  deleteClick(item: any) {

    this.confirm.confirmThis("Are you sure?", () => {
      this.services.deleteDepartment(item.DepartmentId).subscribe(data => {
        this.confirm.confirmThis(data.toString(), () => {}, () => {});
        this.refreshDepList();
      })
    }, () => {});
  }

}
