import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getHistoryGift, IResponse} from 'services';
import {IGiftModel} from 'models';
import {IHistoryGiftState} from './HistoryGift.Type';
import {getListHistoryGift, HISTORY_GIFT_ACTION} from './HistoryGift.Reducer';

function* getList(action: ReturnType<typeof getListHistoryGift>) {
  try {
    const response: IResponse<IGiftModel[]> = yield call(() =>
      getHistoryGift<IGiftModel>(action.payload.params)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IHistoryGiftState>>({
        type: HISTORY_GIFT_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<IHistoryGiftState>>({
        type: HISTORY_GIFT_ACTION.SUCCESS,
        payload: {
          historyGift: response.data,
          isStop: lengthData < action.payload.params.limit
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IHistoryGiftState>>({
      type: HISTORY_GIFT_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetListHistoryGift() {
  yield takeLatest(HISTORY_GIFT_ACTION.GET, getList);
}
