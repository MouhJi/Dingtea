import {IRequest, IResponse} from 'services';
import ClientAPI from './HTTPClient';
import Utilities from 'utils/Utilities';
export interface IGiftRequest extends IRequest {
  //
}

const HISTORY_GIFT_URL = '';
const CATE_GIFT_URL = '';

async function getListCateGift<T>(params: IGiftRequest) {
  const result = await ClientAPI.GET<IResponse<T[]>>(
    CATE_GIFT_URL,
    params,
    Utilities.getHeaderRequest()
  );
  return result;
}

async function getHistoryGift<T>(params: IGiftRequest) {
  const result = await ClientAPI.GET<IResponse<T[]>>(
    HISTORY_GIFT_URL,
    params,
    Utilities.getHeaderRequest()
  );
  return result;
}
async function getGiftDetailApi<T>(id: number) {
  const result = await ClientAPI.GET<IResponse<T>>(
    HISTORY_GIFT_URL + '/' + id,
    {},
    Utilities.getHeaderRequest()
  );
  return result;
}
export {getHistoryGift, getGiftDetailApi, getListCateGift};
