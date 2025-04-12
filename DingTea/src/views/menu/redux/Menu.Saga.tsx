import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getListCate, MENU_ACTION} from './Menu.Reducer';
import {IMenuState} from './Menu.Type';
import {getListCategories, IResponse} from 'services';
import {ICategoryModel} from 'models';

function* getList(action: ReturnType<typeof getListCate>) {
  try {
    const response: IResponse<ICategoryModel[]> = yield call(() =>
      getListCategories<ICategoryModel>(action.payload.params)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IMenuState>>({
        type: MENU_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<IMenuState>>({
        type: MENU_ACTION.SUCCESS,
        payload: {
          data: response.data,
          isStop: lengthData < action.payload.params.limit
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IMenuState>>({
      type: MENU_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetListCate() {
  yield takeLatest(MENU_ACTION.GET, getList);
}
