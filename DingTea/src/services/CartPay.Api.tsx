import ClientAPI from './HTTPClient';
import {IRequest, IResponse} from '.';
import { PAYMENT_METHOD_LIST } from 'common/Constants';

const CARTFORM_URL = '';

export interface ICartPayRequest extends IRequest {}

async function getCartFrom<T>() {
  if (__DEV__) {
    return {
      code: 0,
      data: PAYMENT_METHOD_LIST,
      message: "Success"
    } as IResponse<T[]>;
  }

  const result = await ClientAPI.GET<IResponse<T[]>>(CARTFORM_URL);
  return result;
}

export {getCartFrom};
