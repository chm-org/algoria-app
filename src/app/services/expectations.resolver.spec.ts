import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { expectationsResolver } from './expectations.resolver';

describe('expectationsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => expectationsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
