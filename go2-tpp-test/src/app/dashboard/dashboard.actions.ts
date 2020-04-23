import { Action } from '@ngrx/store';

export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_ERROR = 'USER_INFO_ERROR';

export const USER_REPOS_REQUEST = 'USER_REPOS_REQUEST';
export const USER_REPOS_SUCCESS = 'USER_REPOS_SUCCESS';
export const USER_REPOS_ERROR = 'USER_REPOS_ERROR';

export const USER_REPO_SELECTED = 'USER_REPO_SELECTED';

export const USER_REPO_CONTRIB_REQUEST = 'USER_REPO_CONTRIB_REQUEST';
export const USER_REPO_CONTRIB_SUCCESS = 'USER_REPO_CONTRIB_SUCCESS';
export const USER_REPO_CONTRIB_ERROR = 'USER_REPO_CONTRIB_ERROR';

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

export class UserReposRequest implements Action {
  readonly type = USER_REPOS_REQUEST;
  constructor() {}
}

export class UserReposSuccess implements Action {
  readonly type = USER_REPOS_SUCCESS;
  constructor(public payload: any) { }
}

export class UserReposError implements Action {
  readonly type = USER_REPOS_ERROR;
  constructor(public payload: any) {}
}

export class UserRepoSelected implements Action {
  readonly type = USER_REPO_SELECTED;
  constructor(public payload: string) {}
}

export class UserRepoContribRequest implements Action {
  readonly type = USER_REPO_CONTRIB_REQUEST;
  constructor(public payload: any) {}
}

export class UserRepoContribSuccess implements Action {
  readonly type = USER_REPO_CONTRIB_SUCCESS
  constructor(public payload: any) { }
}

export class UserRepoContribError implements Action {
  readonly type = USER_REPO_CONTRIB_ERROR;
  constructor(public payload: any) {}
}
