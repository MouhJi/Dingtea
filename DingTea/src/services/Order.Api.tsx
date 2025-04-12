import {StatusOrder} from 'common/Constants';
import {
  IAddressShopModel,
  IAddressUserModal,
  ICartModel,
  ICartPayModel,
  ICartShipModel,
  IVoucherModel
} from 'models';
import {IRequest, IResponse} from 'services';
import Utilities from 'utils/Utilities';
import ClientAPI from './HTTPClient';
import mockOrderList from './mock/Order.Api.List.json';

const ORDER_URL = 'v1/orders';
const ORDER_CANCEL_URL = 'v1/orders';

export interface IOderRequest extends IRequest {
  sort_by?: string;
  order_by?: 'asc' | 'desc';
  customer?: string | number;
  statuses?: StatusOrder;
  code?: string;
  types?: string;
  stores?: string;
  channels?: string;
  staffs?: string;
  payment_methods?: number;
  shipping_methods?: number;
  min_created_at?: number | string;
  max_created_at?: number | string;
  sources?: string;
}

export interface IOrderCreateRequest {
  status?: StatusOrder;
  type?: string;
  source: 'app_android_end_user' | 'app_ios_end_user';
  store?: IAddressShopModel;
  customer?: IAddressUserModal;
  products?: ICartModel[];
  channel?: {
    id?: number | string;
    name?: string;
  };
  payment?: ICartPayModel;
  shipping?: ICartShipModel;
  discounts?: IVoucherModel[];
  note?: string;
}

async function cancelOrder<T>(id: number) {
  if (__DEV__) {
    return {
      code: 0
    } as IResponse<T>;
  }

  const result = await ClientAPI.POST<IResponse<T[]>>(
    ORDER_CANCEL_URL + '/' + id + '/' + 'cancel',
    {},
    Utilities.getHeaderRequest()
  );
  return result;
}

async function getListOrder<T>(params: IOderRequest) {
  if (__DEV__) {
    return {
      code: 0,
      data: mockOrderList
    } as IResponse<T[]>;
  }

  const result = await ClientAPI.GET<IResponse<T[]>>(
    ORDER_URL,
    params,
    Utilities.getHeaderRequest()
  );
  return result;
}

async function getDetailOrder<T>(id: number) {
  if (__DEV__) {
    return {
      code: 0,
      data: mockOrderList[id-1]
    } as IResponse<T>;
  }

  const result = await ClientAPI.GET<IResponse<T>>(
    ORDER_URL + '/' + id,
    {},
    Utilities.getHeaderRequest()
  );
  return result;
}

async function createOrder<T>(params: IOrderCreateRequest) {
  if (__DEV__) {
    return {
      code: 0,
      data: mockOrderList[0]
    } as IResponse<T>;
  }

  const result = await ClientAPI.POST<IResponse<T>>(
    ORDER_URL,
    params,
    Utilities.getHeaderRequest()
  );
  return result;
}

export {getListOrder, getDetailOrder, cancelOrder, createOrder};
