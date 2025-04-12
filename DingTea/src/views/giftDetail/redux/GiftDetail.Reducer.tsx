import {IAppAction} from 'views/app/redux';
import {IGiftDetailState} from '.';

export const GIFT_DETAIL_ACTION = {
  IS_FIRST_LOADING: 'DINGTEA/GIFT/DETAIL/IS/FIRST/LOADING',
  IS_REFRESH: 'DINGTEA/GIFT/DETAIL/IS/REFRESH',

  GET: 'DINGTEA/GIFT/DETAIL/GET',
  SUCCESS: 'DINGTEA/GIFT/DETAIL/SUCCESS',
  FAIL: 'DINGTEA/GIFT/DETAIL/FAIL',

  RESET: 'DINGTEA/GIFT/DETAIL/RESET'
};
export function showFirstLoading(isFirstLoading: boolean): IAppAction<IGiftDetailState> {
  return {
    type: GIFT_DETAIL_ACTION.IS_FIRST_LOADING,
    payload: {
      isFirstLoading
    }
  };
}
export function getGiftDetail(id: number) {
  return {
    type: GIFT_DETAIL_ACTION.GET,
    payload: {
      id
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IGiftDetailState> {
  return {
    type: GIFT_DETAIL_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function reset(): IAppAction<IGiftDetailState> {
  return {
    type: GIFT_DETAIL_ACTION.RESET,
    payload: {
      isFirstLoading: true,
      isRefresh: false,
      data: undefined,
      message: undefined
    }
  };
}

const GiftDetailReducer = (
  state: IGiftDetailState = {
    isFirstLoading: true,
    isRefresh: false
  },
  action: IAppAction<IGiftDetailState>
): IGiftDetailState => {
  switch (action.type) {
    case GIFT_DETAIL_ACTION.IS_FIRST_LOADING:
      return {
        ...state,
        isFirstLoading: action.payload?.isFirstLoading
      };
    case GIFT_DETAIL_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };
    case GIFT_DETAIL_ACTION.SUCCESS:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        data: action.payload?.data
      };

    case GIFT_DETAIL_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        message: action.payload?.message
      };

    case GIFT_DETAIL_ACTION.RESET:
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
export default GiftDetailReducer;
