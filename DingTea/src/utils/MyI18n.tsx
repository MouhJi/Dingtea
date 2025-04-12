import {myTrans} from 'translations';

export default class MyI18n {
  static trans = myTrans.vi;

  static setTranslation = (iso: keyof typeof myTrans) => {
    MyI18n.trans = myTrans[iso];
  };
}
