import {IOderRequest} from 'services';
import {IAppAction} from 'views/app/redux';
import {ITabShippingState} from './TabShipping.Type';

export const TAB_SHIPPING_ACTION = {
  IS_REFRESH: 'DINGTEA/TAB/SHIPPING/IS/REFRESH',

  GET: 'DINGTEA/TAB/SHIPPING/GET',
  SUCCESS: 'DINGTEA/TAB/SHIPPING/SUCCESS',
  FAIL: 'DINGTEA/TAB/SHIPPING/FAIL',

  IS_LOADMORE: 'DINGTEA/TAB/SHIPPING/IS/LOADMORE'
};

export function getListOrdersShipping(params: IOderRequest) {
  return {
    type: TAB_SHIPPING_ACTION.GET,
    payload: {
      params
    }
  };
}

export function showRefreshShipping(isRefresh: boolean): IAppAction<ITabShippingState> {
  return {
    type: TAB_SHIPPING_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<ITabShippingState> {
  return {
    type: TAB_SHIPPING_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

const OrderShippingReducer = (
  state: ITabShippingState = {
    isFirstLoading: true,
    isRefresh: false,
    data: [],
    isLoadmore: false,
    isStop: false,
    skip: 0
  },
  action: IAppAction<ITabShippingState>
): ITabShippingState => {
  switch (action.type) {
    case TAB_SHIPPING_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case TAB_SHIPPING_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case TAB_SHIPPING_ACTION.SUCCESS:
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

    case TAB_SHIPPING_ACTION.FAIL:
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
export default OrderShippingReducer;
