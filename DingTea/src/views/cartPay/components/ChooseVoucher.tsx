import React, {createRef, PureComponent} from 'react';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {cartPayStyles} from '../style/CartPay.Style';

import MyNavigator from 'utils/MyNavigator';
import {MyView, MyText, MyTextPriceMask, MyButton, MyDialogInput} from 'bases/components';
import {IChooseVoucherState} from 'views/app/reduxChooseVoucher';
import {FlatList} from 'react-native-gesture-handler';
import {IVoucherModel} from 'models';
import {IChooseCartState} from 'views/app/reduxChooseCart';
import Utilities from 'utils/Utilities';
import {initVoucher} from 'views/app/reduxChooseVoucher';
import MyStaticLocal from 'utils/MyStaticLocal';
import {COLOR} from 'bases/styles/Core';

interface IProps extends IChooseVoucherState, IChooseCartState {
  isMaxVoucher?: boolean;
  maxVoucher?: number;

  initVoucher: typeof initVoucher;
}

class ChooseVoucher extends PureComponent<IProps, {}> {
  dialogVoucherRef: any = createRef();
  cancleDialog = () => {
    this.dialogVoucherRef.current.onHide();
  };
  onDeleteVoucher = () => {
    this.dialogVoucherRef.current.onShow();
  };

  componentWillUnmount() {
    this.props.initVoucher([]);
  }

  chooseVoucher = () => {
    let store = MyStaticLocal.getAddressShop();
    if (store && store.id) {
      MyNavigator.navigate('Voucher', {isBanHang: true});
    } else {
      Utilities.showToast(MyI18n.trans.choose_shop_voucher, '', 'info');
      MyNavigator.navigate('Voucher', {isBanHang: true});
    }
  };

  deleteVoucher = (item: IVoucherModel) => {
    MyStaticLocal.removeItemListVoucher(item);
    this.props.initVoucher(MyStaticLocal.getListVoucher());
  };

  getDetailVoucher = (item: IVoucherModel) => {
    MyNavigator.navigate('VoucherDetail', {voucher: item});
  };

  keyExtractor = (item: IVoucherModel) => {
    return item.id.toString();
  };

  renderItem = ({item}: {item: IVoucherModel}) => {
    // Tính tổng số tiền của giỏ hàng
    let giaKhiChuaGiam =
      MyStaticLocal.getSumPriceCart() - MyStaticLocal.getSumPriceDiscountBefore(item);

    // Tính số tiền được giảm trên tổng số tiền của giỏ hàng của mỗi item
    let soTienDuocGiam = 0;
    let giaTriGiam1 = item.discount_value || 0;
    if (item.discount_type === 1) {
      soTienDuocGiam = (giaKhiChuaGiam * giaTriGiam1) / 100;
      if (item.max_discount_value && soTienDuocGiam > item.max_discount_value) {
        soTienDuocGiam = item.max_discount_value;
      }
    }
    let giaTriGiam2 = item.discount_value || 0;
    if (item.discount_type === 2) {
      soTienDuocGiam = soTienDuocGiam + giaTriGiam2;
    }

    return (
      <MyView style={cartPayStyles.viewItemGiamGiaContainer} transparent>
        <MyView style={cartPayStyles.viewTextGiamGiaContent} transparent>
          <MyText
            numberOfLines={1}
            onPress={() => this.getDetailVoucher(item)}
            style={cartPayStyles.nameItemGiamGia}
            fontStyle="Regular">
            {item.code}
          </MyText>
          <MyText
            onPress={this.onDeleteVoucher}
            style={cartPayStyles.deleteGiamGia}
            fontStyle="Regular">
            {MyI18n.trans.delete}
          </MyText>
        </MyView>
        <MyView style={cartPayStyles.viewPriceGiamGia} transparent>
          <MyText fontStyle="Bold">{'-'}</MyText>
          <MyTextPriceMask fontStyle="Bold" text={soTienDuocGiam} />
        </MyView>
        <MyDialogInput
          ref={this.dialogVoucherRef}
          onRequestClose={this.cancleDialog}
          title={MyI18n.trans.delete_voucher}
          titleStyle={{color: COLOR.TEXT.BLACK}}
          description={MyI18n.trans.question_delete_voucher}
          descriptionStyle={{color: COLOR.TEXT.BLACK}}
          contentStyle={{backgroundColor: COLOR.BG.WHITE}}
          actionButtons={[
            {
              label: MyI18n.trans.delete,
              color: COLOR.TEXT.POSITIVE_BTN,
              onPress: () => this.deleteVoucher(item)
            },
            {
              label: MyI18n.trans.cancel,
              color: COLOR.TEXT.NEGATIVE_BTN,
              onPress: this.cancleDialog
            }
          ]}
        />
      </MyView>
    );
  };

  renderListFooterComponent = () => {
    const {isMaxVoucher, maxVoucher, listVoucher} = this.props;
    let max = 10000;
    if (maxVoucher) {
      max = maxVoucher;
    }
    if (isMaxVoucher && listVoucher && listVoucher?.length >= max) {
      return null;
    }
    return (
      <MyButton style={cartPayStyles.viewChonGiamGia} onPress={this.chooseVoucher} transparent>
        <MyText style={cartPayStyles.chonGiamGia} fontStyle="Regular">
          {MyI18n.trans.choose_a_discount_code}
        </MyText>
      </MyButton>
    );
  };

  render() {
    const {listVoucher} = this.props;

    return (
      <MyView transparent>
        <MyText fontStyle="Bold" style={cartPayStyles.titleGiamGia}>
          {MyI18n.trans.discount_code}
        </MyText>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          data={listVoucher}
          extraData={listVoucher}
          ListFooterComponent={this.renderListFooterComponent}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {listVoucher} = state.ChooseVoucherReducer;
  return {listVoucher};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      initVoucher
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseVoucher);
