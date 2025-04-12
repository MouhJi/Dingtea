import {MyButton, MyText, MyView, MyViewShadow} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux';
import {personStyles} from '../style/Person.Style';

interface defaultProps {}

class LoginView extends PureComponent<defaultProps> {
  onPressRules = () => {
    MyNavigator.navigate('PreviewWeb');
  };
  onPressGopY = () => {
    MyNavigator.navigate('CmtShop');
  };
  onPressLogin = () => {
    MyNavigator.navigate('Login');
  };

  render() {
    return (
      <MyViewShadow style={personStyles.container}>
        {/* chưa login */}
        <MyView style={personStyles.person} transparent>
          <MyButton style={personStyles.viewUser} transparent onPress={this.onPressLogin}>
            {/* <MyImage
              source={Utilities.convertLinkImage('')}
              style={personStyles.imgAvatar}
              width={personStyles.imageAvatar.width}
              height={personStyles.imageAvatar.width}
            /> */}
            <MyText fontStyle="Bold">{MyI18n.trans.login}</MyText>
          </MyButton>
        </MyView>
        <MyView style={personStyles.line} />
        <MyText onPress={this.onPressRules} style={personStyles.txtPerson} fontStyle="Bold">
          {MyI18n.trans.terms_of_use}
        </MyText>
        <MyText onPress={this.onPressGopY} style={personStyles.txtPerson} fontStyle="Bold">
          {MyI18n.trans.send_suggestions_complaints}
        </MyText>
      </MyViewShadow>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  return {iso, theme};
};

export default connect(mapStateToProps, null)(LoginView);
