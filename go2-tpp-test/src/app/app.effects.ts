import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as loginActions from './login/login.actions';

export interface OAuthResponse {
  access_token: string;
  scope: string;
  token_type: string;
}

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  private AUTH_URL = '/api';
  private URL = 'https://api.github.com';
  private CLIENT_ID = '03d3e02b94abe627d8ce';
  private CLIENT_SECRET = 'bb2af8aa74eb6a1dd7a7d327782f4b5981bd3723';

  @Effect()
  auth$: Observable<any> = this.actions$.pipe(
    ofType(loginActions.AUTH_REQUEST),
    switchMap(() => {
      return new Observable(() => {
        window.open(`${this.AUTH_URL}/authorize?client_id=${this.CLIENT_ID}`);
      });
    })
  );

  @Effect()
  login$: Observable<any> = this.actions$.pipe(
    ofType(loginActions.LOGIN_REQUEST),
    switchMap((action: any) => {
      return this.http.post(
        `${this.AUTH_URL}/access_token?` +
        `client_id=${this.CLIENT_ID}&` +
        `client_secret=${this.CLIENT_SECRET}&` +
        `code=` + action.payload,
        {},
        {
          headers: {
            Accept: 'application/json',
          }
        }
      ).pipe(
          map( (res: OAuthResponse) => {
            const { access_token } = res;
            return access_token ? new loginActions.LoginSuccess(access_token) : new loginActions.LoginError('The code passed is incorrect or expired.');
          }),
          catchError(err => of(new loginActions.LoginError(err)))
        );
    }, ),
  );
}
