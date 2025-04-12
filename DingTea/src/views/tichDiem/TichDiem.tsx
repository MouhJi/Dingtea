import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyText, MyView} from 'bases/components';
import {TabView, TabBar} from 'react-native-tab-view';
import {ScrollView} from 'react-native';
import {LoginView} from 'views/accounts/person/component';
import {STATUS_TICH_DIEM} from 'common/Constants';
import MyTheme from 'utils/MyTheme';
import {tichDiemStyles} from './style/TichDiem.Style';
import {IPersonState} from 'views/accounts/person/redux';
import TabTichDiem from './tabTichDiem/TabTichDiem';
import TabQuaTang from './tabGift/TabQuaTang';
// import TabUuDai from './tabUuDai/TabUuDai';
import Voucher from 'views/voucher/Voucher';
import {LAYOUT} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';

interface IProps extends IPersonState {}

class TichDiem extends PureComponent<IProps> {
  routes: any = [
    {key: STATUS_TICH_DIEM.EARN_POINTS, title: MyI18n.trans.earn_points},
    {key: STATUS_TICH_DIEM.GIFT, title: MyI18n.trans.redeem_gifts},
    {key: STATUS_TICH_DIEM.VOUCHER, title: MyI18n.trans.vouchers}
  ];

  state = {index: 0};
  setIndex = (index: number) => {
    this.setState({index});
  };

  renderLabel = ({route, color}: {route: any; color: string}) => {
    switch (route.key) {
      case STATUS_TICH_DIEM.EARN_POINTS: {
        return (
          <MyText fontStyle="Bold" style={{color}}>
            {MyI18n.trans.earn_points}
          </MyText>
        );
      }
      case STATUS_TICH_DIEM.GIFT: {
        return (
          <MyText fontStyle="Bold" style={{color}}>
            {MyI18n.trans.redeem_gifts}
          </MyText>
        );
      }
      case STATUS_TICH_DIEM.VOUCHER: {
        return (
          <MyText fontStyle="Bold" style={{color}}>
            {MyI18n.trans.vouchers}
          </MyText>
        );
      }
      default:
        return null;
    }
  };

  renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        scrollEnabled={true}
        activeColor={MyTheme.themes.TEXT.PRIMARY}
        inactiveColor={MyTheme.themes.TAB.INACTIVE}
        style={{backgroundColor: MyTheme.themes.BG.WHITE}}
        renderLabel={this.renderLabel}
        indicatorStyle={{
          backgroundColor: MyTheme.themes.TEXT.BROWN,
          height: LAYOUT.l_4
        }}
      />
    );
  };

  renderScene = ({route}: {route: any}) => {
    const {id} = this.props;
    switch (route.key) {
      case STATUS_TICH_DIEM.EARN_POINTS: {
        if (id) {
          return (
            <TabTichDiem
              onPressQuaTang={() => this.setIndex(1)}
              onPressUuDai={() => {
                Utilities.showToast('Thông báo', 'Tính năng sắp ra mắt');
                // this.setIndex(2)
              }}
            />
          );
        } else {
          return (
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              <LoginView />
            </ScrollView>
          );
        }
      }
      case STATUS_TICH_DIEM.GIFT: {
        if (id) {
          return <TabQuaTang />;
        } else {
          return (
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              <LoginView />
            </ScrollView>
          );
        }
      }
      case STATUS_TICH_DIEM.VOUCHER: {
        if (id) {
          return <Voucher />;
        } else {
          return (
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              <LoginView />
            </ScrollView>
          );
        }
      }
      default:
        return null;
    }
  };

  render() {
    const {index} = this.state;
    const routes = this.routes;

    return (
      <MyView style={tichDiemStyles.container}>
        <TabView
          lazy={true}
          navigationState={{index, routes}}
          onIndexChange={this.setIndex}
          renderTabBar={this.renderTabBar}
          renderScene={this.renderScene}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  const {id} = state.PersonReducer;
  return {iso, id, theme};
};
export default connect(mapStateToProps, null, null, {forwardRef: true})(TichDiem);
