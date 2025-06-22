import { inject } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { DataService } from './data.service';
import { StateService } from './state.service';

export const indexesResolver = (): Observable<boolean> => {
  const stateService = inject(StateService)
  const dataService = inject(DataService)
  const indexesLoaded = stateService.indexes().length;

  if (indexesLoaded) return of(true);

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
