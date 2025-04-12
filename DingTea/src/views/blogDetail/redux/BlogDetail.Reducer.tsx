import {IAppAction} from 'views/app/redux';
import {IBlogDetailState} from './BlogDetail.Type';

export const BLOG_DETAIL_ACTION = {
  IS_FIRST_LOADING: 'DINGTEA/BLOG/DETAIL/IS/FIRST/LOADING',
  IS_REFRESH: 'DINGTEA/BLOG/DETAIL/IS/REFRESH',

  GET: 'DINGTEA/BLOG/DETAIL/GET',
  SUCCESS: 'DINGTEA/BLOG/DETAIL/SUCCESS',
  FAIL: 'DINGTEA/BLOG/DETAIL/FAIL',

  RESET: 'DINGTEA/BLOG/DETAIL/RESET'
};

export function showFirstLoading(isFirstLoading: boolean): IAppAction<IBlogDetailState> {
  return {
    type: BLOG_DETAIL_ACTION.IS_FIRST_LOADING,
    payload: {
      isFirstLoading
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IBlogDetailState> {
  return {
    type: BLOG_DETAIL_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function getDetail(id: number) {
  return {
    type: BLOG_DETAIL_ACTION.GET,
    payload: {
      id
    }
  };
}

export function reset(): IAppAction<IBlogDetailState> {
  return {
    type: BLOG_DETAIL_ACTION.RESET,
    payload: {
      isFirstLoading: true,
      isRefresh: false,
      blogDetail: undefined,
      message: undefined
    }
  };
}

const BlogDetailReducer = (
  state: IBlogDetailState = {isFirstLoading: true, isRefresh: false},
  action: IAppAction<IBlogDetailState>
): IBlogDetailState => {
  switch (action.type) {
    case BLOG_DETAIL_ACTION.IS_FIRST_LOADING:
      return {
        ...state,
        isFirstLoading: action.payload?.isFirstLoading
      };
    case BLOG_DETAIL_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };
    case BLOG_DETAIL_ACTION.SUCCESS:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        blogDetail: action.payload?.blogDetail
      };
    case BLOG_DETAIL_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        message: action.payload?.message
      };

    case BLOG_DETAIL_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: action.payload?.isFirstLoading,
        isRefresh: action.payload?.isRefresh,
        blogDetail: action.payload?.blogDetail,
        message: action.payload?.message
      };
    default:
      return state;
  }
};

export default BlogDetailReducer;
