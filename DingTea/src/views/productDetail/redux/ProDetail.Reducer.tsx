import {IAppAction} from 'views/app/redux';
import {IProDetailState} from './ProDetail.Type';

export const PRO_DETAIL_ACTION = {
  IS_FIRST_LOADING: 'DINGTEA/PRO/DETAIL/IS/FIRST/LOADING',
  IS_REFRESH: 'DINGTEA/PRO/DETAIL/IS/REFRESH',

  GET: 'DINGTEA/PRO/DETAIL/GET',
  SUCCESS: 'DINGTEA/PRO/DETAIL/SUCCESS',
  FAIL: 'DINGTEA/PRO/DETAIL/FAIL',

  RESET: 'DINGTEA/PRO/DETAIL/RESET'
};

export function showFirstLoading(isFirstLoading: boolean): IAppAction<IProDetailState> {
  return {
    type: PRO_DETAIL_ACTION.IS_FIRST_LOADING,
    payload: {
      isFirstLoading
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IProDetailState> {
  return {
    type: PRO_DETAIL_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function getDetail(id: number) {
  return {
    type: PRO_DETAIL_ACTION.GET,
    payload: {
      id
    }
  };
}

export function reset(): IAppAction<IProDetailState> {
  return {
    type: PRO_DETAIL_ACTION.RESET,
    payload: {
      isFirstLoading: true,
      isRefresh: false,
      data: undefined,
      message: undefined
    }
  };
}

const ProDetailReducer = (
  state: IProDetailState = {isFirstLoading: true, isRefresh: false},
  action: IAppAction<IProDetailState>
): IProDetailState => {
  switch (action.type) {
    case PRO_DETAIL_ACTION.IS_FIRST_LOADING:
      return {
        ...state,
        isFirstLoading: action.payload?.isFirstLoading
      };
    case PRO_DETAIL_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };
    case PRO_DETAIL_ACTION.SUCCESS:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        data: action.payload?.data
      };
    case PRO_DETAIL_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        message: action.payload?.message
      };

    case PRO_DETAIL_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: action.payload?.isFirstLoading,
        isRefresh: action.payload?.isRefresh,
        data: action.payload?.data,
        message: action.payload?.message
      };
    default:
      return state;
  }
};

export default ProDetailReducer;
