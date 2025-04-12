import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {IProductModel} from 'models';
import {getDetailProduct, IResponse} from 'services';

import {PRO_DETAIL_EDIT_ACTION, getDetail} from './ProDetailEdit.Reducer';
import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {IProDetailEditState} from './ProDetailEdit.Type';

function* getDetailProductSaga(action: ReturnType<typeof getDetail>) {
  try {
    const response: IResponse<IProductModel> = yield call(() =>
      getDetailProduct<IProductModel>(action.payload.id)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IProDetailEditState>>({
        type: PRO_DETAIL_EDIT_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      yield put<IAppAction<IProDetailEditState>>({
        type: PRO_DETAIL_EDIT_ACTION.SUCCESS,
        payload: {
          data: response.data
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IProDetailEditState>>({
      type: PRO_DETAIL_EDIT_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetDetailEditProduct() {
  yield takeLatest(PRO_DETAIL_EDIT_ACTION.GET, getDetailProductSaga);
}
