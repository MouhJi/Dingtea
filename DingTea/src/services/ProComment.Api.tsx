import ClientAPI from './HTTPClient';
import {IRequest, IResponse} from '.';
import Utilities from 'utils/Utilities';

const PRO_COMMENT_URL = '';
export interface IProCommentRequest extends IRequest {
  sort_by?: string;
  order_by?: 'asc' | 'desc';
}

async function getProComment<T>(params: IProCommentRequest) {
  const result = await ClientAPI.GET<IResponse<T[]>>(
    PRO_COMMENT_URL,
    params,
    Utilities.getHeaderRequest()
  );
  return result;
}

export {getProComment};
