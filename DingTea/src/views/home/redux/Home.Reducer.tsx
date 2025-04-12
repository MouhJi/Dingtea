import {IProductRequest} from 'services';
import {IAppAction} from 'views/app/redux';
import {IHomeState} from './Home.Type';

export const HOME_ACTION = {
  IS_REFRESH: 'DINGTEA/HOME/IS/REFRESH',

  GET: 'DINGTEA/HOME/GET',
  SUCCESS: 'DINGTEA/HOME/SUCCESS',
  FAIL: 'DINGTEA/HOME/FAIL',

  IS_LOADMORE: 'DINGTEA/HOME/IS/LOADMORE'
};

export function getListProductHome(params: IProductRequest) {
  return {
    type: HOME_ACTION.GET,
    payload: {
      params
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IHomeState> {
  return {
    type: HOME_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<IHomeState> {
  return {
    type: HOME_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

export function showSuccess(): IAppAction<IHomeState> {
  return {
    type: HOME_ACTION.SUCCESS,
    payload: {
      data: [],
      isStop: true
    }
  };
}

const HomeReducer = (
  state: IHomeState = {
    isFirstLoading: true,
    isRefresh: false,
    data: [],
    isLoadmore: false,
    isStop: false
  },
  action: IAppAction<IHomeState>
): IHomeState => {
  switch (action.type) {
    case HOME_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case HOME_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case HOME_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          data: action.payload?.data,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          data: state.data?.concat(action.payload?.data || []),
          isStop: action.payload?.isStop
        };
      }

    case HOME_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadmore: false,
        message: action.payload?.message,
        isError: true
      };

    default:
      return state;
  }
};
export default HomeReducer;
