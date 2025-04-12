import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getListAddressUser, ADDRESS_USER_ACTION} from './AddressUser.Reducer';
import {getUserAddress, IResponse} from 'services';
import {IAddressUserModal} from 'models';
import {IAddressUserState} from './AddressUser.Type';

function* getList(action: ReturnType<typeof getListAddressUser>) {
  try {
    const response: IResponse<IAddressUserModal[]> = yield call(() =>
      getUserAddress<IAddressUserModal>(action.payload.params)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IAddressUserState>>({
        type: ADDRESS_USER_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<IAddressUserState>>({
        type: ADDRESS_USER_ACTION.SUCCESS,
        payload: {
          data: response.data,
          isStop: lengthData < action.payload.params.limit
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IAddressUserState>>({
      type: ADDRESS_USER_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetListUserAddress() {
  yield takeLatest(ADDRESS_USER_ACTION.GET, getList);
}
