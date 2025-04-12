import {ICartModel} from 'models';
import MyStorage from 'utils/MyStorage';
import MyStaticLocal from 'utils/MyStaticLocal';
import {IAppAction} from 'views/app/redux';
import {IChooseCartState} from './ChooseCart.Type';
import {CART_USER_CHOOSE} from 'common/KeyStorages';

export const CHOOSE_CART_ACTION = {
  INIT: 'DINGTEA/CHOOSE/CART/INIT'
};

export function initCart(listProductCart?: ICartModel[]): IAppAction<IChooseCartState> {
  return {
    type: CHOOSE_CART_ACTION.INIT,
    payload: {
      listProductCart
    }
  };
}

const ChooseCartReducer = (
  state: IChooseCartState = {listProductCart: []},
  action: IAppAction<IChooseCartState>
): IChooseCartState => {
  switch (action.type) {
    case CHOOSE_CART_ACTION.INIT:
      MyStaticLocal.setListProductCart(action.payload?.listProductCart);
      MyStorage.create(CART_USER_CHOOSE, action.payload?.listProductCart);
      if (action.payload?.listProductCart) {
        return {...state, listProductCart: [...action.payload?.listProductCart]};
      } else {
        return {...state, listProductCart: []};
      }

    default:
      return state;
  }
};
export default ChooseCartReducer;
