import {IProCommentRequest} from 'services';
import {IAppAction} from 'views/app/redux';
import {IProCommentState} from '.';

export const PRO_COMMENT_ACTION = {
  IS_REFRESH: 'DINGTEA/PRO/COMMENT/IS/REFRESH',

  GET: 'DINGTEA/PRO/COMMENT/GET',
  SUCCESS: 'DINGTEA/PRO/COMMENT/SUCCESS',
  FAIL: 'DINGTEA/PRO/COMMENT/FAIL',

  IS_LOADMORE: 'DINGTEA/PRO/COMMENT/IS/LOADMORE'
};

export function getListProComment(params: IProCommentRequest) {
  return {
    type: PRO_COMMENT_ACTION.GET,
    payload: {
      params
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IProCommentState> {
  return {
    type: PRO_COMMENT_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<IProCommentState> {
  return {
    type: PRO_COMMENT_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

const MenuReducer = (
  state: IProCommentState = {
    isFirstLoading: true,
    isRefresh: false,
    listProComment: [],
    isLoadmore: false,
    isStop: false
  },
  action: IAppAction<IProCommentState>
): IProCommentState => {
  switch (action.type) {
    case PRO_COMMENT_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case PRO_COMMENT_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case PRO_COMMENT_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          listProComment: action.payload?.listProComment,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          listProComment: state.listProComment?.concat(action.payload?.listProComment || []),
          isStop: action.payload?.isStop
        };
      }

    case PRO_COMMENT_ACTION.FAIL:
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
export default MenuReducer;
