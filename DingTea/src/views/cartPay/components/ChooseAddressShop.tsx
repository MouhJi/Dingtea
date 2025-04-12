import React, {PureComponent} from 'react';

import {connect} from 'react-redux';

import {RootState} from 'views/app/redux/App.Reducer';

import {cartPayStyles} from '../style/CartPay.Style';

import MyNavigator from 'utils/MyNavigator';
import {MyIcon, MyText, MyButton} from 'bases/components';
import {IChooseAddressShopState} from 'views/app/reduxChooseAddressShop';
import MyTheme from 'utils/MyTheme';

interface IProps extends IChooseAddressShopState {
  titleChonCuaHang: string;
}

class ChooseAddressShop extends PureComponent<IProps> {
  onPress = () => {
    MyNavigator.navigate('AddressShop');
  };

  render() {
    const {titleChonCuaHang, addressShopChoose} = this.props;

    return (
      <MyButton style={cartPayStyles.viewEditText} onPress={this.onPress} transparent>
        <MyIcon
          style={cartPayStyles.icon}
          iconFontType="Entypo"
          name="shop"
          size={14}
          color={MyTheme.themes.TEXT.SECONDARY_LIGHT}
        />
        <MyText fontStyle="Regular" style={cartPayStyles.textTitle}>
          {addressShopChoose?.name || titleChonCuaHang}
        </MyText>
        <MyIcon
          style={cartPayStyles.iconSecond}
          iconFontType="Entypo"
          name="chevron-thin-right"
          size={14}
          color={MyTheme.themes.TEXT.PRIMARY}
        />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {addressShopChoose} = state.ChooseAddressShopReducer;
  return {addressShopChoose};
};

export default connect(mapStateToProps, null)(ChooseAddressShop);
