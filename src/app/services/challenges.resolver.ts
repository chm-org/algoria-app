import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, map, NEVER, Observable, of } from 'rxjs';
import { DataService } from './data.service';
import { StateService } from './state.service';

export const challengesResolver: ResolveFn<boolean | Observable<boolean>> = (route, state) => {
  const stateService = inject(StateService)
  const dataService = inject(DataService)
  const challengesLoaded = stateService.challenges().size;

  if (challengesLoaded) return true;

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
