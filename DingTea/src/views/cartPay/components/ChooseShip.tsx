import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {cartPayStyles} from '../style/CartPay.Style';

import MyNavigator from 'utils/MyNavigator';
import {MyView, MyText, MyTextPriceMask, MyButton} from 'bases/components';
import {chooseCartShip} from 'views/cartPayShip/redux';
import {ICartShipState} from 'views/cartPayShip/redux';

interface IProps extends ICartShipState {
  chooseCartShip: typeof chooseCartShip;
}

class ChooseShip extends PureComponent<IProps, {}> {
  // componentWillUnmount() {
  // this.props.chooseCartShip(undefined);
  // }

  chooseShip = () => {
    MyNavigator.navigate('CartPayShip');
  };

  render() {
    const {cartShipChoose} = this.props;

    return (
      <MyView transparent>
        <MyText fontStyle="Bold" style={cartPayStyles.titleGiamGia}>
          {MyI18n.trans.form_of_transportation}
        </MyText>

        {cartShipChoose ? (
          <MyView style={cartPayStyles.viewItemGiamGiaContainer} transparent>
            <MyView style={cartPayStyles.viewTextGiamGiaContent} transparent>
              <MyText
                numberOfLines={1}
                style={cartPayStyles.nameItemGiamGia}
                fontStyle="Regular"
                onPress={this.chooseShip}>
                {cartShipChoose.name}
              </MyText>
              {/* <MyText
                onPress={this.chooseShip}
                style={cartPayStyles.deleteGiamGia}
                fontStyle="Regular">
                {MyI18n.trans.change}
              </MyText> */}
            </MyView>
            <MyView style={cartPayStyles.viewPriceGiamGia} transparent>
              <MyText fontStyle="Bold">{cartShipChoose.price ? '+' : ''}</MyText>
              <MyTextPriceMask fontStyle="Bold" text={cartShipChoose.price || 0} />
            </MyView>
          </MyView>
        ) : (
          <MyButton style={cartPayStyles.viewChonGiamGia} onPress={this.chooseShip} transparent>
            <MyText style={cartPayStyles.chonGiamGia} fontStyle="Regular">
              {MyI18n.trans.choose_form_of_transportation}
            </MyText>
          </MyButton>
        )}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {cartShipChoose} = state.CartPayShipReducer;
  return {cartShipChoose};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      chooseCartShip
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseShip);
