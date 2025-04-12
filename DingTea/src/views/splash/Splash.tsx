import React, {Component, createRef} from 'react';
import {StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {MyImage, MyView} from 'bases/components';
import {COLOR, PADDING, setPadding} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
import {
  ADDRESS_SHOP_CHOOSE,
  ADDRESS_USER_CHOOSE,
  CART_USER_CHOOSE,
  RESEND_CODE_DEVICE,
  USER_DATA,
  CART_PAY_FORM,
  RESEND_CODE_UPDATE_DEVICE,
  USER_TOKEN
} from 'common/KeyStorages';
import MyStaticLocal from 'utils/MyStaticLocal';
import {initUser} from 'views/accounts/person/redux';
import {chooseAddressShop} from 'views/app/reduxChooseAddressShop';
import {chooseAddressUser} from 'views/app/reduxChooseAddressUser';
import {initCart} from 'views/app/reduxChooseCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Utilities from 'utils/Utilities';
import {ITokenModel, IDataUser, IUserModel} from 'models';
import {PAYMENT_METHOD_LIST} from 'common/Constants';
import {refreshToken} from 'services';
import {chooseCartPayMemment} from 'views/cartPayFrom/redux';
import {ICartPayModel} from 'models';
import MyStorage from 'utils/MyStorage';

interface IProps {
  initUser: typeof initUser;
  chooseAddressShop: typeof chooseAddressShop;
  chooseAddressUser: typeof chooseAddressUser;
  initCart: typeof initCart;
  chooseCartPayMemment: typeof chooseCartPayMemment;
}

interface IState {
  isMandatory: boolean;
  isUpdate: boolean;
  updateInfo: any;
  progress: number;
}

class Splash extends Component<IProps, IState> {
  syncMessage: string = '';

  constructor(props: any) {
    super(props);
    this.syncMessage = '';
    this.state = {
      isMandatory: false,
      isUpdate: false,
      updateInfo: {},
      progress: 0
    };
  }

  async componentDidMount() {
    this.checkDataFirstApp();
  }

  checkDataFirstApp = () => {
    let dataCartPayForm: ICartPayModel[] = PAYMENT_METHOD_LIST;

    AsyncStorage.multiGet([
      ADDRESS_SHOP_CHOOSE,
      ADDRESS_USER_CHOOSE,
      CART_USER_CHOOSE,
      USER_DATA,
      RESEND_CODE_DEVICE,
      CART_PAY_FORM,
      RESEND_CODE_UPDATE_DEVICE,
      USER_TOKEN
    ])
      .then(result => {
        let addressShop = result[0][1] ? JSON.parse(result[0][1]) : null;
        if (addressShop) {
          this.props.chooseAddressShop(addressShop);
        }

        let addressUser = result[1][1] ? JSON.parse(result[1][1]) : null;
        if (addressUser) {
          this.props.chooseAddressUser(addressUser);
        }

        let cart = result[2][1] ? JSON.parse(result[2][1]) : null;
        if (cart) {
          this.props.initCart(cart);
        }

        /* default VNPay */
        let payCartDefault = dataCartPayForm.find(x => x.id === 9);
        let cartPayForm = result[5][1] ? JSON.parse(result[5][1]) : payCartDefault;
        this.props.chooseCartPayMemment(cartPayForm);

        let userLocal: IUserModel = result[3][1] ? JSON.parse(result[3][1]) : null;
        let userToken: ITokenModel = result[7][1] ? JSON.parse(result[7][1]) : null;

        if (userLocal) {
          let userFull: IDataUser = {
            user: userLocal,
            token: userToken
          };
          this.checkRefresh(userFull);
        } else {
          MyNavigator.replace('HomeRouter');
        }
      })
      .catch(() => {
        MyStorage.multiDelete([
          RESEND_CODE_DEVICE,
          RESEND_CODE_UPDATE_DEVICE,
          USER_TOKEN,
          USER_DATA
        ]);
      });
  };

  logoutAll = () => {
    MyStorage.multiDelete([RESEND_CODE_DEVICE, RESEND_CODE_UPDATE_DEVICE, USER_TOKEN, USER_DATA]);
    MyStaticLocal.setUser(undefined);
    MyStaticLocal.setUserToken(undefined);
    Utilities.showToast('Phiên đăng nhập đã hết hạn', '', 'info');
    MyNavigator.replace('HomeRouter');
  };

  checkRefresh = (userLocal: IDataUser) => {
    let token: ITokenModel = userLocal.token;
    const user: IUserModel = userLocal.user;
    if (user) this.initInfoUser(user);
    if (token) {
      const now = Date.now() / 1000;
      const access = token.access_expired_at;
      const refresh = token.refresh_expired_at;
      if (now > access && !__DEV__) {
        /* chet */
        if (now <= refresh) {
          refreshToken<ITokenModel>({token: token.refresh_token})
            .then(res => {
              if (res?.code) {
                this.logoutAll();
              } else {
                if (res?.data) {
                  MyStorage.create(USER_TOKEN, res.data);
                  MyStaticLocal.setUserToken(res?.data);
                  MyNavigator.replace('HomeRouter');
                } else {
                  this.logoutAll();
                }
              }
            })
            .catch(() => {
              this.logoutAll();
            });
        } else {
          this.logoutAll();
        }
      } else {
        /* con song */
        MyStaticLocal.setUserToken(token);
        MyNavigator.replace('HomeRouter');
      }
    } else {
      MyNavigator.replace('HomeRouter');
    }
  };

  initInfoUser = (user: IUserModel) => {
    MyStaticLocal.setUser(user);
    this.props.initUser(user);
  };

  render() {
    return (
      <MyView style={styles.container}>
        <MyImage
          resizeMode="contain"
          style={{marginTop: -64}}
          width={Utilities.getWidthScreen() / 1.25}
          height={Utilities.getWidthScreen() / 1.25}
          source={require('../../assets/images/logo_dingtea.png')}
        />
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    ...setPadding(PADDING.p_0, PADDING.p_10, PADDING.p_10, PADDING.p_10)
  }
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      initUser,
      chooseAddressShop,
      chooseAddressUser,
      initCart,
      chooseCartPayMemment
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Splash);
