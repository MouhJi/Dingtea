import {IAddressUserGetRquest} from 'services';
import {IAppAction} from 'views/app/redux';
import {IAddressUserState} from './AddressUser.Type';

export const ADDRESS_USER_ACTION = {
  IS_REFRESH: 'DINGTEA/ADDRESS/USER/IS/REFRESH',

  GET: 'DINGTEA/ADDRESS/USER/GET',
  SUCCESS: 'DINGTEA/ADDRESS/USER/SUCCESS',
  FAIL: 'DINGTEA/ADDRESS/USER/FAIL',

  IS_LOADMORE: 'DINGTEA/ADDRESS/USER/IS/LOADMORE',

  RESET: 'DINGTEA/ADDRESS/USER/RESET',
  ADD_KEY_WORD: 'DINGTEA/ADDRESS/USER/ADD_KEY_WORD'
};

export function getListAddressUser(params: IAddressUserGetRquest) {
  return {
    type: ADDRESS_USER_ACTION.GET,
    payload: {
      params
    }
  };
}
export function setKeywordAddress(keyword: string) {
  return {
    type: ADDRESS_USER_ACTION.ADD_KEY_WORD,
    payload: {
      keyword
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IAddressUserState> {
  return {
    type: ADDRESS_USER_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<IAddressUserState> {
  return {
    type: ADDRESS_USER_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

export function reset(): IAppAction<IAddressUserState> {
  return {
    type: ADDRESS_USER_ACTION.RESET,
    payload: {
      isFirstLoading: true,
      isRefresh: false,
      data: [],
      isLoadmore: false,
      isStop: false,
      message: undefined,
      keyword: ''
    }
  };
}

const AddressUserReducer = (
  state: IAddressUserState = {
    isFirstLoading: true,
    isRefresh: false,
    data: [],
    isLoadmore: false,
    isStop: false,
    keyword: ''
  },
  action: IAppAction<IAddressUserState>
): IAddressUserState => {
  switch (action.type) {
    case ADDRESS_USER_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case ADDRESS_USER_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case ADDRESS_USER_ACTION.SUCCESS:
      if (state.isRefresh) {
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

    case ADDRESS_USER_ACTION.FAIL:
      return {
        ...state,
        isFirstLoading: false,
        isRefresh: false,
        isLoadmore: false,
        message: action.payload?.message,
        isError: true
      };

    case ADDRESS_USER_ACTION.RESET:
      return {
        ...state,
        isFirstLoading: action.payload?.isFirstLoading,
        isRefresh: action.payload?.isRefresh,
        data: action.payload?.data,
        isLoadmore: action.payload?.isLoadmore,
        isStop: action.payload?.isStop,
        message: action.payload?.message,
        keyword: action.payload?.keyword
      };
    case ADDRESS_USER_ACTION.ADD_KEY_WORD: {
      return {
        ...state,
        keyword: action.payload?.keyword
      };
    }
    default:
      return state;
  }
};
export default AddressUserReducer;
