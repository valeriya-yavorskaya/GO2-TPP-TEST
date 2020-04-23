import { Action } from '@ngrx/store';

export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_ERROR = 'USER_INFO_ERROR';

export class UserInfoRequest implements Action {
  readonly type = USER_INFO_REQUEST;
  constructor() {}
}

export class UserInfoSuccess implements Action {
  readonly type = USER_INFO_SUCCESS;
  constructor(public payload: any) { }
}

export class UserInfoError implements Action {
  readonly type = USER_INFO_ERROR;
  constructor(public payload: any) {}
}
