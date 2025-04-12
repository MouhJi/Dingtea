import React, {PureComponent} from 'react';

import {cartComponent} from 'views/home/style/Home.Style';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';

import MyNavigator from 'utils/MyNavigator';
import {MyView, MyText, MyTextPriceMask, MyButton, MyViewShadow} from 'bases/components';
import {IChooseCartState} from 'views/app/reduxChooseCart';
import {StyleProp, ViewStyle} from 'react-native';
import MyStaticLocal from 'utils/MyStaticLocal';
import {SvgCss} from 'react-native-svg/css';
import {svgCart} from 'assets/images/svgImage';

interface defaultProps extends IChooseCartState {
  style?: StyleProp<ViewStyle>;
}

class CartBottom extends PureComponent<defaultProps> {
  showCart = () => {
    MyNavigator.navigate('Cart');
  };

  render() {
    const {listProductCart, style} = this.props;

    if (!listProductCart || listProductCart?.length === 0) {
      return null;
    }

    let priceTotal = MyStaticLocal.getSumPriceCart();

    return (
      <MyButton
        onPress={this.showCart}
        style={[cartComponent.containerView, style]}
        activeOpacity={1}>
        <MyViewShadow style={cartComponent.container}>
          <MyView transparent style={cartComponent.content}>
            <MyText style={cartComponent.textDish} fontStyle="SemiBold">
              {listProductCart?.length} {MyI18n.trans.dish}
              {' / '}
            </MyText>
            <MyTextPriceMask
              text={priceTotal}
              currency="VND"
              fontStyle="SemiBold"
              style={cartComponent.textDish}
            />
          </MyView>
          <SvgCss xml={svgCart} />
        </MyViewShadow>
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  const {listProductCart} = state.ChooseCartReducer;
  return {iso, theme, listProductCart};
};

export default connect(mapStateToProps, null)(CartBottom);
