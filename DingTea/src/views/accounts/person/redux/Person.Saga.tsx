import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';
import {IResponse} from 'services';
import {IDataUser, IUserModel} from 'models';
import {USER_DATA} from 'common/KeyStorages';
import {update} from 'services';
import MyStorage from 'utils/MyStorage';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {PERSON_ACTION, updateAvatar, updateBirthday, updateName} from './Person.Reducer';
import {IPersonState} from './Person.Type';
import MyStaticLocal from 'utils/MyStaticLocal';

function* updateAvatarUser(action: ReturnType<typeof updateAvatar>) {
  try {
    const response: IResponse<{}> = yield call(() => update({avatar: action.payload.avatar}));
    Utilities.showHideRootLoading(false);
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IPersonState>>({
        type: PERSON_ACTION.UPDATE_AVATAR_FAIL
      });
    } else {
      let user: IUserModel = {...MyStaticLocal.getUser(), avatar: action.payload.avatar};
      let dataUser: IDataUser = {token: MyStaticLocal.getUserToken(), user: user};
      try {
        yield call(() => MyStorage.create(USER_DATA, dataUser));
        MyStaticLocal.setUser(user);
        yield put<IAppAction<IPersonState>>({
          type: PERSON_ACTION.UPDATE_AVATAR_SUCCESS,
          payload: {
            avatar: action.payload.avatar
          }
        });
      } catch (error) {
        Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
        yield put<IAppAction<IPersonState>>({
          type: PERSON_ACTION.UPDATE_AVATAR_FAIL
        });
      }
    }
  } catch (error) {
    Utilities.showHideRootLoading(false);
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IPersonState>>({
      type: PERSON_ACTION.UPDATE_AVATAR_FAIL
    });
  }
}

export function* watchUpdateAvatar() {
  yield takeLatest(PERSON_ACTION.UPDATE_AVATAR, updateAvatarUser);
}

function* updateNameUser(action: ReturnType<typeof updateName>) {
  try {
    const response: IResponse<{}> = yield call(() => update({name: action.payload.name}));
    Utilities.showHideRootLoading(false);
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IPersonState>>({
        type: PERSON_ACTION.UPDATE_NAME_FAIL
      });
    } else {
      let user: IUserModel = {...MyStaticLocal.getUser(), name: action.payload.name};
      let dataUser: IDataUser = {token: MyStaticLocal.getUserToken(), user: user};
      try {
        yield call(() => MyStorage.create(USER_DATA, dataUser));
        MyStaticLocal.setUser(user);
        yield put<IAppAction<IPersonState>>({
          type: PERSON_ACTION.UPDATE_NAME_SUCCESS,
          payload: {
            name: action.payload.name
          }
        });
      } catch (error) {
        Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
        yield put<IAppAction<IPersonState>>({
          type: PERSON_ACTION.UPDATE_NAME_FAIL
        });
      }
    }
  } catch (error) {
    Utilities.showHideRootLoading(false);
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IPersonState>>({
      type: PERSON_ACTION.UPDATE_NAME_FAIL
    });
  }
}

export function* watchUpdateName() {
  yield takeLatest(PERSON_ACTION.UPDATE_NAME, updateNameUser);
}

function* updateBirthdayUser(action: ReturnType<typeof updateBirthday>) {
  try {
    const response: IResponse<{}> = yield call(() => update({birthday: action.payload.birthday}));
    Utilities.showHideRootLoading(false);
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IPersonState>>({
        type: PERSON_ACTION.UPDATE_BIRTHDAY_FAIL
      });
    } else {
      let newBirthday = new Date(action.payload.birthday).getTime();

      let user: IUserModel = {...MyStaticLocal.getUser(), birthday: newBirthday / 1000};
      let dataUser: IDataUser = {token: MyStaticLocal.getUserToken(), user: user};

      try {
        yield call(() => MyStorage.create(USER_DATA, dataUser));
        MyStaticLocal.setUser(user);
        yield put<IAppAction<IPersonState>>({
          type: PERSON_ACTION.UPDATE_BIRTHDAY_SUCCESS,
          payload: {
            birthday: newBirthday / 1000
          }
        });
      } catch (error) {
        Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
        yield put<IAppAction<IPersonState>>({
          type: PERSON_ACTION.UPDATE_BIRTHDAY_FAIL
        });
      }
    }
  } catch (error) {
    Utilities.showHideRootLoading(false);
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IPersonState>>({
      type: PERSON_ACTION.UPDATE_BIRTHDAY_FAIL
    });
  }
}

export function* watchUpdateBirthday() {
  yield takeLatest(PERSON_ACTION.UPDATE_BIRTHDAY, updateBirthdayUser);
}
