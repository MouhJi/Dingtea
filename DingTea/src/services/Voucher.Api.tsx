import ClientAPI from './HTTPClient';
import {IRequest, IResponse} from '.';
import Utilities from 'utils/Utilities';
import mockVoucherList from './mock/Voucher.Api.List.json';

const VOUCHER_URL = 'v1/vouchers';

export interface IVoucherRequest extends IRequest {
  statuses?: string;
}

async function getListVoucher<T>(params: IVoucherRequest) {
  if (__DEV__) {
    return {
      code: 0,
      data: mockVoucherList
    } as IResponse<T[]>;
  }

  const result = await ClientAPI.GET<IResponse<T[]>>(
    VOUCHER_URL,
    params,
    Utilities.getHeaderRequest()
  );
  return result;
}

async function getDetailVoucher<T>(id: number) {
  if (__DEV__) {
    return {
      code: 0,
      data: mockVoucherList[id-1]
    } as IResponse<T>;
  }

  const result = await ClientAPI.GET<IResponse<T>>(
    VOUCHER_URL + '/' + id,
    {},
    Utilities.getHeaderRequest()
  );
  return result;
}

export {getListVoucher, getDetailVoucher};
