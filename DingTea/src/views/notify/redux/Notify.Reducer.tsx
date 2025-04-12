import {INotifyRequest} from 'services';
import {IAppAction} from 'views/app/redux';
import {INotifyState} from './Notify.Type';

export const NOTIFY_ACTION = {
  IS_REFRESH: 'DINGTEA/NOTIFY/IS/REFRESH',

  GET: 'DINGTEA/NOTIFY/GET',
  SUCCESS: 'DINGTEA/NOTIFY/SUCCESS',
  FAIL: 'DINGTEA/NOTIFY/FAIL',

  IS_LOADMORE: 'DINGTEA/NOTIFY/IS/LOADMORE'
};

export function getListNotify(params: INotifyRequest) {
  return {
    type: NOTIFY_ACTION.GET,
    payload: {
      params
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<INotifyState> {
  return {
    type: NOTIFY_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<INotifyState> {
  return {
    type: NOTIFY_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

const NotifyReducer = (
  state: INotifyState = {
    isFirstLoading: true,
    isRefresh: false,
    listNotify: [],
    isLoadmore: false,
    isStop: false
  },
  action: IAppAction<INotifyState>
): INotifyState => {
  switch (action.type) {
    case NOTIFY_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case NOTIFY_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case NOTIFY_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          listNotify: action.payload?.listNotify,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          listNotify: state.listNotify?.concat(action.payload?.listNotify || []),
          isStop: action.payload?.isStop
        };
      }

    case NOTIFY_ACTION.FAIL:
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
export default NotifyReducer;
