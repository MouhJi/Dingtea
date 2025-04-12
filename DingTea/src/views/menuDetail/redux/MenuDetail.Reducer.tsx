import {IProductRequest} from 'services';
import {IAppAction} from 'views/app/redux';
import {IMenuDetailState} from './MenuDetail.Type';

export const MENU_DETAIL_ACTION = {
  IS_REFRESH: 'DINGTEA/MENU/DETAIL/IS/REFRESH',

  GET: 'DINGTEA/MENU/DETAIL/GET',
  SUCCESS: 'DINGTEA/MENU/DETAIL/SUCCESS',
  FAIL: 'DINGTEA/MENU/DETAIL/FAIL',

  IS_LOADMORE: 'DINGTEA/MENU/DETAIL/IS/LOADMORE',
  RESET: 'DINGTEA/MENU/DETAIL/RESET'
};

export function getListProducts(params: IProductRequest) {
  return {
    type: MENU_DETAIL_ACTION.GET,
    payload: {
      params
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IMenuDetailState> {
  return {
    type: MENU_DETAIL_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<IMenuDetailState> {
  return {
    type: MENU_DETAIL_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

export function reset(): IAppAction<IMenuDetailState> {
  return {
    type: MENU_DETAIL_ACTION.RESET,
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

const MenuDetailReducer = (
  state: IMenuDetailState = {
    isFirstLoading: true,
    isRefresh: false,
    data: [],
    isLoadmore: false,
    isStop: false
  },
  action: IAppAction<IMenuDetailState>
): IMenuDetailState => {
  switch (action.type) {
    case MENU_DETAIL_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case MENU_DETAIL_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case MENU_DETAIL_ACTION.SUCCESS:
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

    case MENU_DETAIL_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadmore: false,
        message: action.payload?.message,
        isError: true
      };

    case MENU_DETAIL_ACTION.RESET:
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
export default MenuDetailReducer;
