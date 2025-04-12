import {myTrans} from 'translations';
import {myThemes} from 'themes';

export type ISettingState = {
  iso?: keyof typeof myTrans;
  theme?: keyof typeof myThemes;
};

export interface ISettingAction {
  type: string;
  payload: {
    iso?: keyof typeof myTrans;
    theme?: keyof typeof myThemes;
  };
}
