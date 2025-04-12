import ClientAPI from './HTTPClient';
import {IRequest, IResponse} from '.';
// import Utilities from 'utils/Utilities';
import mockBlogList from './mock/Blog.Api.List.json';
import mockBlogDetail from './mock/Blog.Api.Detail.json';

const BLOG_URL = 'v1/posts';

export interface IBlogRequest extends IRequest {
  sort_by?: string;
  order_by?: 'asc' | 'desc';
  keyword?: string;
  is_public?: boolean;
  categories?: number | string;
}

async function getBlog<T>(params: IBlogRequest) {
  if (__DEV__) {
    return {
      code: 0,
      data: mockBlogList,
      message: "Success"
    } as IResponse<T[]>;
  }

  const result = await ClientAPI.GET<IResponse<T[]>>(
    BLOG_URL,
    params
    // Utilities.getHeaderRequest()
  );
  return result;
}
async function getDetailBlog<T>(id: number) {
  if (__DEV__) {
    return {
      code: 0,
      data: mockBlogDetail,
      message: "Success"
    } as IResponse<T>;
  }
  
  const result = await ClientAPI.GET<IResponse<T>>(
    BLOG_URL + '/' + id,
    {}
    // Utilities.getHeaderRequest()
  );
  return result;
}

export {getBlog, getDetailBlog};
