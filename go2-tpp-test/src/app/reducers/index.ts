import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { loginReducer, LoginState } from './login.reducer';
import { dashboardReducer, DashboardState } from './dashboard.reducer';

export interface State {
  login: LoginState;
  dashboard: DashboardState;
}

export const reducers: ActionReducerMap<State> = {
  login: loginReducer,
  dashboard: dashboardReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
