import {IAppAction} from 'views/app/redux';
import {IProDetailEditState} from './ProDetailEdit.Type';

export const PRO_DETAIL_EDIT_ACTION = {
  IS_FIRST_LOADING: 'DINGTEA/PRO/DETAIL/EDIT/IS/FIRST/LOADING',
  IS_REFRESH: 'DINGTEA/PRO/DETAIL/EDIT/IS/REFRESH',

  GET: 'DINGTEA/PRO/DETAIL/EDIT/GET',
  SUCCESS: 'DINGTEA/PRO/DETAIL/EDIT/SUCCESS',
  FAIL: 'DINGTEA/PRO/DETAIL/EDIT/FAIL',

  RESET: 'DINGTEA/PRO/DETAIL/EDIT/RESET'
};

export function showFirstLoading(isFirstLoading: boolean): IAppAction<IProDetailEditState> {
  return {
    type: PRO_DETAIL_EDIT_ACTION.IS_FIRST_LOADING,
    payload: {
      isFirstLoading
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IProDetailEditState> {
  return {
    type: PRO_DETAIL_EDIT_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function getDetail(id: number) {
  return {
    type: PRO_DETAIL_EDIT_ACTION.GET,
    payload: {
      id
    }
  };
}

export function reset(): IAppAction<IProDetailEditState> {
  return {
    type: PRO_DETAIL_EDIT_ACTION.RESET,
    payload: {
      isFirstLoading: true,
      isRefresh: false,
      data: undefined,
      message: undefined
    }
  };
}

const ProDetailEditReducer = (
  state: IProDetailEditState = {isFirstLoading: true, isRefresh: false},
  action: IAppAction<IProDetailEditState>
): IProDetailEditState => {
  switch (action.type) {
    case PRO_DETAIL_EDIT_ACTION.IS_FIRST_LOADING:
      return {
        ...state,
        isFirstLoading: action.payload?.isFirstLoading
      };
    case PRO_DETAIL_EDIT_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };
    case PRO_DETAIL_EDIT_ACTION.SUCCESS:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        data: action.payload?.data
      };
    case PRO_DETAIL_EDIT_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        message: action.payload?.message
      };

    case PRO_DETAIL_EDIT_ACTION.RESET:
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

export default ProDetailEditReducer;
