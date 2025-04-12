import React, {createRef, PureComponent} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import SlideBannerComponent from './components/slideBanner/SlideBannerComponent';
import {ItemProduct} from 'views/app/components';

import {homeStyles} from './style/Home.Style';
import CartBottom from './components/cartBottom/CartBottom';
import {MyView, MyText, LoadingList, MyButtonText} from 'bases/components';
import {IHomeState, getListProductHome, showRefresh, showLoadmore, showSuccess} from './redux';
import {IProductModel, ITokenModel} from 'models';
import MyStaticLocal from 'utils/MyStaticLocal';
import {refreshToken} from 'services';
import Utilities from 'utils/Utilities';
import MyStorage from 'utils/MyStorage';
import {ADDRESS_USER_CHOOSE, USER_DATA} from 'common/KeyStorages';
import {initUser} from 'views/accounts/person/redux';
import {chooseAddressUser} from 'views/app/reduxChooseAddressUser';
import NewComponent from './components/blog/NewComponent';
import DayComponent from './components/blog/DayComponent';
import BaoTriModal from './components/baotriAndupdateApp/BaoTriModal';
import UpdateAppModal from './components/baotriAndupdateApp/UpdateAppModal';
import SupportOSModal from './components/baotriAndupdateApp/SupportOSModal';

interface defaultProps extends IHomeState {
  getListProductHome: typeof getListProductHome;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
  initUser: typeof initUser;
  chooseAddressUser: typeof chooseAddressUser;
  showSuccess: typeof showSuccess;
}

class Home extends PureComponent<defaultProps> {
  SlideBannerRef: any = createRef();
  BlogDayRef: any = createRef();
  BlogNewRef: any = createRef();
  BaoTriModalRef: any = createRef();
  UpdateAppModalRef: any = createRef();
  SupportOSModalRef: any = createRef();

  componentDidMount() {
    const {
      data,
      isLoadmore,
      isStop
    } = this.props;
    if (isLoadmore || isStop) {
      return;
    }
    this.props.showLoadmore(true);
    this.props.getListProductHome({
      skip: data?.length || 0,
      limit: 10,
      statuses: 'active',
      types: 'item'
    });
  }

  logout = () => {
    MyStorage.delete(USER_DATA).then(() => {
      MyStaticLocal.setUserToken(undefined);
      MyStaticLocal.setUser(undefined);
      this.props.initUser(undefined);
      MyStorage.delete(ADDRESS_USER_CHOOSE);
      this.props.chooseAddressUser(undefined);
    });
  };

  refreshTokenUser = (tokenRefresh: string) => {
    refreshToken<ITokenModel>({token: tokenRefresh})
      .then(res => {
        if (res?.code) {
          Utilities.showToast('Phiên đăng nhập đã hết hạn', '', 'info');
          this.logout();
        } else {
          if (res?.data) {
            MyStaticLocal.setUserToken(res?.data);
          } else {
            Utilities.showToast('Phiên đăng nhập đã hết hạn', '', 'info');
            this.logout();
          }
        }
      })
      .catch(() => {
        Utilities.showToast('Phiên đăng nhập đã hết hạn', '', 'info');
        this.logout();
      });
  };

  checkVersion = (arrVersionCurrent: any, arrVersionServer: any) => {
    let ok = false;
    if (Number(arrVersionCurrent[0]) < Number(arrVersionServer[0])) {
      ok = true;
    } else if (
      Number(arrVersionCurrent[0]) === Number(arrVersionServer[0]) &&
      Number(arrVersionCurrent[1]) < Number(arrVersionServer[1])
    ) {
      ok = true;
    } else if (
      Number(arrVersionCurrent[0]) === Number(arrVersionServer[0]) &&
      Number(arrVersionCurrent[1]) === Number(arrVersionServer[1]) &&
      Number(arrVersionCurrent[2]) < Number(arrVersionServer[2])
    ) {
      ok = true;
    } else {
      ok = false;
    }
    return ok;
  };

  reload = () => {
    const {isFirstLoading, isLoadmore} = this.props;
    if (!isFirstLoading && !isLoadmore) {
      this.SlideBannerRef?.current?.componentDidMount();
      this.BlogDayRef?.current?.componentDidMount();
      this.BlogNewRef?.current?.componentDidMount();

      this.props.showRefresh(true);
      this.props.getListProductHome({
        skip: 0,
        limit: 10,
        statuses: 'active',
        types: 'item'
      });
      // setTimeout(() => {
      //   this.props.showSuccess();
      // }, 1000);
    }
  };

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = ({item}: {item: IProductModel}) => {
    return <ItemProduct style={homeStyles.itemProduct} data={item} />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={homeStyles.itemSeparator} />;
  };

  renderListEmptyComponent = () => {
    const {isError, isFirstLoading} = this.props;
    if (isFirstLoading) {
      return <LoadingList />;
    } else {
      if (isError) {
        return (
          <MyView style={homeStyles.containerError}>
            <MyText style={homeStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={homeStyles.btnAgain}
            />
          </MyView>
        );
      } else {
        return <MyText style={homeStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
      }
    }
  };

  renderListFooterComponent = () => {
    const {isLoadmore} = this.props;
    if (isLoadmore) {
      return <LoadingList />;
    } else {
      return null;
    }
  };

  renderHeader = () => {
    return (
      <MyView>
        <SlideBannerComponent ref={this.SlideBannerRef} />
        <DayComponent ref={this.BlogDayRef} />
        <NewComponent ref={this.BlogNewRef} />
      </MyView>
    );
  };

  render() {
    const {data, isRefresh} = this.props;

    return (
      <MyView style={homeStyles.container}>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />
          }
          contentContainerStyle={homeStyles.contentList}
          data={data}
          extraData={data}
          initialNumToRender={12}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
          ListFooterComponent={this.renderListFooterComponent}
        />

        <CartBottom />
        <BaoTriModal ref={this.BaoTriModalRef} />
        <SupportOSModal ref={this.SupportOSModalRef} />
        <UpdateAppModal ref={this.UpdateAppModalRef} />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isRefresh, data, isError, isFirstLoading, isLoadmore, isStop} = state.HomeReducer;
  return {isRefresh, data, isError, isFirstLoading, isLoadmore, isStop};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListProductHome,
      showRefresh,
      showLoadmore,
      initUser,
      chooseAddressUser,
      showSuccess
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
