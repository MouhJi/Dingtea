import {IOderRequest} from 'services';
import {IAppAction} from 'views/app/redux';
import {ITabWaittingState} from './TabWaitting.Type';

export const TAB_WAITTING_ACTION = {
  IS_REFRESH: 'DINGTEA/TAB/WAITTING/IS/REFRESH',

  GET: 'DINGTEA/TAB/WAITTING/GET',
  SUCCESS: 'DINGTEA/TAB/WAITTING/SUCCESS',
  FAIL: 'DINGTEA/TAB/WAITTING/FAIL',

  IS_LOADMORE: 'DINGTEA/TAB/WAITTING/IS/LOADMORE'
};

export function getListOrdersWaitting(params: IOderRequest) {
  return {
    type: TAB_WAITTING_ACTION.GET,
    payload: {
      params
    }
  };
}

export function showRefreshWaitting(isRefresh: boolean): IAppAction<ITabWaittingState> {
  return {
    type: TAB_WAITTING_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<ITabWaittingState> {
  return {
    type: TAB_WAITTING_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

const OrderWaittingReducer = (
  state: ITabWaittingState = {
    isFirstLoading: true,
    isRefresh: false,
    data: [],
    isLoadmore: false,
    isStop: false,
    skip: 0
  },
  action: IAppAction<ITabWaittingState>
): ITabWaittingState => {
  switch (action.type) {
    case TAB_WAITTING_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case TAB_WAITTING_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case TAB_WAITTING_ACTION.SUCCESS:
      if (action.payload?.skip === 0) {
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

    case TAB_WAITTING_ACTION.FAIL:
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
export default OrderWaittingReducer;
