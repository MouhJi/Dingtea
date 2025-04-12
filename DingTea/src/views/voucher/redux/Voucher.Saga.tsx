import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getListVouchers, VOUCHER_ACTION} from './Voucher.Reducer';
import {getListVoucher, IResponse} from 'services';
import {IVoucherModel} from 'models';
import {IVoucherState} from './Voucher.Type';

function* getList(action: ReturnType<typeof getListVouchers>) {
  try {
    const response: IResponse<IVoucherModel[]> = yield call(() =>
      getListVoucher<IVoucherModel>(action.payload.params)
    );
    if (response.code) {
      // Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IVoucherState>>({
        type: VOUCHER_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<IVoucherState>>({
        type: VOUCHER_ACTION.SUCCESS,
        payload: {
          data: response.data,
          isStop: lengthData < action.payload.params.limit
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IVoucherState>>({
      type: VOUCHER_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetListVoucher() {
  yield takeLatest(VOUCHER_ACTION.GET, getList);
}
