import {SHIPPING_METHOD} from 'common/Constants';
import {ICartShipModel} from 'models';

import {IProductRequest} from 'services';
import {IAppAction} from 'views/app/redux';
import {IDoUongState} from './DoUong.Type';

export const DO_UONG_ACTION = {
  SHIPPING_METHOD: 'DINGTEA/DO/UONG/SHIPPING/METHOD',

  IS_REFRESH: 'DINGTEA/DO/UONG/IS/REFRESH',

  GET: 'DINGTEA/DO/UONG/GET',
  SUCCESS: 'DINGTEA/DO/UONG/SUCCESS',
  FAIL: 'DINGTEA/DO/UONG/FAIL',

  IS_LOADMORE: 'DINGTEA/DO/UONG/IS/LOADMORE',
  RESET: 'DINGTEA/DO/UONG/RESET'
};

export function changeShippingMethod(shipping: ICartShipModel): IAppAction<IDoUongState> {
  return {
    type: DO_UONG_ACTION.SHIPPING_METHOD,
    payload: {
      shipping: shipping
    }
  };
}

export function getListProducts(params: IProductRequest) {
  return {
    type: DO_UONG_ACTION.GET,
    payload: {
      params
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IDoUongState> {
  return {
    type: DO_UONG_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<IDoUongState> {
  return {
    type: DO_UONG_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

export function reset(): IAppAction<IDoUongState> {
  return {
    type: DO_UONG_ACTION.RESET,
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

const DoUongReducer = (
  state: IDoUongState = {
    shipping: SHIPPING_METHOD[0],
    isFirstLoading: true,
    isRefresh: false,
    data: [],
    isLoadmore: false,
    isStop: false
  },
  action: IAppAction<IDoUongState>
): IDoUongState => {
  switch (action.type) {
    case DO_UONG_ACTION.SHIPPING_METHOD:
      return {...state, shipping: action.payload?.shipping || SHIPPING_METHOD[0]};

    case DO_UONG_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case DO_UONG_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case DO_UONG_ACTION.SUCCESS:
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

    case DO_UONG_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadmore: false,
        message: action.payload?.message,
        isError: true
      };

    case DO_UONG_ACTION.RESET:
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
export default DoUongReducer;
