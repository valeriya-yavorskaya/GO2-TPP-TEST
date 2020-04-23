import * as dashboardActions from '../dashboard/dashboard.actions';

export interface UserInfo {
  avatar_url: string;
  name: string;
  inProgress: boolean;
  error?: string;
}

export interface UserRepos {
  repos: Array<any>;
  inProgress: boolean;
  error?: string;
  selectedRepo: object;
}

export interface DashboardState {
  userInfo: UserInfo;
  userRepos: UserRepos;
}

const initialState: DashboardState = {
  userInfo: {
    avatar_url: '',
    name: '',
    inProgress: true,
    error: '',
  },
  userRepos: {
    inProgress: true,
    repos: [],
    selectedRepo: null,
  },
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
    case dashboardActions.USER_REPOS_REQUEST:
      return {
        ...state,
        userRepos: {
          ...state.userRepos,
          inProgress: true
        },
      };
    case dashboardActions.USER_REPOS_SUCCESS:
      return {
        ...state,
        userRepos: {
          ...state.userRepos,
          repos: action.payload,
          inProgress: false,
        },
      };
    case dashboardActions.USER_REPOS_ERROR:
      return {
        ...state,
        userRepos: {
          ...state.userRepos,
          inProgress: false,
          error: action.payload,
        }
      };
    case dashboardActions.USER_REPO_SELECTED:
      return {
        ...state,
        userRepos: {
          ...state.userRepos,
          selectedRepo: selectRepoById(state.userRepos.repos, action.payload),
        },
      };
    case dashboardActions.USER_REPO_CONTRIB_REQUEST:
      return {
        ...state,
        userRepos: {
          ...state.userRepos,
          inProgress: true
        },
      };
    case dashboardActions.USER_REPO_CONTRIB_SUCCESS:
      return {
        ...state,
        userRepos: {
          ...state.userRepos,
          selectedRepo: {
            ...state.userRepos.selectedRepo,
            contributors: makeContributorsNamesList(action.payload),
          },
          inProgress: false,
        },
      };
    case dashboardActions.USER_REPO_CONTRIB_ERROR:
      return {
        ...state,
        userRepos: {
          ...state.userRepos,
          inProgress: false,
          error: action.payload,
        }
      };
    default:
      return state;
  }
}

function selectRepoById(repos, id) {
  return repos.find((repo) => {
    return repo.id === id;
  });
}

function makeContributorsNamesList(contribList) {
  return contribList.map(contrib => contrib.login);
}

export const selectUserInfo = state => {
  return state && state.dashboard && state.dashboard.userInfo;
};

export const selectUserRepos = state => {
  return state && state.dashboard && state.dashboard.userRepos;
};

export const selectSelectedRepo = state => {
  return state && state.dashboard && state.dashboard.userRepos && state.dashboard.userRepos.selectedRepo;
};
