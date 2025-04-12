import React, {createRef, PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyButton, MyImage, MyView} from 'bases/components';

import {LAYOUT, PADDING, RADIUS, setPadding, setRadius} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';
import MyTheme from 'utils/MyTheme';
import {SvgCss} from 'react-native-svg/css';
import {svgCreditCard} from 'assets/images/svgImage';
import ModalBarCode from 'views/tichDiem/tabTichDiem/components/ModalBarCode';
import {IPersonState} from 'views/accounts/person/redux';
interface defaultProps extends IPersonState {}
class HomeHeader extends PureComponent<defaultProps> {
  showModalBarCodeRef: any = createRef();
  onPressLogo = () => {
    MyNavigator.navigate('HomeRouter', {screen:'HomeTab'});
  };

  onShowBarCode = () => {
    const {id} = this.props;
    if (id) {
      this.showModalBarCodeRef.current.onShow();
    } else {
      MyNavigator.navigate('Login');
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.containerTitle} edges={['top']}>
        <MyView style={styles.contentTitle} transparent>
          <MyButton onPress={this.onPressLogo} style={styles.btnLogo} transparent>
            <MyImage
              source={Utilities.convertLinkImage('')}
              style={styles.imgLogo}
              width={styles.imgLogo.width}
              height={styles.imgLogo.height}
            />
          </MyButton>
          <MyButton onPress={this.onShowBarCode} style={styles.btnCreditCard} transparent>
            <SvgCss xml={svgCreditCard} />
          </MyButton>
        </MyView>
        <ModalBarCode ref={this.showModalBarCodeRef} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {theme} = state.SettingReducer;
  const {id} = state.PersonReducer;
  return {theme, id};
};

export default connect(mapStateToProps, null)(HomeHeader);

const styles = StyleSheet.create({
  containerTitle: {
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  contentTitle: {
    height: LAYOUT.l_50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnLogo: {
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16)
  },
  imgLogo: {
    ...setRadius(RADIUS.r_0, RADIUS.r_0, RADIUS.r_0, RADIUS.r_0),
    backgroundColor: MyTheme.themes.BG.WHITE,
    width: LAYOUT.l_60,
    height: LAYOUT.l_40
  },
  btnCreditCard: {
    ...setPadding(PADDING.p_4, PADDING.p_4, PADDING.p_16, PADDING.p_16)
  }
});
