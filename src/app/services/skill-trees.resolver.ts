import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { DataService } from './data.service';
import { StateService } from './state.service';

export const skillTreesResolver: ResolveFn<boolean> = (route, state) => {
  const stateService = inject(StateService)
  const dataService = inject(DataService)
  const skillTreesLoaded = stateService.skillTrees().length;

  if (skillTreesLoaded) return true;

  return dataService.getSkillTrees()
    .pipe(
      map(trees => {
        stateService.setSkillTrees(trees)

        return true
      }),
      catchError(() => {
        return of(false)
      })
    );
};
