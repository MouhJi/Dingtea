import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getAddressShop, IResponse} from 'services';
import {getListAddressShop, ADDRESS_SHOP_ACTION} from './AddressShop.Reducer';
import {IAddressShopModel} from 'models';
import {IAddressShopState} from './AddressShop.Type';

function* getList(action: ReturnType<typeof getListAddressShop>) {
  try {
    const response: IResponse<IAddressShopModel[]> = yield call(() =>
      getAddressShop<IAddressShopModel>(action.payload.params)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IAddressShopState>>({
        type: ADDRESS_SHOP_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<IAddressShopState>>({
        type: ADDRESS_SHOP_ACTION.SUCCESS,
        payload: {
          listAddressShop: response.data,
          isStop: lengthData < action.payload.params.limit
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IAddressShopState>>({
      type: ADDRESS_SHOP_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetListAddress() {
  yield takeLatest(ADDRESS_SHOP_ACTION.GET, getList);
}
