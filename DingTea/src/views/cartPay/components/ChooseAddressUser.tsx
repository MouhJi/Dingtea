import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {cartPayStyles} from '../style/CartPay.Style';

import MyNavigator from 'utils/MyNavigator';
import {MyIcon, MyText, MyButton} from 'bases/components';
import {IChooseAddressUserState} from 'views/app/reduxChooseAddressUser';
import MyTheme from 'utils/MyTheme';

interface IProps extends IChooseAddressUserState {
  titleChonDiaChi: string;
}

class ChooseAddressUser extends PureComponent<IProps, {}> {
  onPress = () => {
    MyNavigator.navigate('AddressUser');
  };

  render() {
    const {titleChonDiaChi, addressUserChoose} = this.props;

    return (
      <MyButton style={cartPayStyles.viewEditText} onPress={this.onPress} transparent>
        <MyIcon
          style={cartPayStyles.icon}
          iconFontType="Ionicons"
          name="location-outline"
          size={14}
          color={MyTheme.themes.TEXT.SECONDARY_LIGHT}
        />
        <MyText fontStyle="Regular" style={cartPayStyles.textTitle}>
          {addressUserChoose?.address || titleChonDiaChi}
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
  const {addressUserChoose} = state.ChooseAddressUserReducer;
  return {addressUserChoose};
};

export default connect(mapStateToProps, null)(ChooseAddressUser);
