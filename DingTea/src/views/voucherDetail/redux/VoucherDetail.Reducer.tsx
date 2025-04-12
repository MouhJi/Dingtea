import {IAppAction} from 'views/app/redux';
import {IVoucherDetailState} from './VoucherDetail.Type';

export const VOUCHER_DETAIL_ACTION = {
  IS_FIRST_LOADING: 'DINGTEA/VOUCHER/DETAIL/IS/FIRST/LOADING',
  IS_REFRESH: 'DINGTEA/VOUCHER/DETAIL/IS/REFRESH',

  GET: 'DINGTEA/VOUCHER/DETAIL/GET',
  SUCCESS: 'DINGTEA/VOUCHER/DETAIL/SUCCESS',
  FAIL: 'DINGTEA/VOUCHER/DETAIL/FAIL',

  RESET: 'DINGTEA/VOUCHER/DETAIL/RESET'
};

export function showFirstLoading(isFirstLoading: boolean): IAppAction<IVoucherDetailState> {
  return {
    type: VOUCHER_DETAIL_ACTION.IS_FIRST_LOADING,
    payload: {
      isFirstLoading
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IVoucherDetailState> {
  return {
    type: VOUCHER_DETAIL_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function getvoucherDetail(id: number) {
  return {
    type: VOUCHER_DETAIL_ACTION.GET,
    payload: {
      id
    }
  };
}

export function reset(): IAppAction<IVoucherDetailState> {
  return {
    type: VOUCHER_DETAIL_ACTION.RESET,
    payload: {
      isFirstLoading: true,
      isRefresh: false,
      voucherDetail: undefined,
      message: undefined
    }
  };
}

const VoucherDetailReducer = (
  state: IVoucherDetailState = {isFirstLoading: true, isRefresh: false},
  action: IAppAction<IVoucherDetailState>
): IVoucherDetailState => {
  switch (action.type) {
    case VOUCHER_DETAIL_ACTION.IS_FIRST_LOADING:
      return {
        ...state,
        isFirstLoading: action.payload?.isFirstLoading
      };
    case VOUCHER_DETAIL_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };
    case VOUCHER_DETAIL_ACTION.SUCCESS:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        voucherDetail: action.payload?.voucherDetail
      };
    case VOUCHER_DETAIL_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        message: action.payload?.message
      };

    case VOUCHER_DETAIL_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: action.payload?.isFirstLoading,
        isRefresh: action.payload?.isRefresh,
        voucherDetail: action.payload?.voucherDetail,
        message: action.payload?.message
      };
    default:
      return state;
  }
};

export default VoucherDetailReducer;
