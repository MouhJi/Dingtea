import {myThemes} from 'themes';
import {myTrans} from 'translations';

import {ISettingState, ISettingAction} from './Setting.Type';
import MyI18n from 'utils/MyI18n';
import MyTheme from 'utils/MyTheme';

export const SETTING_ACTION = {
  CHANGE_LANGUAGE: 'DINGTEA/CHANGE/LANGUAGE',
  CHANGE_THEME: 'DINGTEA/CHANGE/THEME'
};

export function changeLanguage(iso: keyof typeof myTrans): ISettingAction {
  return {
    type: SETTING_ACTION.CHANGE_LANGUAGE,
    payload: {
      iso
    }
  };
}

export function changeTheme(theme: keyof typeof myThemes): ISettingAction {
  return {
    type: SETTING_ACTION.CHANGE_THEME,
    payload: {
      theme
    }
  };
}

const SettingReducer = (
  state: ISettingState = {
    iso: 'vi',
    theme: 'green'
  },
  action: ISettingAction
): ISettingState => {
  switch (action.type) {
    case SETTING_ACTION.CHANGE_LANGUAGE:
      MyI18n.setTranslation(action.payload.iso || 'vi');
      if (action.payload.iso) {
        if (action.payload.iso === 'vi') {
          return {...state};
        }
        return {...state};
      }
      return {...state, iso: action.payload?.iso || 'vi'};

    case SETTING_ACTION.CHANGE_THEME:
      MyTheme.setTheme(action.payload.theme || 'green');
      return {...state, theme: action.payload.theme || 'green'};

    default:
      return state;
  }
};

export default SettingReducer;
