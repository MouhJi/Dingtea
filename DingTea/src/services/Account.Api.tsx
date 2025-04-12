import ClientAPI from './HTTPClient';
import {IResponse} from '.';
import Utilities from 'utils/Utilities';
import mockAccount from './mock/Account.Api.json';

const AUTH_URL = '/v1/auth';

async function postLogin<T>(data: any) {
  if (__DEV__) {
    if (data.password !== "123456") {
      return {
        code: 1
      } as IResponse<T>;
    }
    return {
      code: 0,
      data: mockAccount
    } as IResponse<T>;
  }
  const lastUri = `${AUTH_URL}/login`;
  const response = await ClientAPI.POST<IResponse<T>>(lastUri, data);
  return response;
}
async function postCode<T>(data: any) {
  if (__DEV__) {
    return {
      code: 0,
      message: "123456"
    } as IResponse<T>;
  }
  const lastUri = `${AUTH_URL}/request-login`;
  const response = await ClientAPI.POST<IResponse<T>>(lastUri, data);
  return response;
}
async function postRegister<T>(data: any) {
  if (__DEV__) {
    if (data.phone === "0987654321") {
      return {
        code: 500
      } as IResponse<T>;
    }
    return {
      code: 0
    } as IResponse<T>;
  }
  const lastUri = `${AUTH_URL}/register`;
  const response = await ClientAPI.POST<IResponse<T>>(lastUri, data);
  return response;
}
async function refreshToken<T>(data: {token: string} = {token: ''}) {
  if (__DEV__) {
    return {
      code: 0,
      data: mockAccount.token
    } as IResponse<T>;
  }
  const lastUri = `${AUTH_URL}/refresh-token/` + (Utilities.isAndroid() ? 'android' : 'ios');
  const response = await ClientAPI.POST<IResponse<T>>(lastUri, data);
  return response;
}

export {postLogin, postCode, postRegister, refreshToken};
