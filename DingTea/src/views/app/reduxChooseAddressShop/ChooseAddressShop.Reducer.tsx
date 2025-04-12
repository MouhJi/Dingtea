import {IAddressShopModel} from 'models';
import {IAppAction} from 'views/app/redux';
import {IChooseAddressShopState} from './ChooseAddressShop.Type';
import MyStaticLocal from 'utils/MyStaticLocal';

export const CHOOSE_ADDRESS_SHOP_ACTION = {
  CHOOSE: 'DINGTEA/CHOOSE/ADDRESS/SHOP/CHOOSE'
};

export function chooseAddressShop(
  addressShopChoose?: IAddressShopModel
): IAppAction<IChooseAddressShopState> {
  return {
    type: CHOOSE_ADDRESS_SHOP_ACTION.CHOOSE,
    payload: {
      addressShopChoose
    }
  };
}

const ChooseAddressShopReducer = (
  state: IChooseAddressShopState = {addressShopChoose: undefined},
  action: IAppAction<IChooseAddressShopState>
): IChooseAddressShopState => {
  switch (action.type) {
    case CHOOSE_ADDRESS_SHOP_ACTION.CHOOSE:
      MyStaticLocal.setAddressShop(action.payload?.addressShopChoose);
      return {
        ...state,
        addressShopChoose: action.payload?.addressShopChoose
      };

    default:
      return state;
  }
};

export default ChooseAddressShopReducer;
