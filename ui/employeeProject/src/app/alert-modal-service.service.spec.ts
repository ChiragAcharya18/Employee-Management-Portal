import { TestBed } from '@angular/core/testing';

import { AlertModalServiceService } from './alert-modal-service.service';

describe('AlertModalServiceService', () => {
  let service: AlertModalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertModalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
