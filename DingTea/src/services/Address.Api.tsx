import ClientAPI from './HTTPClient';
import {IRequest, IResponse} from '.';

const CITY_URL = 'v1/provinces';
const DISTRICTS_URL = 'v1/districts';
const WARDS_URL = 'v1/wards';

export interface IAddressRequset extends IRequest {
  name?: string;
  province_code?: string;
  district_code?: string;
}

async function getListCity<T>(params: IAddressRequset) {
  if (__DEV__) {
    return {
      code: 0,
      data: [
        {
          id: 1,
          name: "Hà Nội",
          code: "1000",
        },
        {
          id: 2,
          name: "TP. Hồ Chí Minh",
          code: "2000",
        }
      ]
    } as IResponse<T[]>;
  }
  const result = await ClientAPI.GET<IResponse<T[]>>(CITY_URL, params);
  return result;
}

async function getListDistrict<T>(params: IAddressRequset) {
  if (__DEV__) {
    if (params.province_code === '1000') {
      return {
        code: 0,
        data: [
          {
            id: 11,
            name: "Cầu Giấy",
            code: "1011",
          },
          {
            id: 12,
            name: "Đống Đa",
            code: "1012",
          }
        ]
      } as IResponse<T[]>;
    }
    if (params.province_code === '2000') {
      return {
        code: 0,
        data: [
          {
            id: 21,
            name: "Quận 1",
            code: "2021",
          },
          {
            id: 22,
            name: "Quận 2",
            code: "2022",
          }
        ]
      } as IResponse<T[]>;
    }
    return {
      code: 0,
      data: [
        {
          id: 11,
          name: "Cầu Giấy",
          code: "1011",
        },
        {
          id: 12,
          name: "Đống Đa",
          code: "1012",
        }
      ]
    } as IResponse<T[]>;
  }
  const result = await ClientAPI.GET<IResponse<T[]>>(DISTRICTS_URL, params);
  return result;
}

async function getListWards<T>(params: IAddressRequset) {
  if (__DEV__) {
    if (params.district_code === '1011' || params.district_code === '1012') {
      return {
        code: 0,
        data: [
          {
            id: 111,
            name: "Ngõ 111",
          },
          {
            id: 112,
            name: "Ngõ 112",
          }
        ]
      } as IResponse<T[]>;
    }
    if (params.district_code === '2021' || params.district_code === '2022') {
      return {
        code: 0,
        data: [
          {
            id: 111,
            name: "Ngõ 221",
          },
          {
            id: 112,
            name: "Ngõ 222",
          }
        ]
      } as IResponse<T[]>;
    }
    return {
      code: 0,
      data: [
        {
          id: 123,
          name: "Ngõ 123",
        },
        {
          id: 321,
          name: "Ngõ 321",
        }
      ]
    } as IResponse<T[]>;
  }
  const result = await ClientAPI.GET<IResponse<T[]>>(WARDS_URL, params);
  return result;
}

export {getListCity, getListDistrict, getListWards};
