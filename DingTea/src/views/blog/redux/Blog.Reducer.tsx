import {IBlogRequest} from 'services';
import {IAppAction} from 'views/app/redux';
import {IBlogState} from './Blog.Type';

export const BLOG_ACTION = {
  IS_REFRESH: 'DINGTEA/BLOG/IS/REFRESH',

  GET: 'DINGTEA/BLOG/GET',
  SUCCESS: 'DINGTEA/BLOG/SUCCESS',
  FAIL: 'DINGTEA/BLOG/FAIL',

  IS_LOADMORE: 'DINGTEA/BLOG/IS/LOADMORE'
};

export function getListBlog(params: IBlogRequest) {
  return {
    type: BLOG_ACTION.GET,
    payload: {
      params
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IBlogState> {
  return {
    type: BLOG_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<IBlogState> {
  return {
    type: BLOG_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

const BlogReducer = (
  state: IBlogState = {
    isFirstLoading: true,
    isRefresh: false,
    listBlog: [],
    isLoadmore: false,
    isStop: false
  },
  action: IAppAction<IBlogState>
): IBlogState => {
  switch (action.type) {
    case BLOG_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case BLOG_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case BLOG_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          listBlog: action.payload?.listBlog,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          listBlog: state.listBlog?.concat(action.payload?.listBlog || []),
          isStop: action.payload?.isStop
        };
      }

    case BLOG_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadmore: false,
        message: action.payload?.message,
        isError: true
      };

    default:
      return state;
  }
};
export default BlogReducer;
