import {IUserModel} from 'models';
import {IAppAction} from 'views/app/redux';
import {IPersonState} from './Person.Type';

export const PERSON_ACTION = {
  INIT_USER: 'DINGTEA/PERSON/INIT/USER',

  UPDATE_AVATAR: 'DINGTEA/PERSON/UPDATE/AVATAR',
  UPDATE_AVATAR_SUCCESS: 'DINGTEA/PERSON/UPDATE/AVATAR/SUCCESS',
  UPDATE_AVATAR_FAIL: 'DINGTEA/PERSON/UPDATE/AVATAR/FAIL',

  UPDATE_NAME: 'DINGTEA/PERSON/UPDATE/NAME',
  UPDATE_NAME_SUCCESS: 'DINGTEA/PERSON/UPDATE/NAME/SUCCESS',
  UPDATE_NAME_FAIL: 'DINGTEA/PERSON/UPDATE/NAME/FAIL',

  UPDATE_BIRTHDAY: 'DINGTEA/PERSON/UPDATE/BIRTHDAY',
  UPDATE_BIRTHDAY_SUCCESS: 'DINGTEA/PERSON/UPDATE/BIRTHDAY/SUCCESS',
  UPDATE_BIRTHDAY_FAIL: 'DINGTEA/PERSON/UPDATE/BIRTHDAY/FAIL',

  IS_REFRESH: 'DINGTEA/PERSON/IS/REFRESH'
};

export function showRefresh(isRefresh: boolean): IAppAction<IPersonState> {
  return {
    type: PERSON_ACTION.IS_REFRESH,
    payload: {
      isRefresh
    }
  };
}

export function initUser(user?: IUserModel): IAppAction<IPersonState> {
  return {
    type: PERSON_ACTION.INIT_USER,
    payload: {
      id: user?.id,
      name: user?.name,
      note: user?.note,
      phone: user?.phone,
      email: user?.email,
      avatar: user?.avatar,
      cover: user?.cover,
      gender: user?.gender,
      birthday: user?.birthday,
      tax_code: user?.tax_code,
      company: user?.company,
      country: user?.country,
      address: user?.address,
      is_active: user?.is_active,
      is_verified_phone: user?.is_verified_phone,
      is_verified_email: user?.is_verified_email,
      is_verified_password: user?.is_verified_password,
      type: user?.type,
      role: user?.role,
      group: user?.group,
      stores: user?.stores,
      status: user?.status,
      permissions: user?.permissions,
      created_by: user?.created_by,
      total_debt: user?.total_debt,
      total_order_price: user?.total_order_price,
      total_invoice_price: user?.total_invoice_price,
      total_return_price: user?.total_return_price,
      total_purchase: user?.total_purchase,
      total_point: user?.total_point,
      created_at: user?.created_at,
      updated_at: user?.created_at,
      last_purchase: user?.created_at
    }
  };
}

export function updateAvatar(avatar: string) {
  return {
    type: PERSON_ACTION.UPDATE_AVATAR,
    payload: {
      avatar
    }
  };
}

export function updateName(name: string) {
  return {
    type: PERSON_ACTION.UPDATE_NAME,
    payload: {
      name
    }
  };
}

export function updateBirthday(birthday: number) {
  return {
    type: PERSON_ACTION.UPDATE_BIRTHDAY,
    payload: {
      birthday
    }
  };
}

const PersonReducer = (
  state: IPersonState = {isRefresh: false},
  action: IAppAction<IPersonState>
): IPersonState => {
  switch (action.type) {
    case PERSON_ACTION.IS_REFRESH:
      return {
        ...state,
        isRefresh: action.payload?.isRefresh
      };

    case PERSON_ACTION.UPDATE_AVATAR_SUCCESS:
      return {...state, avatar: action.payload?.avatar};
    case PERSON_ACTION.UPDATE_AVATAR_FAIL:
      return state;

    case PERSON_ACTION.UPDATE_NAME_SUCCESS:
      return {...state, name: action.payload?.name};
    case PERSON_ACTION.UPDATE_NAME_FAIL:
      return state;

    case PERSON_ACTION.UPDATE_BIRTHDAY_SUCCESS:
      return {...state, birthday: action.payload?.birthday};
    case PERSON_ACTION.UPDATE_BIRTHDAY_FAIL:
      return state;

    case PERSON_ACTION.INIT_USER:
      return {
        ...state,
        isRefresh: false,
        id: action.payload?.id,
        name: action.payload?.name,
        note: action.payload?.note,
        phone: action.payload?.phone,
        email: action.payload?.email,
        avatar: action.payload?.avatar,
        cover: action.payload?.cover,
        gender: action.payload?.gender,
        birthday: action.payload?.birthday,
        tax_code: action.payload?.tax_code,
        company: action.payload?.company,
        country: action.payload?.country,
        address: action.payload?.address,
        is_active: action.payload?.is_active,
        is_verified_phone: action.payload?.is_verified_phone,
        is_verified_email: action.payload?.is_verified_email,
        is_verified_password: action.payload?.is_verified_password,
        type: action.payload?.type,
        role: action.payload?.role,
        group: action.payload?.group,
        stores: action.payload?.stores,
        status: action.payload?.status,
        permissions: action.payload?.permissions,
        created_by: action.payload?.created_by,
        total_debt: action.payload?.total_debt,
        total_order_price: action.payload?.total_order_price,
        total_invoice_price: action.payload?.total_invoice_price,
        total_return_price: action.payload?.total_return_price,
        total_purchase: action.payload?.total_purchase,
        total_point: action.payload?.total_point,
        created_at: action.payload?.created_at,
        updated_at: action.payload?.created_at,
        last_purchase: action.payload?.created_at
      };

    default:
      return state;
  }
};

export default PersonReducer;
