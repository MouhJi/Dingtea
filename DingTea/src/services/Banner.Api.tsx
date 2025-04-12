import ClientAPI from './HTTPClient';
import {IRequest, IResponse} from '.';
import mockBannerList from './mock/Banner.Api.json';

const BANNER_URL = 'v1/banners';

export interface IBannerRequset extends IRequest {}

async function getListBanner<T>(params: IBannerRequset) {
  if (__DEV__) {
    return {
      code: 0,
      data: mockBannerList,
      message: "Success"
    } as IResponse<T[]>;
  }
  
  const result = await ClientAPI.GET<IResponse<T[]>>(BANNER_URL, params);
  return result;
}

export {getListBanner};
