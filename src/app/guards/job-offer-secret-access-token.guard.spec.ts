import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { jobOfferSecretAccessTokenGuard } from './job-offer-secret-access-token.guard';

describe('jobOfferSecretAccessTokenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => jobOfferSecretAccessTokenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
