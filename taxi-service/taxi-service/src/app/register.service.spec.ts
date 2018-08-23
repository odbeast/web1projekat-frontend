import { TestBed, inject } from '@angular/core/testing';

import { UserRegisterService } from './register.service';

describe('RegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRegisterService]
    });
  });

  it('should be created', inject([UserRegisterService], (service: UserRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
