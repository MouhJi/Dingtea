import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {IVoucherModel} from 'models';
import {IResponse} from 'services';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getDetailVoucher} from 'services/Voucher.Api';
import {getvoucherDetail, VOUCHER_DETAIL_ACTION} from './VoucherDetail.Reducer';
import {IVoucherDetailState} from './VoucherDetail.Type';

function* getDetailVoucherSaga(action: ReturnType<typeof getvoucherDetail>) {
  try {
    const response: IResponse<IVoucherModel> = yield call(() =>
      getDetailVoucher<IVoucherModel>(action.payload.id)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IVoucherDetailState>>({
        type: VOUCHER_DETAIL_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    }
    yield put<IAppAction<IVoucherDetailState>>({
      type: VOUCHER_DETAIL_ACTION.SUCCESS,
      payload: {
        voucherDetail: response.data
      }
    });
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IVoucherDetailState>>({
      type: VOUCHER_DETAIL_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetDetailVoucher() {
  yield takeLatest(VOUCHER_DETAIL_ACTION.GET, getDetailVoucherSaga);
}
