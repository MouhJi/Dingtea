import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getProComment, IResponse} from 'services';
import {IProCommentModel} from 'models';
import {getListProComment, PRO_COMMENT_ACTION} from './ProComment.Reducer';
import {IProCommentState} from './ProComment.Type';

function* getList(action: ReturnType<typeof getListProComment>) {
  try {
    const response: IResponse<IProCommentModel[]> = yield call(() =>
      getProComment<IProCommentModel>(action.payload.params)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IProCommentState>>({
        type: PRO_COMMENT_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      let lengthData = response.data?.length || 0;
      yield put<IAppAction<IProCommentState>>({
        type: PRO_COMMENT_ACTION.SUCCESS,
        payload: {
          listProComment: response.data,
          isStop: lengthData < action.payload.params.limit
        }
      });
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IProCommentState>>({
      type: PRO_COMMENT_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetListProComment() {
  yield takeLatest(PRO_COMMENT_ACTION.GET, getList);
}
