import {IAddressUserModal} from 'models';
import {IAppAction} from 'views/app/redux';
import {IChooseAddressUserState} from './ChooseAddressUser.Type';
import MyStaticLocal from 'utils/MyStaticLocal';

export const CHOOSE_ADDRESS_USER_ACTION = {
  CHOOSE: 'DINGTEA/CHOOSE/ADDRESS/USER/CHOOSE'
};

export function chooseAddressUser(
  addressUserChoose?: IAddressUserModal
): IAppAction<IChooseAddressUserState> {
  return {
    type: CHOOSE_ADDRESS_USER_ACTION.CHOOSE,
    payload: {
      addressUserChoose
    }
  };
}

const ChooseAddressUserReducer = (
  state: IChooseAddressUserState = {addressUserChoose: undefined},
  action: IAppAction<IChooseAddressUserState>
): IChooseAddressUserState => {
  switch (action.type) {
    case CHOOSE_ADDRESS_USER_ACTION.CHOOSE:
      MyStaticLocal.setAddressUser(action.payload?.addressUserChoose);
      return {
        ...state,
        addressUserChoose: action.payload?.addressUserChoose
      };

    default:
      return state;
  }
};

export default ChooseAddressUserReducer;
