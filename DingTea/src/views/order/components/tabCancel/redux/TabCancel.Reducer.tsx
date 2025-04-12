import {IOderRequest} from 'services';
import {IAppAction} from 'views/app/redux';
import {ITabCancelState} from './TabCancel.Type';

export const TAB_CANCEL_ACTION = {
  IS_REFRESH: 'DINGTEA/TAB/CANCEL/IS/REFRESH',

  GET: 'DINGTEA/TAB/CANCEL/GET',
  SUCCESS: 'DINGTEA/TAB/CANCEL/SUCCESS',
  FAIL: 'DINGTEA/TAB/CANCEL/FAIL',

  IS_LOADMORE: 'DINGTEA/TAB/CANCEL/IS/LOADMORE'
};

export function getListOrdersCancel(params: IOderRequest) {
  return {
    type: TAB_CANCEL_ACTION.GET,
    payload: {
      params
    }
  };
}

export function showRefreshCancel(isRefresh: boolean): IAppAction<ITabCancelState> {
  return {
    type: TAB_CANCEL_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<ITabCancelState> {
  return {
    type: TAB_CANCEL_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

const OrderCancelReducer = (
  state: ITabCancelState = {
    isFirstLoading: true,
    isRefresh: false,
    data: [],
    isLoadmore: false,
    isStop: false,
    skip: 0
  },
  action: IAppAction<ITabCancelState>
): ITabCancelState => {
  switch (action.type) {
    case TAB_CANCEL_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case TAB_CANCEL_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case TAB_CANCEL_ACTION.SUCCESS:
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

    case TAB_CANCEL_ACTION.FAIL:
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
export default OrderCancelReducer;
