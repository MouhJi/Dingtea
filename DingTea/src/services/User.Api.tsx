import ClientAPI from './HTTPClient';
import {IRequest, IResponse} from '.';
import MyStaticLocal from 'utils/MyStaticLocal';
import Utilities from 'utils/Utilities';
import mockAccount from './mock/Account.Api.json';
import mockAddressUser from './mock/AddressUser.Api.List.json';

const USER_URL = 'v1/users';
const USER_ADDRESS_URL = 'v1/address';

async function getDetailPerson<T>(id?: number | string) {
  if (__DEV__) {
    return {
      code: 0,
      data: mockAccount.user
    } as IResponse<T>;
  }
  const result = await ClientAPI.GET<IResponse<T>>(
    USER_URL + '/' + id,
    {},
    Utilities.getHeaderRequest()
  );
  return result;
}

async function update<T>(params?: object) {
  if (__DEV__) {
    return {
      code: 0,
      data: {...mockAccount.user, params}
    } as IResponse<T>;
  }
  const result = await ClientAPI.PUT<IResponse<{}>>(
    USER_URL + '/' + MyStaticLocal.getUser()?.id,
    params,
    Utilities.getHeaderRequest()
  );
  return result;
}

export interface IAddressUserRequest {
  type?: 'home' | 'company';
  name?: string;
  phone?: string;
  address?: string;
  user?: {
    id?: number;
    name?: string;
  };
  province?: {
    id?: number;
    name?: string;
  };
  district?: {
    id?: number;
    name?: string;
  };
  ward?: {
    id?: number;
    name?: string;
  };
  is_default?: boolean;
}

export interface IAddressUserGetRquest extends IRequest {
  user: number | undefined;
  is_default?: boolean;
  keyword?: string;
}

async function getUserAddress<T>(params?: IAddressUserGetRquest) {
  if (__DEV__) {
    return {
      code: 0,
      data: mockAddressUser
    } as IResponse<T>;
  }
  const result = await ClientAPI.GET<IResponse<T[]>>(
    USER_ADDRESS_URL,
    params,
    Utilities.getHeaderRequest()
  );
  return result;
}

async function createAddressUser<T>(params?: IAddressUserRequest) {
  if (__DEV__) {
    return {
      code: 0
    } as IResponse<T>;
  }
  const result = await ClientAPI.POST<IResponse<T>>(
    USER_ADDRESS_URL,
    params,
    Utilities.getHeaderRequest()
  );
  return result;
}

async function updateAddressUser<T>(id?: number | string, params?: IAddressUserRequest) {
  if (__DEV__) {
    return {
      code: 0,
      data: {...mockAddressUser[Number(id)-1], params}
    } as IResponse<T>;
  }
  const result = await ClientAPI.PUT<IResponse<T>>(
    USER_ADDRESS_URL + '/' + id,
    params,
    Utilities.getHeaderRequest()
  );
  return result;
}

async function getDetailAddressUser<T>(id?: number | string) {
  if (__DEV__) {
    return {
      code: 0,
      data: mockAddressUser[Number(id)-1]
    } as IResponse<T>;
  }
  const result = await ClientAPI.GET<IResponse<T>>(
    USER_ADDRESS_URL + '/' + id,
    {},
    Utilities.getHeaderRequest()
  );
  return result;
}

export {
  update,
  getDetailPerson,
  getUserAddress,
  createAddressUser,
  updateAddressUser,
  getDetailAddressUser
};
