import { TestBed, inject } from '@angular/core/testing';

import { AddDriverService } from './add-driver.service';

describe('AddDriverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddDriverService]
    });
  });

  it('should be created', inject([AddDriverService], (service: AddDriverService) => {
    expect(service).toBeTruthy();
  }));
});
