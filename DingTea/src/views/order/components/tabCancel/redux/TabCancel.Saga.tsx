import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getListOrdersCancel, TAB_CANCEL_ACTION} from './TabCancel.Reducer';
import {getListOrder, IResponse} from 'services';
import {IOrderModel} from 'models';
import {ITabCancelState} from './TabCancel.Type';

function* getList(action: ReturnType<typeof getListOrdersCancel>) {
  try {
    const response: IResponse<IOrderModel[]> = yield call(() =>
      getListOrder<IOrderModel>(action.payload.params)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<ITabCancelState>>({
        type: TAB_CANCEL_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<ITabCancelState>>({
        type: TAB_CANCEL_ACTION.SUCCESS,
        payload: {
          data: response.data,
          isStop: lengthData < action.payload.params.limit,
          skip: action.payload.params.skip
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<ITabCancelState>>({
      type: TAB_CANCEL_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetListTabCancelOrder() {
  yield takeLatest(TAB_CANCEL_ACTION.GET, getList);
}
