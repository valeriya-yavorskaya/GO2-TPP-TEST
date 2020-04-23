import * as dashboardActions from '../dashboard/dashboard.actions';

export interface UserInfo {
  avatar_url: string;
  name: string;
  repos_url: string;
  inProgress: boolean;
  error?: string;
}

export interface DashboardState {
  userInfo: UserInfo;
  userRepos: Array<any>;
}

const initialState: DashboardState = {
  userInfo: {
    avatar_url: '',
    name: '',
    repos_url: '',
    inProgress: false,
    error: '',
  },
  userRepos: [],
};

export function dashboardReducer(state: DashboardState = initialState, action: any) {
  switch (action.type) {
    case dashboardActions.USER_INFO_REQUEST:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          inProgress: true
        },
      };
    case dashboardActions.USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          avatar_url: action.payload.avatar_url,
          name: action.payload.name,
          repos_url: action.payload.repos_url,
          inProgress: false,
        },
      };
    case dashboardActions.USER_INFO_ERROR:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          inProgress: false,
          error: action.payload,
        }
      };
    default:
      return state;
  }
}
export const selectUserInfo = state => {
  return state && state.dashboard && state.dashboard.userInfo;
};

export const selectReposUrl = state => {
  return state && state.dashboard && state.dashboard.userInfo && state.dashboard.userInfo.repos_url;
};

