import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { DataService } from './data.service';
import { StateService } from './state.service';

export const indexesResolver: ResolveFn<boolean> = (route, state) => {
  const stateService = inject(StateService)
  const dataService = inject(DataService)
  const indexesLoaded = stateService.indexes().length;

  if (indexesLoaded) return true;

  return dataService.getIndexes()
    .pipe(
      map(indexes => {
        stateService.setIndexes(indexes)

        return true
      }),
      catchError(() => {
        return of(false)
      })
    );
};
