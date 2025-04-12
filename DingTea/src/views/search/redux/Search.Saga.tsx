import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {searchListProduct, SEARCH_ACTION} from './Search.Reducer';
import {getListProduct, IResponse} from 'services';
import {IProductModel} from 'models';
import {ISearchState} from './Search.Type';

function* getList(action: ReturnType<typeof searchListProduct>) {
  try {
    const response: IResponse<IProductModel[]> = yield call(() =>
      getListProduct<IProductModel>(action.payload.params)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<ISearchState>>({
        type: SEARCH_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<ISearchState>>({
        type: SEARCH_ACTION.SUCCESS,
        payload: {
          data: response.data,
          isStop: lengthData < action.payload.params.limit
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<ISearchState>>({
      type: SEARCH_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchSearchListProduct() {
  yield takeLatest(SEARCH_ACTION.GET, getList);
}
