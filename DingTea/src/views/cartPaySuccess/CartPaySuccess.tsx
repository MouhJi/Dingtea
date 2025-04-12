import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';

import MyNavigator from 'utils/MyNavigator';

import {cartSuccessStyles} from './style/CartPaySuccess.Style';
import {cartPayStyles} from 'views/cartPay/style/CartPay.Style';

import ItemCart from 'views/app/components/ItemCart';
import {
  MyView,
  MyViewShadow,
  MyText,
  MyIcon,
  MyTextPriceMask,
  MyButtonText,
  MyButtonTextBorder
} from 'bases/components';
import {IOrderModel, IVoucherModel} from 'models';
import MyTheme from 'utils/MyTheme';

interface IProps {
  route: any;
}

class CartPaySuccess extends PureComponent<IProps> {
  orderSucess: IOrderModel;

  constructor(props: IProps) {
    super(props);
    this.orderSucess = this.props.route.params.orderDetail;
  }

  renderListItem = () => {
    let _viewItem: any = [];
    this.orderSucess?.products?.map((value, index: any) => {
      _viewItem.push(<ItemCart key={index} item={value} style={cartPayStyles.item} />);
    });
    return _viewItem;
  };

  renderDiscounts = () => {
    const priceBeforeDiscount = this.orderSucess?.total_price_before_discount || 0;
    let soTienBanDau = priceBeforeDiscount;
    return (
      <>
        {this.orderSucess?.discounts?.map((itemDiscount: IVoucherModel, index: any) => {
          let soTienDuocGiam = 0;
          let giaTriGiam1 = itemDiscount.discount_value || 0;
          if (itemDiscount.discount_type === 1) {
            soTienDuocGiam = (soTienBanDau * giaTriGiam1) / 100;
            if (
              itemDiscount.max_discount_value &&
              soTienDuocGiam > itemDiscount.max_discount_value
            ) {
              soTienDuocGiam = itemDiscount.max_discount_value;
            }
          }
          let giaTriGiam2 = itemDiscount.discount_value || 0;
          if (itemDiscount.discount_type === 2) {
            soTienDuocGiam = soTienDuocGiam + giaTriGiam2;
          }

          // Số tiền giảm giá cộng dồn vào số tiền ban đầu
          if (soTienBanDau > soTienDuocGiam) {
            soTienBanDau = soTienBanDau - soTienDuocGiam;
          } else {
            soTienBanDau = 0;
          }

          return (
            <MyView key={index} style={cartSuccessStyles.chonGiamGia} transparent>
              <MyText fontStyle="Regular" style={cartSuccessStyles.titleVoucher}>
                {itemDiscount.code}
              </MyText>
              <MyView style={cartPayStyles.viewTextGiamGia} transparent>
                <MyText fontStyle="Bold">{'-'}</MyText>
                <MyTextPriceMask fontStyle="Bold" text={soTienDuocGiam} />
              </MyView>
            </MyView>
          );
        })}
      </>
    );
  };

  goHome = () => {
    MyNavigator.navigate('HomeRouter', {screen:'HomeTab'});
  };

  goPayment = () => {
    MyNavigator.navigate('Payment', {orderDetail: this.orderSucess});
  };

  render() {
    let _viewDiscount = null;
    if (this.orderSucess && this.orderSucess.discounts && this.orderSucess.discounts.length > 0) {
      _viewDiscount = (
        <>
          <MyText fontStyle="Bold" style={cartPayStyles.titleGiamGia}>
            {MyI18n.trans.discount_code}
          </MyText>

          {this.renderDiscounts()}

          <MyView style={cartPayStyles.itemSeparator} />
        </>
      );
    }

    let _viewShip = null;
    if (this.orderSucess && this.orderSucess.shipping) {
      _viewShip = (
        <>
          <MyText fontStyle="Bold" style={cartPayStyles.titleGiamGia}>
            {MyI18n.trans.form_of_transportation}
          </MyText>

          <MyView style={cartSuccessStyles.chonGiamGia} transparent>
            <MyText fontStyle="Regular" style={cartSuccessStyles.titleVoucher}>
              {this.orderSucess.shipping.name}
            </MyText>
            <MyView style={cartPayStyles.viewTextGiamGia} transparent>
              <MyText fontStyle="Bold">{this.orderSucess.total_shipping_fee ? '+' : ''}</MyText>
              <MyTextPriceMask fontStyle="Bold" text={this.orderSucess.total_shipping_fee || 0} />
            </MyView>
          </MyView>

          <MyView style={cartPayStyles.itemSeparator} />
        </>
      );
    }

    let _viewNoteOrder = null;
    if (this.orderSucess && this.orderSucess.shipping) {
      _viewNoteOrder = (
        <>
          <MyText fontStyle="Bold" style={cartPayStyles.titleGiamGia}>
            {MyI18n.trans.note}
          </MyText>

          <MyView style={cartSuccessStyles.chonGiamGia} transparent>
            <MyText fontStyle="Regular" style={cartSuccessStyles.titleVoucher}>
              {this.orderSucess.note}
            </MyText>
          </MyView>

          <MyView style={cartPayStyles.itemSeparator} />
        </>
      );
    }

    return (
      <MyView style={cartSuccessStyles.container}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <MyViewShadow style={cartPayStyles.contentList}>
            <MyText fontStyle="Bold" style={cartSuccessStyles.codeOrders}>
              {MyI18n.trans.code_orders}
              {': '}
              {this.orderSucess.code}
            </MyText>
            <MyView style={cartPayStyles.itemSeparator} />
            <MyView style={cartPayStyles.viewEditText} transparent>
              <MyIcon
                style={cartPayStyles.icon}
                iconFontType="Ionicons"
                name="person-outline"
                size={14}
                color={MyTheme.themes.TEXT.SECONDARY_LIGHT}
              />
              <MyText fontStyle="Regular" style={cartPayStyles.textTitlePrime} numberOfLines={1}>
                {this.orderSucess.customer?.name}
                {' - '}
              </MyText>
              <MyText fontStyle="Bold" style={cartPayStyles.textTitlePrime}>
                {this.orderSucess.customer?.phone}
              </MyText>
            </MyView>
            <MyView style={cartPayStyles.viewEditText} transparent>
              <MyIcon
                style={cartPayStyles.icon}
                iconFontType="Entypo"
                name="shop"
                size={14}
                color={MyTheme.themes.TEXT.SECONDARY_LIGHT}
              />
              <MyText fontStyle="Regular" style={cartPayStyles.textTitle} numberOfLines={1}>
                {this.orderSucess.store?.name}
              </MyText>
            </MyView>
            <MyView style={cartPayStyles.viewEditText} transparent>
              <MyIcon
                style={cartPayStyles.icon}
                iconFontType="Ionicons"
                name="location-outline"
                size={14}
                color={MyTheme.themes.TEXT.SECONDARY_LIGHT}
              />
              <MyText fontStyle="Regular" style={cartPayStyles.textTitle} numberOfLines={1}>
                {this.orderSucess.customer?.address}
              </MyText>
            </MyView>
            {/* <MyView style={cartPayStyles.viewEditText} transparent>
              <MyIcon
                style={cartPayStyles.icon}
                iconFontType="Ionicons"
                name="time-outline"
                size={14}
                color={MyTheme.themes.TEXT.SECONDARY_LIGHT}
              />
              <MyText fontStyle="Regular" style={cartPayStyles.textTitlePrime} numberOfLines={1}>
                {MyI18n.trans.delivery_time}
                {': '}
              </MyText>
              <MyText fontStyle="Bold" style={cartPayStyles.textTitlePrime}>
                {'~20-30'} {MyI18n.trans.minutes}
              </MyText>
            </MyView> */}

            <MyView style={cartPayStyles.detailOrder}>
              <MyText fontStyle="Bold">{MyI18n.trans.order_details}</MyText>
            </MyView>
            {this.renderListItem()}
            {_viewDiscount}
            {_viewShip}
            {_viewNoteOrder}
            <MyView style={cartPayStyles.tongGia} transparent>
              <MyText fontStyle="Bold">{MyI18n.trans.total}</MyText>
              <MyTextPriceMask fontStyle="Bold" text={this.orderSucess.total_price || 0} />
            </MyView>
            {/* <MyText style={cartPayStyles.chuThichVoucher} fontStyle="Regular">
              {'(Với 1% hóa đơn tổng bạn tích được 01 điểm)'}
            </MyText> */}

            {/* {this.orderSucess.note ? (
              <>
                <MyView style={cartPayStyles.itemSeparator} />
                <MyView style={ghiChuStyles.container} transparent>
                  <MyText fontStyle="Bold">{MyI18n.trans.note}</MyText>
                  <MyInput
                    defaultValue={this.orderSucess.note}
                    placeholder={MyI18n.trans.notes_for_the_store}
                    containerStyle={ghiChuStyles.viewinput}
                    style={ghiChuStyles.input}
                    returnKeyType="done"
                    keyboardType="default"
                    multiline
                    numberOfLines={5}
                    editable={false}
                  />
                </MyView>
              </>
            ) : null} */}
          </MyViewShadow>
        </ScrollView>
        <SafeAreaView edges={['bottom']} style={cartSuccessStyles.safeView}>
          {this.orderSucess.payment?.name === 'Chuyển khoản' ? (
            <MyView style={cartSuccessStyles.viewPay} transparent>
              <MyButtonTextBorder
                title={MyI18n.trans.go_home}
                style={cartSuccessStyles.buttonGoHome}
                titleStyle={cartSuccessStyles.titleGoHome}
                titleProps={{fontStyle: 'SemiBold'}}
                onPress={this.goHome}
              />
              <MyButtonText
                title={MyI18n.trans.payment}
                style={cartSuccessStyles.buttonViewPay}
                titleProps={{fontStyle: 'SemiBold'}}
                onPress={this.goPayment}
              />
            </MyView>
          ) : (
            <MyButtonText
              title={MyI18n.trans.go_home}
              style={cartSuccessStyles.bottomButton}
              titleProps={{fontStyle: 'SemiBold'}}
              onPress={this.goHome}
            />
          )}
        </SafeAreaView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso} = state.SettingReducer;
  return {iso};
};

export default connect(mapStateToProps, null)(CartPaySuccess);
