import ClientAPI from './HTTPClient';
import {IRequest, IResponse} from '.';
import Utilities from 'utils/Utilities';

const NOTIFY_URL = '';

export interface INotifyRequest extends IRequest {
  sort_by?: string;
  order_by?: 'asc' | 'desc';
}

async function getNotify<T>(params: INotifyRequest) {
  const result = await ClientAPI.GET<IResponse<T[]>>(
    NOTIFY_URL,
    params,
    Utilities.getHeaderRequest()
  );
  return result;
}

export {getNotify};
