import React, {Component} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const MainStack = createBottomTabNavigator();

import HomeScreen from 'views/home/Home';
import DoUongScreen from 'views/doUong/DoUong';
import TichDiemScreen from 'views/tichDiem/TichDiem';
import PersonScreen from 'views/accounts/person/Person';
import StoreScreen from 'views/store/Store';
import {FONT_FAMILY, PADDING, setPadding} from 'bases/styles/Core';
import {SvgCss} from 'react-native-svg/css';
import MyTheme from 'utils/MyTheme';
import MyI18n from 'utils/MyI18n';
import Utilities from 'utils/Utilities';

export default class RouterBottomTab extends Component {
  render() {
    return (
      <MainStack.Navigator
        screenOptions={{
          tabBarActiveTintColor: MyTheme.themes.TEXT.BROWN,
          tabBarInactiveTintColor: MyTheme.themes.TAB.INACTIVE,
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontFamily: FONT_FAMILY.Bold,
            ...setPadding(PADDING.p_4, PADDING.p_4, PADDING.p_0, PADDING.p_0)
          }
        }}>
        <MainStack.Screen
          name="HomeTab"
          component={HomeScreen}
          options={{
            title: MyI18n.trans.home_page,
            tabBarIcon: ({color}) => <SvgCss xml={Utilities.getSvgTrangChu(color)} />
          }}
        />
        <MainStack.Screen
          name="CuaHang"
          component={StoreScreen}
          options={{
            title: MyI18n.trans.store_page,
            tabBarIcon: ({color}) => <SvgCss xml={Utilities.getSvgStore(color)} />
          }}
        />
        <MainStack.Screen
          name="DoUong"
          component={DoUongScreen}
          options={{
            title: MyI18n.trans.drink,
            tabBarIcon: ({color}) => <SvgCss xml={Utilities.getSvgDoUong(color)} />
          }}
        />
        <MainStack.Screen
          name="TichDiem"
          component={TichDiemScreen}
          options={{
            title: MyI18n.trans.earn_points,
            tabBarIcon: ({color}) => <SvgCss xml={Utilities.getSvgTichDiem(color)} />
          }}
        />
        <MainStack.Screen
          name="Person"
          component={PersonScreen}
          options={{
            title: MyI18n.trans.account,
            tabBarIcon: ({color}) => <SvgCss xml={Utilities.getSvgTaiKhoan(color)} />
          }}
        />
      </MainStack.Navigator>
    );
  }
}
