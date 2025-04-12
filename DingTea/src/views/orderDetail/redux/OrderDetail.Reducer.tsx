import {IAppAction} from 'views/app/redux';
import {IOrderDetailState} from './OrderDetail.Type';

export const ORDER_DETAIL_ACTION = {
  IS_FIRST_LOADING: 'DINGTEA/ORDER/DETAIL/IS/FIRST/LOADING',
  IS_REFRESH: 'DINGTEA/ORDER/DETAIL/IS/REFRESH',

  GET: 'DINGTEA/ORDER/DETAIL/GET',
  SUCCESS: 'DINGTEA/ORDER/DETAIL/SUCCESS',
  FAIL: 'DINGTEA/ORDER/DETAIL/FAIL',

  RESET: 'DINGTEA/ORDER/DETAIL/RESET'
};

export function showFirstLoading(isFirstLoading: boolean): IAppAction<IOrderDetailState> {
  return {
    type: ORDER_DETAIL_ACTION.IS_FIRST_LOADING,
    payload: {
      isFirstLoading
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IOrderDetailState> {
  return {
    type: ORDER_DETAIL_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function getOrderDetail(id: number) {
  return {
    type: ORDER_DETAIL_ACTION.GET,
    payload: {
      id
    }
  };
}

export function reset(): IAppAction<IOrderDetailState> {
  return {
    type: ORDER_DETAIL_ACTION.RESET,
    payload: {
      isFirstLoading: true,
      isRefresh: false,
      orderDetail: undefined,
      message: undefined
    }
  };
}

const OrderDetailReducer = (
  state: IOrderDetailState = {isFirstLoading: true, isRefresh: false},
  action: IAppAction<IOrderDetailState>
): IOrderDetailState => {
  switch (action.type) {
    case ORDER_DETAIL_ACTION.IS_FIRST_LOADING:
      return {
        ...state,
        isFirstLoading: action.payload?.isFirstLoading
      };
    case ORDER_DETAIL_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };
    case ORDER_DETAIL_ACTION.SUCCESS:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        orderDetail: action.payload?.orderDetail
      };
    case ORDER_DETAIL_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        message: action.payload?.message
      };

    case ORDER_DETAIL_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: action.payload?.isFirstLoading,
        isRefresh: action.payload?.isRefresh,
        orderDetail: action.payload?.orderDetail,
        message: action.payload?.message
      };
    default:
      return state;
  }
};

export default OrderDetailReducer;
