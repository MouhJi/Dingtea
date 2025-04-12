import {IVoucherModel} from 'models';
import MyStaticLocal from 'utils/MyStaticLocal';
import {IAppAction} from 'views/app/redux';
import {IChooseVoucherState} from './ChooseVoucher.Type';

export const CHOOSE_VOUCHER_ACTION = {
  INIT: 'DINGTEA/CHOOSE/VOUCHER/INIT'
};

export function initVoucher(listVoucher?: IVoucherModel[]): IAppAction<IChooseVoucherState> {
  return {
    type: CHOOSE_VOUCHER_ACTION.INIT,
    payload: {
      listVoucher
    }
  };
}

const ChooseVoucherReducer = (
  state: IChooseVoucherState = {listVoucher: []},
  action: IAppAction<IChooseVoucherState>
): IChooseVoucherState => {
  switch (action.type) {
    case CHOOSE_VOUCHER_ACTION.INIT:
      MyStaticLocal.setListVoucher(action.payload?.listVoucher);
      if (action.payload?.listVoucher) {
        return {...state, listVoucher: [...action.payload?.listVoucher]};
      } else {
        return {...state, listVoucher: []};
      }

    default:
      return state;
  }
};
export default ChooseVoucherReducer;
