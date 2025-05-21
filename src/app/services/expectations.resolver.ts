import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { DataService } from './data.service';
import { StateService } from './state.service';

export const expectationsResolver: ResolveFn<boolean> = (route, state) => {
  const stateService = inject(StateService)
  const dataService = inject(DataService)
  const expectationsLoaded = stateService.expectations().length;

  if (expectationsLoaded) return true;

  return dataService.getExpectations()
    .pipe(
      map(expectations => {
        stateService.setExpectations(expectations)

        return true
      }),
      catchError(() => {
        return of(false)
      })
    );
};
