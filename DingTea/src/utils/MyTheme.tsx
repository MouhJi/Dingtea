import {myThemes} from 'themes';

export default class MyTheme {
  static themes = myThemes.green;

  static setTheme = (themes: keyof typeof myThemes) => {
    MyTheme.themes = myThemes[themes];
  };
}
