import ClientAPI from './HTTPClient';
import {IRequest, IResponse} from '.';
import Utilities from 'utils/Utilities';
import mockProductList from './mock/Product.Api.List.json';
import mockProductOptionList from './mock/ProductOption.Api.List.json';
import mockProductToppingList from './mock/ProductTopping.Api.List.json';

const PRODUCT_URL = 'v1/products';

export interface IProductRequest extends IRequest {
  types: 'topping' | 'item' | 'option';
  statuses?: string;
  attributes?: any;
  categories?: number;
  min_price?: number;
  max_price?: number;
  min_created_at?: number | string;
  max_created_at?: number | string;
  keyword?: string;
  sort_by?: string;
  order_by?: 'asc' | 'desc';
}

async function getListProduct<T>(params: IProductRequest) {
  if (__DEV__) {
    if (params.types === 'option') {
      return {
        code: 0,
        data: mockProductOptionList,
        message: "Success"
      } as IResponse<T[]>;
    }
    if (params.types === 'topping') {
      return {
        code: 0,
        data: mockProductToppingList,
        message: "Success"
      } as IResponse<T[]>;
    }
    return {
      code: 0,
      data: mockProductList,
      message: "Success"
    } as IResponse<T[]>;
  }

  const result = await ClientAPI.GET<IResponse<T[]>>(
    PRODUCT_URL,
    params,
    Utilities.getHeaderRequest()
  );
  return result;
}

async function getDetailProduct<T>(id: number) {
  if (__DEV__) {
    return {
      code: 0,
      data: mockProductList[id-1],
      message: "Success"
    } as IResponse<T>;
  }

  const result = await ClientAPI.GET<IResponse<T>>(
    PRODUCT_URL + '/' + id,
    {},
    Utilities.getHeaderRequest()
  );
  return result;
}

export {getListProduct, getDetailProduct};
