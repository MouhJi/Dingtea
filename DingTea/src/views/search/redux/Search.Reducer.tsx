import {IProductRequest} from 'services';
import {IAppAction} from 'views/app/redux';
import {ISearchState} from './Search.Type';

export const SEARCH_ACTION = {
  IS_REFRESH: 'DINGTEA/SEARCH/IS/REFRESH',

  GET: 'DINGTEA/SEARCH/GET',
  SUCCESS: 'DINGTEA/SEARCH/SUCCESS',
  FAIL: 'DINGTEA/SEARCH/FAIL',

  IS_LOADMORE: 'DINGTEA/SEARCH/IS/LOADMORE',
  RESET: 'DINGTEA/SEARCH/RESET'
};

export function searchListProduct(params: IProductRequest) {
  return {
    type: SEARCH_ACTION.GET,
    payload: {
      params
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<ISearchState> {
  return {
    type: SEARCH_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<ISearchState> {
  return {
    type: SEARCH_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

export function reset(): IAppAction<ISearchState> {
  return {
    type: SEARCH_ACTION.RESET,
    payload: {
      isFirstLoading: true,
      isRefresh: false,
      data: [],
      isLoadmore: false,
      isStop: false,
      message: undefined
    }
  };
}

const SearchReducer = (
  state: ISearchState = {
    isFirstLoading: true,
    isRefresh: false,
    data: [],
    isLoadmore: false,
    isStop: false
  },
  action: IAppAction<ISearchState>
): ISearchState => {
  switch (action.type) {
    case SEARCH_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case SEARCH_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case SEARCH_ACTION.SUCCESS:
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

    case SEARCH_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadmore: false,
        message: action.payload?.message,
        isError: true
      };

    case SEARCH_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: action.payload?.isFirstLoading,
        isRefresh: action.payload?.isRefresh,
        data: action.payload?.data,
        isLoadmore: action.payload?.isLoadmore,
        isStop: action.payload?.isStop,
        message: action.payload?.message
      };

    default:
      return state;
  }
};
export default SearchReducer;
