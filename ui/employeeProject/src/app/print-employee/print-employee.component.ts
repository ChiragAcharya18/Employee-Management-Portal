import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';
//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-print-employee',
  templateUrl: './print-employee.component.html',
  styleUrls: ['./print-employee.component.css']
})
export class PrintEmployeeComponent implements OnInit {

  

  constructor(private confirm: ConfirmDialogService) { }

  ngOnInit(): void {
  }


  downloadPdf(Id: any) {
    alert("Download pdf called!" + Id);
  }

  onClickTemp() {
    this.confirm.confirmThis("Are you sure to delete?", function () {  
      alert("Yes clicked");  
    }, function () {  
      alert("No clicked");  
    });
  }

}
