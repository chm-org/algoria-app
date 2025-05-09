import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { indexesResolver } from './indexes.resolver';

xdescribe('indexesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => indexesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
