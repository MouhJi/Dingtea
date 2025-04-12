import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {TabView, TabBar} from 'react-native-tab-view';

import TabFinish from './components/tabFinish/TabFinish';
import TabWaitting from './components/tabWaitting/TabWaitting';
import TabCancel from './components/tabCancel/TabCancel';
import TabShipping from './components/tabShipping/TabShipping';
import {orderStyles} from './style/Order.Style';

import {MyText, MyView} from 'bases/components';
import {IPersonState} from 'views/accounts/person/redux';
import {getListOrdersFinish} from './components/tabFinish/redux';
import {getListOrdersWaitting} from './components/tabWaitting/redux';
import {getListOrdersShipping} from './components/tabShipping/redux';
import {getListOrdersCancel} from './components/tabCancel/redux';
import {STATUS_ORDER} from 'common/Constants';
import MyTheme from 'utils/MyTheme';
import {LAYOUT} from 'bases/styles/Core';

interface defaultProps extends IPersonState {
  getListOrdersFinish: typeof getListOrdersFinish;
  getListOrdersWaitting: typeof getListOrdersWaitting;
  getListOrdersShipping: typeof getListOrdersShipping;
  getListOrdersCancel: typeof getListOrdersCancel;
}

class Order extends PureComponent<defaultProps> {
  routes: any = [
    {key: STATUS_ORDER.COMPLETED, title: MyI18n.trans.finish},
    {key: STATUS_ORDER.PENDING, title: MyI18n.trans.waiting},
    {key: STATUS_ORDER.PROCESSING, title: MyI18n.trans.delivering},
    {key: STATUS_ORDER.CANCELLED, title: MyI18n.trans.cancelled}
  ];
  state = {index: 0};

  setIndex = (index: number) => {
    this.setState({index});
    // Tải lại mỗi lần chuyển tab
    // switch (this.routes[index].key) {
    //   case STATUS_ORDER.COMPLETED: {
    //     this.props.getListOrdersFinish({
    //       skip: 0,
    //       limit: 10,
    //       statuses: 'completed',
    //       order_by: 'desc',
    //       sort_by: 'created_at'
    //     });
    //     break;
    //   }
    //   case STATUS_ORDER.PENDING: {
    //     this.props.getListOrdersWaitting({
    //       skip: 0,
    //       limit: 10,
    //       statuses: 'pending',
    //       order_by: 'desc',
    //       sort_by: 'created_at'
    //     });
    //     break;
    //   }
    //   case STATUS_ORDER.CANCELLED: {
    //     this.props.getListOrdersCancel({
    //       skip: 0,
    //       limit: 10,
    //       statuses: 'cancelled',
    //       order_by: 'desc',
    //       sort_by: 'created_at'
    //     });
    //     break;
    //   }
    //   case STATUS_ORDER.DELIVERING: {
    //     this.props.getListOrdersShipping({
    //       skip: 0,
    //       limit: 10,
    //       statuses: 'delivering',
    //       order_by: 'desc',
    //       sort_by: 'created_at'
    //     });
    //     break;
    //   }
    // }
  };

  renderLabel = ({route, color}: {route: any; color: string}) => {
    switch (route.key) {
      case STATUS_ORDER.COMPLETED: {
        return (
          <MyText fontStyle="Bold" style={{color}}>
            {MyI18n.trans.finish}
          </MyText>
        );
      }
      case STATUS_ORDER.PENDING: {
        return (
          <MyText fontStyle="Bold" style={{color}}>
            {MyI18n.trans.waiting}
          </MyText>
        );
      }
      case STATUS_ORDER.CANCELLED: {
        return (
          <MyText fontStyle="Bold" style={{color}}>
            {MyI18n.trans.cancelled}
          </MyText>
        );
      }
      case STATUS_ORDER.PROCESSING: {
        return (
          <MyText fontStyle="Bold" style={{color}}>
            {MyI18n.trans.delivering}
          </MyText>
        );
      }
    }
  };

  renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        scrollEnabled={true}
        activeColor={MyTheme.themes.BG.BLACK}
        inactiveColor={MyTheme.themes.TEXT.SECONDARY_LIGHT}
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
    switch (route.key) {
      case STATUS_ORDER.COMPLETED: {
        return <TabFinish />;
      }
      case STATUS_ORDER.PENDING: {
        return <TabWaitting />;
      }
      case STATUS_ORDER.CANCELLED: {
        return <TabCancel />;
      }
      case STATUS_ORDER.PROCESSING: {
        return <TabShipping />;
      }
    }
  };

  render() {
    const {index} = this.state;
    const routes = this.routes;

    // let _viewContent = id ? (
    //   <TabView
    //     lazy={true}
    //     navigationState={{index, routes}}
    //     onIndexChange={this.setIndex}
    //     renderTabBar={this.renderTabBar}
    //     renderScene={this.renderScene}
    //   />
    // ) : (
    //   // <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    //   //   <LoginView />
    //   // </ScrollView>
    //   MyNavigator.navigate('Login')
    // );

    return (
      <MyView style={orderStyles.container}>
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

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListOrdersFinish,
      getListOrdersWaitting,
      getListOrdersShipping,
      getListOrdersCancel
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
