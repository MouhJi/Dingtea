import ClientAPI from './HTTPClient';
import {IRequest, IResponse} from '.';
import Utilities from 'utils/Utilities';
import mockAddressShopList from './mock/AddressShop.Api.List.json';

const ADDRESS_SHOP_URL = 'v1/stores';

export interface IAddressShopRequest extends IRequest {
  status?: string;
  min_created_at?: number | string;
  max_created_at?: number | string;
  keyword?: string;
  is_app_visible?: boolean;
}

async function getAddressShop<T>(params: IAddressShopRequest) {
  if (__DEV__) {
    return {
      code: 0,
      data: mockAddressShopList,
      message: "Success"
    } as IResponse<T[]>;
  }

  const result = await ClientAPI.GET<IResponse<T[]>>(
    ADDRESS_SHOP_URL,
    params,
    Utilities.getHeaderRequest()
  );
  return result;
}
async function getDetailAddressShop<T>(id: number) {
  const result = await ClientAPI.GET<IResponse<T>>(
    ADDRESS_SHOP_URL + '/' + id,
    {},
    Utilities.getHeaderRequest()
  );
  return result;
}
export {getAddressShop, getDetailAddressShop};
