import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getListOrdersWaitting, TAB_WAITTING_ACTION} from './TabWaitting.Reducer';
import {getListOrder, IResponse} from 'services';
import {IOrderModel} from 'models';
import {ITabWaittingState} from './TabWaitting.Type';

function* getList(action: ReturnType<typeof getListOrdersWaitting>) {
  try {
    const response: IResponse<IOrderModel[]> = yield call(() =>
      getListOrder<IOrderModel>(action.payload.params)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<ITabWaittingState>>({
        type: TAB_WAITTING_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<ITabWaittingState>>({
        type: TAB_WAITTING_ACTION.SUCCESS,
        payload: {
          data: response.data,
          isStop: lengthData < action.payload.params.limit,
          skip: action.payload.params.skip
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<ITabWaittingState>>({
      type: TAB_WAITTING_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetListTabWaittingOrder() {
  yield takeLatest(TAB_WAITTING_ACTION.GET, getList);
}
