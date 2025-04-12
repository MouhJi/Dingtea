import {ICateRequest} from 'services';
import {IAppAction} from 'views/app/redux';
import {IMenuState} from './Menu.Type';

export const MENU_ACTION = {
  IS_REFRESH: 'DINGTEA/MENU/IS/REFRESH',

  GET: 'DINGTEA/MENU/GET',
  SUCCESS: 'DINGTEA/MENU/SUCCESS',
  FAIL: 'DINGTEA/MENU/FAIL',

  IS_LOADMORE: 'DINGTEA/MENU/IS/LOADMORE'
};

export function getListCate(params: ICateRequest) {
  return {
    type: MENU_ACTION.GET,
    payload: {
      params
    }
  };
}

export function showRefresh(isRefresh: boolean): IAppAction<IMenuState> {
  return {
    type: MENU_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function showLoadmore(isLoadmore: boolean): IAppAction<IMenuState> {
  return {
    type: MENU_ACTION.IS_LOADMORE,
    payload: {
      isLoadmore
    }
  };
}

const MenuReducer = (
  state: IMenuState = {
    isFirstLoading: true,
    isRefresh: false,
    data: [],
    isLoadmore: false,
    isStop: false
  },
  action: IAppAction<IMenuState>
): IMenuState => {
  switch (action.type) {
    case MENU_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case MENU_ACTION.IS_LOADMORE:
      return {
        ...state,
        isLoadmore: action.payload?.isLoadmore
      };

    case MENU_ACTION.SUCCESS:
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

    case MENU_ACTION.FAIL:
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
