import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {IBlogModel, IProductModel} from 'models';
import {getDetailBlog, IResponse} from 'services';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {BLOG_DETAIL_ACTION, getDetail} from './BlogDetail.Reducer';
import {IBlogDetailState} from './BlogDetail.Type';

function* getDetailBlogSaga(action: ReturnType<typeof getDetail>) {
  try {
    const response: IResponse<IBlogModel> = yield call(() =>
      getDetailBlog<IProductModel>(action.payload.id)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IBlogDetailState>>({
        type: BLOG_DETAIL_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      yield put<IAppAction<IBlogDetailState>>({
        type: BLOG_DETAIL_ACTION.SUCCESS,
        payload: {
          blogDetail: response.data
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IBlogDetailState>>({
      type: BLOG_DETAIL_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetDetailBlog() {
  yield takeLatest(BLOG_DETAIL_ACTION.GET, getDetailBlogSaga);
}
