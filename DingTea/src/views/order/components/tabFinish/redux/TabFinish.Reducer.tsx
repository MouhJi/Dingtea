import {IOderRequest} from 'services';
import {IAppAction} from 'views/app/redux';
import {ITabFinishState} from './TabFinish.Type';

export const TAB_FINISH_ACTION = {
  IS_REFRESH: 'DINGTEA/TAB/FINISH/IS/REFRESH',

  GET: 'DINGTEA/TAB/FINISH/GET',
  SUCCESS: 'DINGTEA/TAB/FINISH/SUCCESS',
  FAIL: 'DINGTEA/TAB/FINISH/FAIL',

  IS_LOADMORE: 'DINGTEA/TAB/FINISH/IS/LOADMORE'
};

export function getListOrdersFinish(params: IOderRequest) {
  return {
    type: TAB_FINISH_ACTION.GET,
    payload: {
      params
    }
  };
}

export function showRefreshFinish(isRefresh: boolean): IAppAction<ITabFinishState> {
  return {
    type: TAB_FINISH_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<ITabFinishState> {
  return {
    type: TAB_FINISH_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

const OrderFinishReducer = (
  state: ITabFinishState = {
    isFirstLoading: true,
    isRefresh: false,
    data: [],
    isLoadmore: false,
    isStop: false,
    skip: 0
  },
  action: IAppAction<ITabFinishState>
): ITabFinishState => {
  switch (action.type) {
    case TAB_FINISH_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case TAB_FINISH_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case TAB_FINISH_ACTION.SUCCESS:
      if (action.payload?.skip === 0) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          data: action.payload?.data,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          data: state.data?.concat(action.payload?.data || []),
          isStop: action.payload?.isStop
        };
      }

    case TAB_FINISH_ACTION.FAIL:
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
export default OrderFinishReducer;
