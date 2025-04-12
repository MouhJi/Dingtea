import ClientAPI from './HTTPClient';
import {IRequest, IResponse} from '.';
import Utilities from 'utils/Utilities';

const CATEGORY_URL = 'v1/categories';

export interface ICateRequest extends IRequest {
  is_app_visible?: boolean;
  is_home_visible?: boolean;
  nested?: boolean;
}

async function getListCategories<T>(params: ICateRequest) {
  const result = await ClientAPI.GET<IResponse<T[]>>(
    CATEGORY_URL,
    params,
    Utilities.getHeaderRequest()
  );
  return result;
}

async function getDetailCategory<T>(id: number) {
  const result = await ClientAPI.GET<IResponse<T>>(
    CATEGORY_URL + '/' + id,
    {},
    Utilities.getHeaderRequest()
  );
  return result;
}

export {getListCategories, getDetailCategory};
