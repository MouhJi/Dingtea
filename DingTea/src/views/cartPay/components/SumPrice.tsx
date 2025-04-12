import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyView, MyText, MyTextPriceMask} from 'bases/components';
import MyStaticLocal from 'utils/MyStaticLocal';

import {cartPayStyles} from '../style/CartPay.Style';
import {IChooseVoucherState} from 'views/app/reduxChooseVoucher';
import {ICartShipState} from 'views/cartPayShip/redux';

interface IProps extends IChooseVoucherState, ICartShipState {
  titleTotalPrice: string;
}

class SumPrice extends PureComponent<IProps, {}> {
  render() {
    let giaKhiChuaGiam = MyStaticLocal.getSumPriceCart();

    const {titleTotalPrice, cartShipChoose} = this.props;
    let tongSoTienDuocGiam = MyStaticLocal.getSumPriceDiscount();

    let phiVanChuyen = 0;
    if (cartShipChoose) {
      phiVanChuyen = cartShipChoose.price || 0;
    }

    return (
      <MyView transparent>
        <MyView style={cartPayStyles.tongGia} transparent>
          <MyText fontStyle="Bold">{titleTotalPrice}</MyText>
          <MyTextPriceMask
            fontStyle="Bold"
            text={giaKhiChuaGiam - tongSoTienDuocGiam + phiVanChuyen}
          />
        </MyView>
        {/* <MyText style={cartPayStyles.chuThichVoucher} fontStyle="Regular">
          {'(Với 1% hóa đơn tổng bạn tích được 01 điểm)'}
        </MyText> */}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {listVoucher} = state.ChooseVoucherReducer;
  const {cartShipChoose} = state.CartPayShipReducer;
  const {listProductCart} = state.ChooseCartReducer;
  return {listVoucher, cartShipChoose, listProductCart};
};

export default connect(mapStateToProps, null)(SumPrice);
