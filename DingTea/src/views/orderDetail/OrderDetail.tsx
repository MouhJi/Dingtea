import React, {createRef, PureComponent} from 'react';
import {ScrollView} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';

import {COLOR} from 'bases/styles/Core';
import {ItemCart} from 'views/app/components';
import {
  MyViewShadow,
  MyText,
  MyView,
  MyTextPriceMask,
  MyIcon,
  LoadingList,
  MyButtonText,
  MyDialogInput,
  MyInput
} from 'bases/components';
import {getOrderDetail, IOrderDetailState, reset, showFirstLoading, showRefresh} from './redux';
import {bindActionCreators} from 'redux';
import {RefreshControl} from 'react-native';
import {ICartModel, IOrderModel, IVoucherModel} from 'models';
import ModalCmtProduct from './components/ModalCmtProduct';
import {cartOrderDetailStyles, ghiChuStyles, orderDetailStyles} from './style/OrderDetail.Style';
import {cancelOrder} from 'services';
import Utilities from 'utils/Utilities';
import MyStaticLocal from 'utils/MyStaticLocal';
import MyNavigator from 'utils/MyNavigator';
import {initCart} from 'views/app/reduxChooseCart';
import {getListOrdersWaitting, showRefreshWaitting} from 'views/order/components/tabWaitting/redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyTheme from 'utils/MyTheme';

interface defaultProps extends IOrderDetailState {
  getOrderDetail: typeof getOrderDetail;
  showFirstLoading: typeof showFirstLoading;
  reset: typeof reset;
  showRefresh: typeof showRefresh;

  initCart: typeof initCart;
  getListOrdersWaitting: typeof getListOrdersWaitting;
  showRefreshWaitting: typeof showRefreshWaitting;

  route?: {
    params?: {
      orderDetail?: IOrderModel;
      isCheckButton?: 'isDatLai' | 'isRating' | 'isCancel';
    };
  };
  navigation?: any;
}

class OrderDetail extends PureComponent<defaultProps> {
  order: IOrderModel | any = this.props.route?.params?.orderDetail;
  showModalCmtProductRef: any = createRef();
  dialogCancelRef: any = createRef();
  dialogDatLaiRef: any = createRef();

  componentDidMount() {
    if (this.props.route?.params?.orderDetail?.code) {
      this.props.navigation.setOptions({
        title: MyI18n.trans.code_orders + ': ' + this.props.route?.params?.orderDetail?.code
      });
    }
    this.props.getOrderDetail(this.order.id);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  onPressWriteCmt = (item: ICartModel) => {
    this.showModalCmtProductRef.current.setProduct(item);
    this.showModalCmtProductRef.current.onShow();
  };

  renderListItem = () => {
    let _viewItem: any = [];
    const {orderDetail} = this.props;
    const isCheckButton = this.props.route?.params?.isCheckButton;
    orderDetail?.products?.map((value: ICartModel, index: any) => {
      switch (isCheckButton) {
        case 'isDatLai':
          _viewItem.push(
            <ItemCart
              key={index}
              item={value}
              style={cartOrderDetailStyles.item}
              isShowCmt
              onPressWriteCmt={this.onPressWriteCmt}
            />
          );
          break;
        case 'isCancel':
          _viewItem.push(
            <ItemCart
              key={index}
              item={value}
              style={cartOrderDetailStyles.item}
              onPressWriteCmt={this.onPressWriteCmt}
            />
          );
          break;
        default:
          _viewItem.push(
            <ItemCart
              key={index}
              item={value}
              style={cartOrderDetailStyles.item}
              onPressWriteCmt={this.onPressWriteCmt}
            />
          );
          break;
      }
    });
    return _viewItem;
  };

  renderDiscounts = () => {
    const {orderDetail} = this.props;
    const priceBeforeDiscount = orderDetail?.total_price_before_discount || 0;
    let soTienBanDau = priceBeforeDiscount;
    return (
      <>
        {orderDetail?.discounts?.map((itemDiscount: IVoucherModel, index: any) => {
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
            <MyView key={index} style={orderDetailStyles.chonGiamGia} transparent>
              <MyText fontStyle="Regular" style={orderDetailStyles.titleVoucher}>
                {itemDiscount.code}
              </MyText>
              <MyView style={cartOrderDetailStyles.viewTextGiamGia} transparent>
                <MyText fontStyle="Bold">{'-'}</MyText>
                <MyTextPriceMask fontStyle="Bold" text={soTienDuocGiam} />
              </MyView>
            </MyView>
          );
        })}
      </>
    );
  };

  reload = () => {
    this.props.showFirstLoading(true);
    this.props.getOrderDetail(this.order.id);
  };

  refresh = () => {
    this.props.showRefresh(true);
    this.props.getOrderDetail(this.order.id);
  };
  cancleDialogCancle = () => {
    this.dialogCancelRef.current.onHide();
  };

  cancleDialogDatLai = () => {
    this.dialogDatLaiRef.current.onHide();
  };
  onShowDialogDatLai = () => {
    this.dialogDatLaiRef.current.onShow();
  };
  checkSanPhamTrongDonHangCu = (): boolean => {
    const {orderDetail} = this.props;
    if (orderDetail && orderDetail.products && orderDetail.products.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  datLaiDon = () => {
    this.cancleDialogDatLai();
    const {orderDetail} = this.props;
    if (this.checkSanPhamTrongDonHangCu()) {
      let arrProductCart: ICartModel[] = [];
      if (orderDetail) {
        for (let i = 0; i < orderDetail?.products.length; i++) {
          const product = orderDetail.products[i];

          let arrProOption: ICartModel[] = [];
          if (product.product_options && product.product_options.length > 0) {
            for (let j = 0; j < product.product_options.length; j++) {
              const proOption = product.product_options[j];
              let nameOp = proOption.name || '';
              nameOp = nameOp.replace(' ' + proOption.option_name, '');
              const skuTmp = proOption?.sku?.split('_', 1)[0];

              let paramProOption: ICartModel = {
                id: proOption.id,
                name: nameOp,
                option_id: proOption.option_id,
                option_name: proOption.option_name,
                total_quantity: proOption.total_quantity,
                price: proOption.price,
                type: proOption.type,
                sku: skuTmp
              };
              arrProOption.push(paramProOption);
            }
          }

          let name = product.name || '';
          name = name.replace(' ' + product.option_name, '');

          let tongGia = product.total_price || 0;
          let tongGiaThanhPhan = product.total_option_price || 0;
          let tongSoLuong = product.total_quantity || 1;

          let paramProduct: ICartModel = {
            id: product.id,
            random_id: Utilities.randomNumber(true),
            option_id: product.option_id,
            option_name: product.name,
            total_quantity: product.total_quantity,
            product_options: arrProOption,
            name: name,
            price: (tongGia - tongGiaThanhPhan) / tongSoLuong,
            categories: product.categories,
            option_type: product.option_name,
            thumbnail_url: product.thumbnail_url,
            note: product.note
          };

          arrProductCart.push(paramProduct);
        }
      }

      this.props.initCart(arrProductCart);
      MyNavigator.navigate('Cart');
    } else {
      Utilities.showToast(MyI18n.trans.orders_cannot_be_re_ordered, '', 'info');
    }
  };

  onPressDatLai = () => {
    let cart = MyStaticLocal.getListProductCart();
    if (cart && cart.length > 0) {
      this.onShowDialogDatLai();
    } else {
      this.datLaiDon();
    }
  };

  deleteItem = () => {
    const {orderDetail} = this.props;

    Utilities.showHideRootLoading(true, MyI18n.trans.please_wait);

    if (orderDetail) {
      cancelOrder(orderDetail.id)
        .then(res => {
          Utilities.showHideRootLoading(false);
          this.cancleDialogCancle();
          if (res?.code) {
            Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
          } else {
            Utilities.showToast(MyI18n.trans.cancel_order_success, '', 'success');
            MyNavigator.goBack();
            this.props.showRefreshWaitting(true);
            this.props.getListOrdersWaitting({
              skip: 0,
              limit: 10,
              statuses: 'pending',
              order_by: 'desc',
              sort_by: 'created_at'
            });
          }
        })
        .catch(() => {
          this.cancleDialogCancle();
          Utilities.showHideRootLoading(false);
          Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
        });
    }
  };
  onPressCancel = () => {
    this.dialogCancelRef.current.onShow();
  };
  render() {
    const {orderDetail, isFirstLoading, isRefresh} = this.props;
    const isCheckButton = this.props.route?.params?.isCheckButton;
    let addressCus: string = orderDetail?.customer?.address || '';
    if (
      !addressCus &&
      orderDetail?.customer?.district?.name &&
      orderDetail?.customer?.province?.name
    ) {
      addressCus =
        orderDetail?.customer?.district?.name + ', ' + orderDetail?.customer?.province?.name;
    }

    let _viewDiscount = null;
    if (orderDetail && orderDetail.discounts && orderDetail.discounts.length > 0) {
      _viewDiscount = (
        <>
          <MyText fontStyle="Bold" style={cartOrderDetailStyles.titleGiamGia}>
            {MyI18n.trans.discount_code}
          </MyText>

          {/* {this.renderDiscounts()} */}

          <MyView style={cartOrderDetailStyles.itemSeparator} />
        </>
      );
    }

    let _viewShip = null;
    if (orderDetail && orderDetail.shipping) {
      _viewShip = (
        <>
          <MyText fontStyle="Bold" style={cartOrderDetailStyles.titleGiamGia}>
            {MyI18n.trans.form_of_transportation}
          </MyText>

          <MyView style={orderDetailStyles.chonGiamGia} transparent>
            <MyText fontStyle="Regular" style={orderDetailStyles.titleVoucher}>
              {orderDetail.shipping.name}
            </MyText>
            <MyView style={cartOrderDetailStyles.viewTextGiamGia} transparent>
              <MyText fontStyle="Bold">{orderDetail.total_shipping_fee ? '+' : ''}</MyText>
              <MyTextPriceMask fontStyle="Bold" text={orderDetail.total_shipping_fee || 0} />
            </MyView>
          </MyView>

          <MyView style={cartOrderDetailStyles.itemSeparator} />
        </>
      );
    }

    let _viewNoteOrder = null;
    if (orderDetail) {
      _viewNoteOrder = (
        <>
          <MyText fontStyle="Bold" style={cartOrderDetailStyles.titleGiamGia}>
            {MyI18n.trans.note}
          </MyText>

          <MyView style={orderDetailStyles.chonGiamGia} transparent>
            <MyText fontStyle="Regular" style={orderDetailStyles.titleVoucher}>
              {orderDetail.note}
            </MyText>
          </MyView>

          <MyView style={cartOrderDetailStyles.itemSeparator} />
        </>
      );
    }

    let _viewButton = null;
    switch (isCheckButton) {
      case 'isDatLai':
        _viewButton = (
          <SafeAreaView edges={['bottom']} style={orderDetailStyles.safeView}>
            <MyButtonText
              onPress={this.onPressDatLai}
              style={orderDetailStyles.btnMuaLai}
              titleProps={{fontStyle: 'SemiBold'}}
              title={MyI18n.trans.re_order}
            />
          </SafeAreaView>
        );
        break;
      case 'isCancel':
        _viewButton = (
          <SafeAreaView edges={['bottom']} style={orderDetailStyles.safeView}>
            <MyButtonText
              onPress={this.onPressCancel}
              style={orderDetailStyles.btnMuaLai}
              titleProps={{fontStyle: 'SemiBold'}}
              title={MyI18n.trans.cancel}
            />
          </SafeAreaView>
        );
        break;
      //   case 'isRating':
      //     _viewButton = (
      //       <SafeAreaView edges={['bottom']} style={orderDetailStyles.safeView}>
      //         <MyButtonText
      //           onPress={this.onPressRating}
      //           style={orderDetailStyles.btnMuaLai}
      //           titleProps={{fontStyle: 'SemiBold'}}
      //           title={MyI18n.trans.evaluate}
      //         />
      //       </SafeAreaView>
      //     );
      //     break;
      default:
        break;
    }

    if (isFirstLoading) {
      return <LoadingList />;
    } else {
      if (orderDetail) {
        return (
          <MyView style={orderDetailStyles.container}>
            <ScrollView
              refreshControl={
                <RefreshControl onRefresh={this.refresh} refreshing={isRefresh || false} />
              }
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <MyViewShadow style={cartOrderDetailStyles.contentList}>
                <MyView style={cartOrderDetailStyles.viewEditText} transparent>
                  <MyIcon
                    style={cartOrderDetailStyles.icon}
                    iconFontType="Ionicons"
                    name="person-outline"
                    size={14}
                    color={MyTheme.themes.TEXT.SECONDARY_LIGHT}
                  />
                  <MyText
                    fontStyle="Regular"
                    style={cartOrderDetailStyles.textTitlePrime}
                    numberOfLines={1}>
                    {orderDetail?.customer?.name}
                    {' - '}
                  </MyText>
                  <MyText fontStyle="Bold" style={cartOrderDetailStyles.textTitlePrime}>
                    {orderDetail?.customer?.phone}
                  </MyText>
                </MyView>
                <MyView style={cartOrderDetailStyles.viewEditText} transparent>
                  <MyIcon
                    style={cartOrderDetailStyles.icon}
                    iconFontType="Entypo"
                    name="shop"
                    size={14}
                    color={MyTheme.themes.TEXT.SECONDARY_LIGHT}
                  />
                  <MyText
                    fontStyle="Regular"
                    style={cartOrderDetailStyles.textTitle}
                    numberOfLines={1}>
                    {orderDetail?.store?.name || ''}
                    {', '}
                    {orderDetail?.store?.address || ''}
                  </MyText>
                </MyView>
                <MyView style={cartOrderDetailStyles.viewEditText} transparent>
                  <MyIcon
                    style={cartOrderDetailStyles.icon}
                    iconFontType="Ionicons"
                    name="location-outline"
                    size={14}
                    color={MyTheme.themes.TEXT.SECONDARY_LIGHT}
                  />
                  <MyText
                    fontStyle="Regular"
                    style={cartOrderDetailStyles.textTitle}
                    numberOfLines={1}>
                    {addressCus}
                  </MyText>
                </MyView>
                {/* <MyView style={cartOrderDetailStyles.viewEditText} transparent>
                  <MyIcon
                    style={cartOrderDetailStyles.icon}
                    iconFontType="Ionicons"
                    name="time-outline"
                    size={14}
                    color={MyTheme.themes.TEXT.SECONDARY_LIGHT}
                  />
                  <MyText
                    fontStyle="Regular"
                    style={cartOrderDetailStyles.textTitlePrime}
                    numberOfLines={1}>
                    {MyI18n.trans.delivery_time}
                    {': '}
                  </MyText>
                  <MyText fontStyle="Bold" style={cartOrderDetailStyles.textTitlePrime}>
                    {'~20-30'} {MyI18n.trans.minutes}
                  </MyText>
                </MyView> */}

                <MyView style={cartOrderDetailStyles.detailOrder}>
                  <MyText fontStyle="Bold">{MyI18n.trans.order_details}</MyText>
                </MyView>
                {this.renderListItem()}
                {_viewDiscount}
                {_viewShip}
                {_viewNoteOrder}
                <MyView style={cartOrderDetailStyles.tongGia} transparent>
                  <MyText fontStyle="Bold">{MyI18n.trans.total}</MyText>
                  <MyTextPriceMask fontStyle="Bold" text={orderDetail?.total_price || 0} />
                </MyView>
                {/* <MyText style={cartOrderDetailStyles.chuThichVoucher} fontStyle="Regular">
                {'(Với 1% hóa đơn tổng bạn tích được 01 điểm)'}
              </MyText> */}

                {/* {orderDetail.note ? (
                  <>
                    <MyView style={cartOrderDetailStyles.itemSeparator} />
                    <MyView style={ghiChuStyles.container} transparent>
                      <MyText fontStyle="Bold">{MyI18n.trans.note}</MyText>
                      <MyInput
                        defaultValue={orderDetail.note}
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
            {_viewButton}
            <ModalCmtProduct ref={this.showModalCmtProductRef} />
            <MyDialogInput
              ref={this.dialogCancelRef}
              onRequestClose={this.cancleDialogCancle}
              title={MyI18n.trans.cancel_order}
              titleStyle={{color: COLOR.TEXT.BLACK}}
              description={MyI18n.trans.question_cancel_order}
              descriptionStyle={{color: COLOR.TEXT.BLACK}}
              contentStyle={{backgroundColor: COLOR.BG.WHITE}}
              actionButtons={[
                {
                  label: MyI18n.trans.cancel_order,
                  color: COLOR.TEXT.POSITIVE_BTN,
                  onPress: this.deleteItem
                },
                {
                  label: MyI18n.trans.exit,
                  color: COLOR.TEXT.NEGATIVE_BTN,
                  onPress: this.cancleDialogCancle
                }
              ]}
            />
            <MyDialogInput
              ref={this.dialogDatLaiRef}
              onRequestClose={this.cancleDialogDatLai}
              title={MyI18n.trans.re_order}
              titleStyle={{color: COLOR.TEXT.BLACK}}
              description={MyI18n.trans.replace_cart}
              descriptionStyle={{color: COLOR.TEXT.BLACK}}
              contentStyle={{backgroundColor: COLOR.BG.WHITE}}
              actionButtons={[
                {
                  label: MyI18n.trans.re_order,
                  color: COLOR.TEXT.POSITIVE_BTN,
                  onPress: this.datLaiDon
                },
                {
                  label: MyI18n.trans.exit,
                  color: COLOR.TEXT.NEGATIVE_BTN,
                  onPress: this.cancleDialogDatLai
                }
              ]}
            />
          </MyView>
        );
      } else {
        return (
          <MyView style={orderDetailStyles.containerError}>
            <MyText style={orderDetailStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={orderDetailStyles.btnAgain}
            />
          </MyView>
        );
      }
    }
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  const {isFirstLoading, isRefresh, orderDetail} = state.OrderDetailReducer;
  return {iso, theme, isFirstLoading, isRefresh, orderDetail};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getOrderDetail,
      showFirstLoading,
      reset,
      showRefresh,

      initCart,
      getListOrdersWaitting,
      showRefreshWaitting
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
