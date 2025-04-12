import {ICartPayModel} from 'models';
import MyStaticLocal from 'utils/MyStaticLocal';
import {IAppAction} from 'views/app/redux';
import {ICartPayState} from './CartPayFrom.Type';

export const CART_PAY_ACTION = {
  IS_REFRESH: 'DINGTEA/CART/PAY/IS/REFRESH',

  GET: 'DINGTEA/CART/PAY/GET',
  SUCCESS: 'DINGTEA/CART/PAY/SUCCESS',
  FAIL: 'DINGTEA/CART/PAY/FAIL',

  IS_LOADMORE: 'DINGTEA/CART/PAY/IS/LOADMORE',

  CHOOSE: 'DINGTEA/CHOOSE/CART/PAY/CHOOSE'
};

export function getListCartPay() {
  return {
    type: CART_PAY_ACTION.GET
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<ICartPayState> {
  return {
    type: CART_PAY_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<ICartPayState> {
  return {
    type: CART_PAY_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}
export function chooseCartPayMemment(
  cartPayMemmentChoose?: ICartPayModel
): IAppAction<ICartPayState> {
  return {
    type: CART_PAY_ACTION.CHOOSE,
    payload: {
      cartPayMemmentChoose
    }
  };
}
const CartPayFromReducer = (
  state: ICartPayState = {
    isFirstLoading: true,
    isRefresh: false,
    listCartPay: [],
    isLoadmore: false,
    isStop: false,
    cartPayMemmentChoose: undefined
  },
  action: IAppAction<ICartPayState>
): ICartPayState => {
  switch (action.type) {
    case CART_PAY_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case CART_PAY_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case CART_PAY_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          listCartPay: action.payload?.listCartPay,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          listCartPay: state.listCartPay?.concat(action.payload?.listCartPay || []),
          isStop: action.payload?.isStop
        };
      }
    case CART_PAY_ACTION.CHOOSE:
      if (action.payload?.cartPayMemmentChoose?.id !== 1) {
        MyStaticLocal.setCartPayForm(action.payload?.cartPayMemmentChoose);
      }
      return {
        ...state,
        cartPayMemmentChoose: action.payload?.cartPayMemmentChoose
      };

    case CART_PAY_ACTION.FAIL:
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
export default CartPayFromReducer;
