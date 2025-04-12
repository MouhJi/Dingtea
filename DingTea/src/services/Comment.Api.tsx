import {IResponse} from 'services';
import ClientAPI from './HTTPClient';
import Utilities from 'utils/Utilities';

export interface ICommentRequest {
  //
}

const COMMENT_URL = '';

async function createComment<T>(params: ICommentRequest) {
  const result = await ClientAPI.POST<IResponse<T[]>>(
    COMMENT_URL,
    params,
    Utilities.getHeaderRequest()
  );
  return result;
}

export {createComment};
