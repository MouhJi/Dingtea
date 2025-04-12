import {takeLatest, call, put} from 'redux-saga/effects';
import MyI18n from 'utils/MyI18n';

import {CATEGORY_DEFAULT, MESSAGE_ERROR} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {IAppAction} from 'views/app/redux';
import {getListProducts, DO_UONG_ACTION} from './DoUong.Reducer';
import {getListProduct, IResponse} from 'services';
import {ICategoryModel, IProductModel} from 'models';
import {IDoUongState} from './DoUong.Type';

function convertData(
  arrProduct: IProductModel[]
): {title: ICategoryModel; data: IProductModel[]}[] {
  if (arrProduct.length > 0) {
    let arrTmp1: IProductModel[] = [];
    for (let i = 0; i < arrProduct.length; i++) {
      const product = arrProduct[i];
      if (product.categories) {
        for (let j = 0; j < product.categories.length; j++) {
          const cate = product.categories[j];
          arrTmp1.push({...product, cateTmp: cate});
        }
      } else {
        continue;
      }
    }
    arrTmp1 = arrTmp1.sort(function (a, b) {
      if (a.cateTmp && b.cateTmp) {
        return a.cateTmp.id - b.cateTmp.id;
      } else {
        return 1;
      }
    });
    const arrTmp2 = arrTmp1.reduce<IProductModel[][]>((r, v, i, a) => {
      if (a[i - 1] && v.cateTmp?.id === a[i - 1].cateTmp?.id) {
        r[r.length - 1].push(v);
      } else {
        r.push([v]);
      }
      return r;
    }, []);
    let arrTmp3: {title: ICategoryModel; data: IProductModel[]}[] = [];
    for (let k = 0; k < arrTmp2.length; k++) {
      const element = arrTmp2[k];
      arrTmp3.push({title: element[0].cateTmp || CATEGORY_DEFAULT, data: element});
    }
    return arrTmp3;
  } else {
    return [];
  }
}

function* getList(action: ReturnType<typeof getListProducts>) {
  try {
    const response: IResponse<IProductModel[]> = yield call(() =>
      getListProduct<IProductModel>(action.payload.params)
    );
    if (response.code) {
      Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      yield put<IAppAction<IDoUongState>>({
        type: DO_UONG_ACTION.FAIL,
        payload: {
          message: response.message
        }
      });
    } else {
      if (response.data) {
        let lengthData = response.data.length || 0;
        yield put<IAppAction<IDoUongState>>({
          type: DO_UONG_ACTION.SUCCESS,
          payload: {
            data: convertData(response.data),
            isStop: lengthData < action.payload.params.limit
          }
        });
      } else {
        Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
        yield put<IAppAction<IDoUongState>>({
          type: DO_UONG_ACTION.FAIL,
          payload: {
            message: response.message
          }
        });
      }
    }
  } catch (error) {
    Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
    yield put<IAppAction<IDoUongState>>({
      type: DO_UONG_ACTION.FAIL,
      payload: {
        message: MESSAGE_ERROR
      }
    });
  }
}

export function* watchGetListProductDoUong() {
  yield takeLatest(DO_UONG_ACTION.GET, getList);
}
