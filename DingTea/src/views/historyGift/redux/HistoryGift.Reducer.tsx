import {IGiftRequest} from 'services';
import {IAppAction} from 'views/app/redux';
import {IHistoryGiftState} from './HistoryGift.Type';

export const HISTORY_GIFT_ACTION = {
  IS_REFRESH: 'DINGTEA/HISTORY/GIFT/IS/REFRESH',

  GET: 'DINGTEA/HISTORY/GIFT/GET',
  SUCCESS: 'DINGTEA/HISTORY/GIFT/SUCCESS',
  FAIL: 'DINGTEA/HISTORY/GIFT/FAIL',

  IS_LOADMORE: 'DINGTEA/HISTORY/GIFT/IS/LOADMORE'
};

export function getListHistoryGift(params: IGiftRequest) {
  return {
    type: HISTORY_GIFT_ACTION.GET,
    payload: {
      params
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IHistoryGiftState> {
  return {
    type: HISTORY_GIFT_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<IHistoryGiftState> {
  return {
    type: HISTORY_GIFT_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

const HistoryGiftReducer = (
  state: IHistoryGiftState = {
    isFirstLoading: true,
    isRefresh: false,
    historyGift: [],
    isLoadmore: false,
    isStop: false
  },
  action: IAppAction<IHistoryGiftState>
): IHistoryGiftState => {
  switch (action.type) {
    case HISTORY_GIFT_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case HISTORY_GIFT_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case HISTORY_GIFT_ACTION.SUCCESS:
      if (state.isRefresh) {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          historyGift: action.payload?.historyGift,
          isStop: action.payload?.isStop
        };
      } else {
        return {
          ...state,
          isFirstLoading: false,
          isRefresh: false,
          isLoadmore: false,
          historyGift: state.historyGift?.concat(action.payload?.historyGift || []),
          isStop: action.payload?.isStop
        };
      }

    case HISTORY_GIFT_ACTION.FAIL:
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
export default HistoryGiftReducer;
