import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getGiftDetailApi, IResponse} from 'services';
import {IGiftModel} from 'models';
import {getGiftDetail, GIFT_DETAIL_ACTION} from './GiftDetail.Reducer';
import {IGiftDetailState} from './GiftDetail.Type';

function* getList(action: ReturnType<typeof getGiftDetail>) {
  try {
    const response: IResponse<IGiftModel> = yield call(() =>
      getGiftDetailApi<IGiftModel>(action.payload.id)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IGiftDetailState>>({
        type: GIFT_DETAIL_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      yield put<IAppAction<IGiftDetailState>>({
        type: GIFT_DETAIL_ACTION.SUCCESS,
        payload: {
          data: response.data
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IGiftDetailState>>({
      type: GIFT_DETAIL_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetGiftDetail() {
  yield takeLatest(GIFT_DETAIL_ACTION.GET, getList);
}
