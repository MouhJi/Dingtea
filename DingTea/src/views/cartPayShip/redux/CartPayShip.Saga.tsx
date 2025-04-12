import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getCartShip, IResponse} from 'services';
import {ICartPayModel, ICartShipModel} from 'models';
import {CART_SHIP_ACTION} from './CartPayShip.Reducer';
import {ICartShipState} from './CartPayShip.Type';

function* getList() {
  try {
    const response: IResponse<ICartShipModel[]> = yield call(() => getCartShip<ICartPayModel>());
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<ICartShipState>>({
        type: CART_SHIP_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      yield put<IAppAction<ICartShipState>>({
        type: CART_SHIP_ACTION.SUCCESS,
        payload: {
          listCartShip: response.data
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<ICartShipState>>({
      type: CART_SHIP_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetListCartShip() {
  yield takeLatest(CART_SHIP_ACTION.GET, getList);
}
