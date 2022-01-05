import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintEmployeeComponent } from './print-employee.component';

describe('PrintEmployeeComponent', () => {
  let component: PrintEmployeeComponent;
  let fixture: ComponentFixture<PrintEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
