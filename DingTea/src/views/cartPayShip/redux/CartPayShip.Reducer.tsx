import {ICartShipModel} from 'models';
import {IAppAction} from 'views/app/redux';
import {ICartShipState} from './CartPayShip.Type';

export const CART_SHIP_ACTION = {
  IS_REFRESH: 'DINGTEA/CART/SHIP/IS/REFRESH',

  GET: 'DINGTEA/CART/SHIP/GET',
  SUCCESS: 'DINGTEA/CART/SHIP/SUCCESS',
  FAIL: 'DINGTEA/CART/SHIP/FAIL',

  IS_LOADMORE: 'DINGTEA/CART/SHIP/IS/LOADMORE',

  CHOOSE: 'DINGTEA/CHOOSE/CART/SHIP/CHOOSE'
};

export function getListCartShip() {
  return {
    type: CART_SHIP_ACTION.GET
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<ICartShipState> {
  return {
    type: CART_SHIP_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<ICartShipState> {
  return {
    type: CART_SHIP_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}
export function chooseCartShip(cartShipChoose?: ICartShipModel): IAppAction<ICartShipState> {
  return {
    type: CART_SHIP_ACTION.CHOOSE,
    payload: {
      cartShipChoose
    }
  };
}
const CartShipReducer = (
  state: ICartShipState = {
    isFirstLoading: true,
    isRefresh: false,
    listCartShip: [],
    isLoadmore: false,
    isStop: false,
    cartShipChoose: undefined
  },
  action: IAppAction<ICartShipState>
): ICartShipState => {
  switch (action.type) {
    case CART_SHIP_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case CART_SHIP_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case CART_SHIP_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          listCartShip: action.payload?.listCartShip,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          listCartShip: state.listCartShip?.concat(action.payload?.listCartShip || []),
          isStop: action.payload?.isStop
        };
      }
    case CART_SHIP_ACTION.CHOOSE:
      return {
        ...state,
        cartShipChoose: action.payload?.cartShipChoose
      };

    case CART_SHIP_ACTION.FAIL:
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
export default CartShipReducer;
