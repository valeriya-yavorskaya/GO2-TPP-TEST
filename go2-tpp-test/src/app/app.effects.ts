import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import * as loginActions from './login/login.actions';
import * as dashboardActions from './dashboard/dashboard.actions';
import { selectAccessToken } from './reducers/login.reducer';
import { UserInfoRequest, UserReposRequest } from './dashboard/dashboard.actions';
import { Router } from '@angular/router';

export interface OAuthResponse {
  access_token: string;
  scope: string;
  token_type: string;
}

export interface UserInfoResponse {
  avatar_url: string;
  name: string;
  repos_url: string;
}

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<any>, private router: Router) {}

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
            return access_token ?
              new loginActions.LoginSuccess(access_token) :
              new loginActions.LoginError('The code passed is incorrect or expired.');
          }),
          catchError(err => of(new loginActions.LoginError(err)))
        );
    }, ),
  );

  @Effect()
  loginSuccess$: Observable<any> = this.actions$.pipe(
    ofType(loginActions.LOGIN_SUCCESS),
    switchMap(() => [new UserInfoRequest(), new UserReposRequest()])
  );

  @Effect()
  loginError$: Observable<any> = this.actions$.pipe(
    ofType(loginActions.LOGIN_ERROR),
    switchMap((action: any) => {
      return new Observable(() => {
        this.router.navigate(['/login-page']);
      });
    })
  );

  @Effect()
  userInfo$: Observable<any> = this.actions$.pipe(
    ofType(dashboardActions.USER_INFO_REQUEST),
    withLatestFrom(this.store.pipe(select(selectAccessToken))),
    switchMap(([action, accessToken]: [any, string]) => {
      return this.http.get(
        `${this.URL}/user?` +
        `access_token=` + accessToken,
        {
          headers: {
            Accept: 'application/json',
          }
        }
      ).pipe(
        map( (res: UserInfoResponse) => {
          const { avatar_url, name } = res;
          return new dashboardActions.UserInfoSuccess({avatar_url, name});
        }),
        catchError(err => of(new dashboardActions.UserInfoError(err)))
      );
    }, ),
  );

  @Effect()
  userRepos$: Observable<any> = this.actions$.pipe(
    ofType(dashboardActions.USER_REPOS_REQUEST),
    withLatestFrom(this.store.pipe(select(selectAccessToken))),
    switchMap(([action, accessToken]: [any, string]) => {
      return this.http.get(
        `${this.URL}/user/repos?` +
        `access_token=` + accessToken,
        {
          headers: {
            Accept: 'application/json',
          }
        }
      ).pipe(
        map( (res: UserInfoResponse) => {
          return new dashboardActions.UserReposSuccess(res);
        }),
        catchError(err => of(new dashboardActions.UserReposError(err)))
      );
    }, ),
  );

  @Effect()
  userRepoContributors$: Observable<any> = this.actions$.pipe(
    ofType(dashboardActions.USER_REPO_CONTRIB_REQUEST),
    withLatestFrom(this.store.pipe(select(selectAccessToken))),
    switchMap(([action, accessToken]: [any, string]) => {
      const { name, login } = action.payload;
      return this.http.get(
        `${this.URL}/repos/${login}/${name}/contributors?` +
        `access_token=` + accessToken,
        {
          headers: {
            Accept: 'application/json',
          }
        }
      ).pipe(
        map( (res: UserInfoResponse) => {
          return new dashboardActions.UserRepoContribSuccess(res);
        }),
        catchError(err => of(new dashboardActions.UserRepoContribError(err)))
      );
    }),
  );
}
