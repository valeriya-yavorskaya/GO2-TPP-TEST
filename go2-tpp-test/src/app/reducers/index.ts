import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { loginReducer, LoginState } from './login.reducer';

export interface State {
  login: LoginState;
}

export const reducers: ActionReducerMap<State> = {
  login: loginReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
