import React, {PureComponent} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';

import {buttonBottomStyles} from '../style/CartPay.Style';

import MyNavigator from 'utils/MyNavigator';
import {MyView, MyButtonTextBorder, MyText, MyButtonText} from 'bases/components';
import Utilities from 'utils/Utilities';
import {createOrder, IOrderCreateRequest} from 'services';
import {ICartPayModel, IOrderModel} from 'models';
import {initCart} from 'views/app/reduxChooseCart';
import {ICartPayState} from 'views/cartPayFrom/redux';
import MyStaticLocal from 'utils/MyStaticLocal';
import {chooseCartPayMemment} from 'views/cartPayFrom/redux';
import {chooseCartShip, ICartShipState} from 'views/cartPayShip/redux';
import {PAYMENT_METHOD_LIST} from 'common/Constants';

interface defaultProps extends ICartPayState, ICartShipState {
  initCart: typeof initCart;
  chooseCartPayMemment: typeof chooseCartPayMemment;
  chooseCartShip: typeof chooseCartShip;
}

class ButtonBottomComponent extends PureComponent<defaultProps> {
  note: string = '';

  onPressCOD = () => {
    let dataCartPayForm: ICartPayModel[] = PAYMENT_METHOD_LIST;

    this.props.chooseCartPayMemment(dataCartPayForm.find(x => x.id === 1));
  };

  onPressOtherCOD = () => {
    const {cartPayMemmentChoose} = this.props;

    if (cartPayMemmentChoose?.id === 1) {
      this.props.chooseCartPayMemment(MyStaticLocal.getCartPayForm());
    } else {
      this.onPressPayOther();
    }
  };

  onPressPayOther = () => {
    MyNavigator.navigate('CartPayFrom');
  };

  setNoteOrder = (note: string) => {
    this.note = note;
  };

  onPressPay = () => {
    const {cartPayMemmentChoose, cartShipChoose} = this.props;

    let user = MyStaticLocal.getUser();
    let addressShop = MyStaticLocal.getAddressShop();
    let addressUser = MyStaticLocal.getAddressUser();
    if (!user) {
      Utilities.showToast(MyI18n.trans.you_are_not_logged_in, '', 'danger');
      MyNavigator.navigate('Login');
      return;
    }

    if (!addressShop) {
      Utilities.showToast(MyI18n.trans.noti_choose_shop, '', 'danger');
      return;
    }
    if (!addressUser) {
      Utilities.showToast(MyI18n.trans.noti_choose_address, '', 'danger');
      return;
    }
    if (!cartShipChoose) {
      Utilities.showToast(MyI18n.trans.noti_choose_transportation, '', 'danger');
      return;
    }

    let param: IOrderCreateRequest = {
      status: 'pending',
      type: 'order',
      source: Utilities.isAndroid() ? 'app_android_end_user' : 'app_ios_end_user',
      store: addressShop,
      customer: addressUser,
      products: MyStaticLocal.getListProductCart(),
      channel: {
        id: 1,
        name: 'Bán online'
      },
      payment: cartPayMemmentChoose,
      shipping: cartShipChoose,
      discounts: MyStaticLocal.getListVoucher(),
      note: this.note
    };
    Utilities.showHideRootLoading(true, MyI18n.trans.loading);
    createOrder<IOrderModel>(param)
      .then(res => {
        Utilities.showHideRootLoading(false);
        if (res?.code) {
          Utilities.logCrashlytics('CartPay - createOrder: ', res);
          Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
        } else {
          this.props.chooseCartShip(undefined);
          this.props.initCart([]);
          MyNavigator.replace('CartPaySuccess', {orderDetail: res?.data});
        }
      })
      .catch(error => {
        Utilities.logCrashlytics('CartPay - createOrder: ', error);
        Utilities.showHideRootLoading(false);
        Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      });
  };

  render() {
    const {cartPayMemmentChoose} = this.props;

    let isCOD: boolean = false;

    if (cartPayMemmentChoose?.id === 1) {
      isCOD = true;
    } else {
      isCOD = false;
    }

    Utilities.log(this.props);
    Utilities.log(MyStaticLocal.getCartPayForm());

    return (
      <SafeAreaView edges={['bottom']} style={buttonBottomStyles.safeView}>
        <MyView style={buttonBottomStyles.bottomButton} transparent>
          <MyView style={buttonBottomStyles.viewButton} transparent>
            <MyButtonTextBorder
              title={MyStaticLocal.getCartPayForm()?.name || ''}
              style={isCOD ? buttonBottomStyles.buttonDisable : buttonBottomStyles.button}
              titleStyle={
                isCOD ? buttonBottomStyles.titleStyleDisable : buttonBottomStyles.titleStyle
              }
              onPress={this.onPressOtherCOD}
            />
            <MyButtonTextBorder
              onPress={this.onPressCOD}
              title="Tiền mặt"
              style={!isCOD ? buttonBottomStyles.buttonDisable : buttonBottomStyles.button}
              titleStyle={
                !isCOD ? buttonBottomStyles.titleStyleDisable : buttonBottomStyles.titleStyle
              }
            />
          </MyView>
          <MyText onPress={this.onPressPayOther} style={buttonBottomStyles.textButton}>
            {MyI18n.trans.other_forms_of_payment}
          </MyText>
          <MyButtonText
            onPress={this.onPressPay}
            style={buttonBottomStyles.bottomButtonOrder}
            title={MyI18n.trans.order}
            titleProps={{fontStyle: 'SemiBold'}}
          />
        </MyView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {cartPayMemmentChoose} = state.CartPayFromReducer;
  const {cartShipChoose} = state.CartPayShipReducer;
  return {cartPayMemmentChoose, cartShipChoose};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      initCart,
      chooseCartPayMemment,
      chooseCartShip
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  ButtonBottomComponent
);
