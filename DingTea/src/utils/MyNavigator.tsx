import {StackActions, CommonActions, TabActions, DrawerActions} from '@react-navigation/native';
import {SCREEN} from 'views/router/type';
import Utilities from './Utilities';

let rootNavigator: any;

export default class MyNavigator {
  static setNavigator = (navigator: any) => {
    rootNavigator = navigator;
  };

  static getNavigator = () => rootNavigator;

  /** mở drawer layout */
  static openDrawer = () => {
    if (rootNavigator) {
      rootNavigator.dispatch(DrawerActions.openDrawer());
    }
  };

  /** đóng drawer layout */
  static closeDrawer = () => {
    if (rootNavigator) {
      rootNavigator.dispatch(DrawerActions.closeDrawer());
    }
  };

  /** đóng/mở drawer layout */
  static toggleDrawer = () => {
    if (rootNavigator) {
      rootNavigator.dispatch(DrawerActions.toggleDrawer());
    }
  };

  /**
   * chuyển tab
   *
   * @T phải là kiểu object không phải là kiểu dữ liệu nguyên thủy (int, bool, string, [])
   * @params là kiểu object
   *
   */
  static jump<T extends {}>(name: SCREEN, params?: T) {
    if (rootNavigator && name) {
      const action = TabActions.jumpTo(name, params);
      rootNavigator.dispatch(action);
    }
  }

  /**
   * thay thế màn hình
   *
   * @T phải là kiểu object không phải là kiểu dữ liệu nguyên thủy (int, bool, string, [])
   * @params là kiểu object
   *
   */
  static replace<T extends {}>(name: SCREEN, params?: T) {
    try {
      if (rootNavigator && name) {
        const action = StackActions.replace(name, params);
        rootNavigator.dispatch(action);
      }
    } catch (error) {
      Utilities.logCrashlytics('MyNavigator - replace: ', error);
    }
  }

  /**
   * reset, push only one on StackScreen, switch screen inside drawerContent
   *
   * @T phải là kiểu object không phải là kiểu dữ liệu nguyên thủy (int, bool, string, [])
   * @params là kiểu object
   *
   */
  static navigate<T extends {}>(name: SCREEN, params?: T) {
    try {
      if (rootNavigator && name) {
        const action = CommonActions.navigate(name, params);
        rootNavigator.dispatch(action);
      }
    } catch (error) {
      Utilities.logCrashlytics('MyNavigator - navigate: ', error);
    }
  }

  /**
   * push 1 màn hình trong StackScreen
   *
   * @T phải là kiểu object không phải là kiểu dữ liệu nguyên thủy (int, bool, string, [])
   * @params là kiểu object
   *
   */
  static push<T extends {}>(name: SCREEN, params?: T) {
    try {
      if (rootNavigator && name) {
        const action = StackActions.push(name, params);
        rootNavigator.dispatch(action);
      }
    } catch (error) {
      Utilities.logCrashlytics('MyNavigator - push: ', error);
    }
  }

  /**
   * Refresh 1 màn hình
   *
   * @T phải là kiểu object không phải là kiểu dữ liệu nguyên thủy (int, bool, string, [])
   * @params là kiểu object
   *
   */
  static refresh<T extends {}>(params: T) {
    if (rootNavigator) {
      const state = rootNavigator.getRootState();
      if (state) {
        const arrRoute = state.routes;
        if (arrRoute && arrRoute.length > 0) {
          const action = CommonActions.setParams(params);
          rootNavigator.dispatch(action);
        }
      }
    }
  }

  static goBack = () => {
    try {
      if (rootNavigator && rootNavigator.canGoBack()) {
        const action = CommonActions.goBack();
        rootNavigator.dispatch(action);
      }
    } catch (error) {
      Utilities.logCrashlytics('MyNavigator - goBack: ', error);
    }
  };

  static popToTop = () => {
    try {
      if (rootNavigator) {
        const action = StackActions.popToTop();
        rootNavigator.dispatch(action);
      }
    } catch (error) {
      Utilities.logCrashlytics('MyNavigator - popToTop: ', error);
    }
  };

  static popTo = (name: any) => {
    try {
      if (rootNavigator && rootNavigator.canGoBack()) {
        const state = rootNavigator.getRootState();
        if (state) {
          const arrRoute = state.routes;
          if (arrRoute && arrRoute.length > 0) {
            const indexScreen = arrRoute.findIndex((x: any) => x.name === name);
            if (indexScreen > -1) {
              let count = 0;
              count = arrRoute.length - 1 - indexScreen;
              if (count) {
                const action = StackActions.pop(count);
                rootNavigator.dispatch(action);
              } else {
                Utilities.log('Khong xac dinh duoc');
              }
            } else {
              Utilities.log(`Khong tim thay man hinh de "${name}" popTo trong Stack Navigation`);
            }
          } else {
            Utilities.log(`Khong tim thay "${name}" trong Stack Navigation`);
          }
        } else {
          Utilities.log(`Khong tim thay "${name}"`);
        }
      }
    } catch (error) {
      Utilities.logCrashlytics('MyNavigator - popToTop: ', error);
    }
  };

  static reset = () => {
    if (rootNavigator) {
      rootNavigator.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'HomeRouter'}]
        })
      );
    }
  };
}
