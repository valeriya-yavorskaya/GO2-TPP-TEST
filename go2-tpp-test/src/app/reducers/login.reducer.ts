import * as loginActions from '../login/login.actions';

export interface LoginState {
  inProgress: boolean;
  access_token: string;
  error: string;
}

const initialState: LoginState = {
  inProgress: false,
  access_token: '',
  error: null,
};

export function loginReducer(state: LoginState = initialState, action: any) {
  switch (action.type) {
    case loginActions.LOGIN_REQUEST:
      return {
        ...state,
        inProgress: true
      };
    case loginActions.LOGIN_SUCCESS:
      return {
        ...state,
        access_token: action.payload,
        inProgress: false,
        error: null,
      };
    case loginActions.LOGIN_ERROR:
      return {
        ...state,
        inProgress: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const selectAccessToken = state => {
  return state && state.login && state.login.access_token;
};

export const selectIsError = state => {
  return state && state.login && state.login.error;
};
