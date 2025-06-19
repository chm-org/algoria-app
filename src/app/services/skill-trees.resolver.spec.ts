import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { skillTreesResolver } from './skill-trees.resolver';

xdescribe('skillTreesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => skillTreesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
