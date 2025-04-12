import {IVoucherRequest} from 'services';
import {IAppAction} from 'views/app/redux';
import {IVoucherState} from './Voucher.Type';

export const VOUCHER_ACTION = {
  IS_REFRESH: 'DINGTEA/VOUCHER/IS/REFRESH',

  GET: 'DINGTEA/VOUCHER/GET',
  SUCCESS: 'DINGTEA/VOUCHER/SUCCESS',
  FAIL: 'DINGTEA/VOUCHER/FAIL',

  IS_LOADMORE: 'DINGTEA/VOUCHER/IS/LOADMORE',
  RESET: 'DINGTEA/VOUCHER/RESET'
};

export function getListVouchers(params: IVoucherRequest) {
  return {
    type: VOUCHER_ACTION.GET,
    payload: {
      params
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IVoucherState> {
  return {
    type: VOUCHER_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<IVoucherState> {
  return {
    type: VOUCHER_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

export function reset(): IAppAction<IVoucherState> {
  return {
    type: VOUCHER_ACTION.RESET,
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

const VoucherReducer = (
  state: IVoucherState = {
    isFirstLoading: true,
    isRefresh: false,
    data: [],
    isLoadmore: false,
    isStop: false
  },
  action: IAppAction<IVoucherState>
): IVoucherState => {
  switch (action.type) {
    case VOUCHER_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case VOUCHER_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case VOUCHER_ACTION.SUCCESS:
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

    case VOUCHER_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadmore: false,
        message: action.payload?.message,
        isError: true
      };

    case VOUCHER_ACTION.RESET:
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
export default VoucherReducer;
