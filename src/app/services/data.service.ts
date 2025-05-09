import { Injectable } from '@angular/core';
import { Challenge, ChallengeIndex } from 'algoria-utils';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getChallenges(): Observable<Challenge[]> {
    const url = `${environment.apiUrl}/challenges/index.json`;

    return this.http.get<Challenge[]>(url).pipe(
      catchError(error => {
        console.error('Failed to load challenges', error);

        throw error
      })
    );
  }

  getIndexes(): Observable<ChallengeIndex[]> {
    const url = `${environment.apiUrl}/indexes/index.json`;

    return this.http.get<ChallengeIndex[]>(url).pipe(
      catchError(error => {
        console.error('Failed to load indexes', error);

        throw error
      })
    );
  }
}
