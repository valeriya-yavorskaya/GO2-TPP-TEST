import { Action } from '@ngrx/store';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export class AuthRequest implements Action {
  readonly type = AUTH_REQUEST;
  constructor() {}
}

export class LoginRequest implements Action {
  readonly type = LOGIN_REQUEST;
  constructor(public payload: string) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: string) { }
}

export class LoginError implements Action {
  readonly type = LOGIN_ERROR;
  constructor(public payload: any) {}
}
