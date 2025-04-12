import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getCartFrom, IResponse} from 'services';
import {ICartPayModel} from 'models';
import {CART_PAY_ACTION} from './CartPayFrom.Reducer';
import {ICartPayState} from './CartPayFrom.Type';

function* getList() {
  try {
    const response: IResponse<ICartPayModel[]> = yield call(() => getCartFrom<ICartPayModel>());
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<ICartPayState>>({
        type: CART_PAY_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      yield put<IAppAction<ICartPayState>>({
        type: CART_PAY_ACTION.SUCCESS,
        payload: {
          listCartPay: response.data
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<ICartPayState>>({
      type: CART_PAY_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetListCartPay() {
  yield takeLatest(CART_PAY_ACTION.GET, getList);
}
