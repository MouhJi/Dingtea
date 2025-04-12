import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getListBlog, BLOG_ACTION} from './Blog.Reducer';
import {IBlogState} from './Blog.Type';
import {getBlog, IResponse} from 'services';
import {IBlogModel} from 'models';

function* getList(action: ReturnType<typeof getListBlog>) {
  try {
    const response: IResponse<IBlogModel[]> = yield call(() =>
      getBlog<IBlogModel>(action.payload.params)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IBlogState>>({
        type: BLOG_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<IBlogState>>({
        type: BLOG_ACTION.SUCCESS,
        payload: {
          listBlog: response.data,
          isStop: lengthData < action.payload.params.limit
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IBlogState>>({
      type: BLOG_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchgetListBlog() {
  yield takeLatest(BLOG_ACTION.GET, getList);
}
