import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getNotify, IResponse} from 'services';
import {ICategoryModel} from 'models';
import {getListNotify, NOTIFY_ACTION} from './Notify.Reducer';
import {INotifyState} from './Notify.Type';

function* getList(action: ReturnType<typeof getListNotify>) {
  try {
    const response: IResponse<ICategoryModel[]> = yield call(() =>
      getNotify<ICategoryModel>(action.payload.params)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<INotifyState>>({
        type: NOTIFY_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<INotifyState>>({
        type: NOTIFY_ACTION.SUCCESS,
        payload: {
          listNotify: response.data,
          isStop: lengthData < action.payload.params.limit
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<INotifyState>>({
      type: NOTIFY_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetListNotify() {
  yield takeLatest(NOTIFY_ACTION.GET, getList);
}
