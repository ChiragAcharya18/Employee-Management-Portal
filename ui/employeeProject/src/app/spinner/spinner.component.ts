//import { flatten } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  showSpinner: boolean = false;


  constructor(private spinner: SpinnerService, private cdRef: ChangeDetectorRef ) {
    
   }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.spinner.getSpinnerObserver().subscribe((status) => {
        if(status === 'start') {
          this.showSpinner = true;
        } else {
          this.showSpinner = false;
        }
        this.cdRef.detectChanges();
    });
  }

}
