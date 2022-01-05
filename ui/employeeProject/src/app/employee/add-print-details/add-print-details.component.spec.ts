import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrintDetailsComponent } from './add-print-details.component';

describe('AddPrintDetailsComponent', () => {
  let component: AddPrintDetailsComponent;
  let fixture: ComponentFixture<AddPrintDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrintDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrintDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
