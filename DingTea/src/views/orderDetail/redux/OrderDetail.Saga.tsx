import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {IOrderModel} from 'models';
import {getDetailOrder, IResponse} from 'services';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getOrderDetail, ORDER_DETAIL_ACTION} from './OrderDetail.Reducer';
import {IOrderDetailState} from './OrderDetail.Type';

function* getDetailOrderSaga(action: ReturnType<typeof getOrderDetail>) {
  try {
    const response: IResponse<IOrderModel> = yield call(() =>
      getDetailOrder<IOrderModel>(action.payload.id)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IOrderDetailState>>({
        type: ORDER_DETAIL_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    }
    yield put<IAppAction<IOrderDetailState>>({
      type: ORDER_DETAIL_ACTION.SUCCESS,
      payload: {
        orderDetail: response.data
      }
    });
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IOrderDetailState>>({
      type: ORDER_DETAIL_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetDetailOrder() {
  yield takeLatest(ORDER_DETAIL_ACTION.GET, getDetailOrderSaga);
}
