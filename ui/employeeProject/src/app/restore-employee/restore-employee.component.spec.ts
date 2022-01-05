import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreEmployeeComponent } from './restore-employee.component';

describe('RestoreEmployeeComponent', () => {
  let component: RestoreEmployeeComponent;
  let fixture: ComponentFixture<RestoreEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoreEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
