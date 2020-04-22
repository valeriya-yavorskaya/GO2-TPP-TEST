import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as loginActions from './login/login.actions';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  private AUTH_URL = 'https://github.com/login/oauth';
  private URL = 'https://api.github.com';
  private LOCAL_STORAGE_KEY = 'code';
  private CLIENT_ID = '03d3e02b94abe627d8ce';
  private CLIENT_SECRET = 'bb2af8aa74eb6a1dd7a7d327782f4b5981bd3723';

  @Effect()
  auth$: Observable<any> = this.actions$.pipe(
    ofType(loginActions.AUTH_REQUEST),
    switchMap(() => {
      return new Observable(() => {
        window.open(this.AUTH_URL + '/authorize?' + 'client_id=' + this.CLIENT_ID);
      });
    })
  );

  @Effect()
  login$: Observable<any> = this.actions$.pipe(
    ofType(loginActions.LOGIN_REQUEST),
    switchMap((action: any) => {
      return this.http.post('/api/access_token?' +
        'client_id=03d3e02b94abe627d8ce&' +
        'client_secret=bb2af8aa74eb6a1dd7a7d327782f4b5981bd3723&' +
        'code=' + action.payload, {}
      ).pipe(
          map((data: any) => {
            console.log(data);
            // localStorage.setItem(this.LOCAL_STORAGE_KEY, data.access_token);
            return new loginActions.LoginSuccess(data);
          }),
          catchError(err => of(new loginActions.LoginError(err)))
        );
    })
  );
}
