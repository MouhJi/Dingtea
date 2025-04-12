import React, {Component, createRef} from 'react';
import {StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';

import {
  COLOR,
  FONT_SIZE,
  LAYOUT,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius
} from 'bases/styles/Core';

import Utilities from 'utils/Utilities';
import MyNavigator from 'utils/MyNavigator';
import {MyButtonShadow, MyText, MyTextPriceMask, MyDialogInput, MyView} from 'bases/components';
import {ICartModel, IOrderModel} from 'models';
import {initCart} from 'views/app/reduxChooseCart';
import {cancelOrder} from 'services';
import {getListOrdersWaitting, showRefreshWaitting} from 'views/order/components/tabWaitting/redux';
import MyStaticLocal from 'utils/MyStaticLocal';
import MyTheme from 'utils/MyTheme';

interface IProps {
  isDatLai?: boolean;
  isRating?: boolean;
  isCancel?: boolean;
  isCheckButton?: 'isDatLai' | 'isRating' | 'isCancel';
  items: IOrderModel;

  initCart: typeof initCart;
  getListOrdersWaitting: typeof getListOrdersWaitting;
  showRefreshWaitting: typeof showRefreshWaitting;
}

class ItemOrder extends Component<IProps, {}> {
  dialogCancelRef: any = createRef();
  cancleDialogCancle = () => {
    this.dialogCancelRef.current.onHide();
  };
  onDeleteVoucher = () => {
    this.dialogCancelRef.current.onShow();
  };

  dialogDatLaiRef: any = createRef();
  cancleDialogDatLai = () => {
    this.dialogDatLaiRef.current.onHide();
  };
  onShowDialogDatLai = () => {
    this.dialogDatLaiRef.current.onShow();
  };

  onPressItem = () => {
    MyNavigator.navigate('OrderDetail', {
      orderDetail: this.props.items,
      isCheckButton: this.props.isCheckButton
    });
  };

  onPressRating = () => {
    MyNavigator.navigate('CmtShop');
  };

  checkSanPhamTrongDonHangCu = (): boolean => {
    const {items} = this.props;
    if (items.products && items.products.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  datLaiDon = () => {
    this.cancleDialogDatLai();
    const {items} = this.props;
    if (this.checkSanPhamTrongDonHangCu()) {
      let arrProductCart: ICartModel[] = [];

      for (let i = 0; i < items.products.length; i++) {
        const product = items.products[i];

        let arrProOption: ICartModel[] = [];
        if (product.product_options && product.product_options.length > 0) {
          for (let j = 0; j < product.product_options.length; j++) {
            const proOption = product.product_options[j];
            let nameOp = proOption.name || '';
            nameOp = nameOp.replace(' ' + proOption.option_name, '');
            let paramProOption: ICartModel = {
              id: proOption.id,
              option_id: proOption.option_id,
              total_quantity: proOption.total_quantity,
              name: nameOp,
              price: proOption.price,
              type: proOption.type
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
          option_type: product.option_name
        };

        arrProductCart.push(paramProduct);
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
    const {items} = this.props;

    Utilities.showHideRootLoading(true, MyI18n.trans.please_wait);

    cancelOrder(items.id)
      .then(res => {
        Utilities.showHideRootLoading(false);
        if (res?.code) {
          Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
        } else {
          Utilities.showToast(MyI18n.trans.cancel_order_success, '', 'success');
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
        Utilities.showHideRootLoading(false);
        Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      });
  };
  onPressCancel = () => {
    this.dialogCancelRef.current.onShow();
  };

  render() {
    const {
      // isDatLai,
      // isRating,
      // isCancel,
      items
    } = this.props;

    let created_at = items?.created_at || 0;
    const time = Utilities.convertTimeByFormat(created_at, 'DD/MM/YYYY');

    // let _layoutBtn = (
    //   <MyView transparent style={styles.contentBtn}>
    //     {isRating && (
    //       <MyButtonText
    //         onPress={this.onPressRating}
    //         style={styles.btnMuaLai}
    //         titleProps={{fontStyle: 'SemiBold', style: styles.btnTitle}}
    //         title={MyI18n.trans.evaluate}
    //       />
    //     )}
    //     {isDatLai && (
    //       <MyButtonText
    //         onPress={this.onPressDatLai}
    //         style={[styles.btnMuaLai, styles.centerLayoutBtn]}
    //         titleProps={{fontStyle: 'SemiBold', style: styles.btnTitle}}
    //         title={MyI18n.trans.re_order}
    //       />
    //     )}
    //     {isCancel && (
    //       <MyButtonText
    //         onPress={this.onPressCancel}
    //         style={styles.btnMuaLai}
    //         titleProps={{fontStyle: 'SemiBold', style: styles.btnTitle}}
    //         title={MyI18n.trans.cancel}
    //       />
    //     )}
    //   </MyView>
    // );
    return (
      <MyButtonShadow style={styles.container} onPress={this.onPressItem}>
        <MyView transparent style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <MyText fontStyle="SemiBold" style={styles.txtTime}>
            {items.code}
          </MyText>
          <MyText fontStyle="SemiBold" style={styles.txtTime}>
            {time}
          </MyText>
        </MyView>

        <MyText fontStyle="Regular" style={styles.buyAtText}>
          <MyText fontStyle="SemiBold">
            {MyI18n.trans.buy_at}
            {': '}
          </MyText>
          {items?.store?.name}
          {', '}
          {items?.store?.address}
        </MyText>
        <MyText fontStyle="Regular">
          <MyText fontStyle="SemiBold">
            {MyI18n.trans.total_price}
            {': '}
          </MyText>
          <MyTextPriceMask text={items?.total_price || 0} fontStyle="Regular" />
        </MyText>
        {/* <MyText fontStyle="Regular">
          <MyText fontStyle="SemiBold">
            {MyI18n.trans.paid}
            {': '}
          </MyText>
          <MyTextPriceMask text={items?.total_paid || 0} fontStyle="Regular" />
        </MyText> */}
        {/* {_layoutBtn} */}
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
      </MyButtonShadow>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      initCart,
      getListOrdersWaitting,
      showRefreshWaitting
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(ItemOrder);

const styles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  buyAtText: {...setMargin(MARGIN.m_6, MARGIN.m_6, MARGIN.m_0, MARGIN.m_0)},
  btnMuaLai: {
    alignSelf: 'flex-end',
    height: LAYOUT.l_29,
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_24, PADDING.p_24)
  },
  btnTitle: {
    fontSize: FONT_SIZE.s_12
  },
  centerLayoutBtn: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_8, MARGIN.m_8)
  },
  contentBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    ...setPadding(PADDING.p_8, PADDING.p_0, PADDING.p_0, PADDING.p_0)
  },
  txtTime: {
    color: MyTheme.themes.TEXT.PRIMARY_DARK
  }
});
