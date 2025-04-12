import {IAddressShopRequest} from 'services/AddressShop.Api';
import {IAppAction} from 'views/app/redux';
import {IAddressShopState} from './AddressShop.Type';

export const ADDRESS_SHOP_ACTION = {
  IS_REFRESH: 'DINGTEA/ADDRESS/SHOP/IS/REFRESH',

  GET: 'DINGTEA/ADDRESS/SHOP/GET',
  SUCCESS: 'DINGTEA/ADDRESS/SHOP/SUCCESS',
  FAIL: 'DINGTEA/ADDRESS/SHOP/FAIL',

  IS_LOADMORE: 'DINGTEA/ADDRESS/SHOP/IS/LOADMORE',

  RESET: 'DINGTEA/ADDRESS/SHOP/RESET'
};

export function getListAddressShop(params: IAddressShopRequest) {
  return {
    type: ADDRESS_SHOP_ACTION.GET,
    payload: {
      params
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IAddressShopState> {
  return {
    type: ADDRESS_SHOP_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<IAddressShopState> {
  return {
    type: ADDRESS_SHOP_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

export function reset(): IAppAction<IAddressShopState> {
  return {
    type: ADDRESS_SHOP_ACTION.RESET,
    payload: {
      isFirstLoading: true,
      isRefresh: false,
      listAddressShop: [],
      isLoadmore: false,
      isStop: false,
      message: undefined
    }
  };
}

const AddressShopReducer = (
  state: IAddressShopState = {
    isFirstLoading: true,
    isRefresh: false,
    listAddressShop: [],
    isLoadmore: false,
    isStop: false
  },
  action: IAppAction<IAddressShopState>
): IAddressShopState => {
  switch (action.type) {
    case ADDRESS_SHOP_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case ADDRESS_SHOP_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case ADDRESS_SHOP_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          listAddressShop: action.payload?.listAddressShop,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          listAddressShop: state.listAddressShop?.concat(action.payload?.listAddressShop || []),
          isStop: action.payload?.isStop
        };
      }

    case ADDRESS_SHOP_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadmore: false,
        message: action.payload?.message,
        isError: true
      };

    case ADDRESS_SHOP_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: action.payload?.isFirstLoading,
        isRefresh: action.payload?.isRefresh,
        listAddressShop: action.payload?.listAddressShop,
        isLoadmore: action.payload?.isLoadmore,
        isStop: action.payload?.isStop,
        message: action.payload?.message
      };

    default:
      return state;
  }
};
export default AddressShopReducer;
