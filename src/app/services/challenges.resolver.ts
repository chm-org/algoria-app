import { inject } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { DataService } from './data.service';
import { StateService } from './state.service';

export const challengesResolver = (): Observable<boolean> => {
  const stateService = inject(StateService)
  const dataService = inject(DataService)
  const challengesLoaded = stateService.challenges().size;

  if (challengesLoaded) return of(true);

  return dataService.getChallenges()
    .pipe(
      map(challenges => {
        stateService.setChallenges(challenges)

        return true
      }),
      catchError(() => {
        return of(false)
      })
    );
};
