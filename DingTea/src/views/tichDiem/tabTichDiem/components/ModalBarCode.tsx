import React, {PureComponent} from 'react';
import {Modal, ScrollView} from 'react-native';

import Barcode from 'react-native-barcode-svg';
import {SafeAreaView} from 'react-native-safe-area-context';

import {MyButtonShadow, MyView, MyText, MyImage} from 'bases/components';

import Utilities from 'utils/Utilities';

import {stylesModal, tabtichDiemStyle} from 'views/tichDiem/style/TichDiem.Style';
import {SvgCss} from 'react-native-svg/css';
import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux';
import {IPersonState} from 'views/accounts/person/redux';
interface IProps extends IPersonState {}
interface IStates {
  isVisible: boolean;
}

class ModalBarCode extends PureComponent<IProps, IStates> {
  state = {isVisible: false};

  onShow = () => {
    this.setState({
      isVisible: true
    });
  };

  onHide = () => {
    this.setState({
      isVisible: false
    });
  };

  render() {
    const {isVisible} = this.state;
    const {id, name} = this.props;
    const userCode = id?.toString() || '-1';
    return (
      <Modal
        visible={isVisible}
        transparent
        supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        hardwareAccelerated
        onRequestClose={this.onHide}>
        <SafeAreaView edges={['left', 'right']} style={stylesModal.container}>
          <ScrollView style={stylesModal.spaceUp} contentContainerStyle={stylesModal.contentScroll}>
            <MyButtonShadow
              transparent
              onPress={this.onHide}
              activeOpacity={1}
              style={stylesModal.modalContainer}>
              <MyView style={stylesModal.viewQACode}>
                <Barcode
                  height={100}
                  maxWidth={Utilities.getWidthScreen() * 0.8}
                  value={userCode}
                  format="CODE128"
                />
                <MyText fontStyle="SemiBold" style={tabtichDiemStyle.txtName}>
                  {name} - {id}
                </MyText>
              </MyView>
              <MyView style={stylesModal.viewHeaderContainer}>
                <SvgCss
                  xml={Utilities.getSvgBackground(
                    Utilities.getWidthScreen() - 32,
                    Utilities.getResolutionByHeight(240)
                  )}
                  style={stylesModal.background}
                />
                <MyView transparent>
                  <MyText fontStyle="SemiBold" style={stylesModal.txtNote}>
                    {MyI18n.trans.point_note}
                  </MyText>
                  <MyText fontStyle="Bold">{MyI18n.trans.dingtea_hello}</MyText>
                  <MyText fontStyle="SemiBold" style={stylesModal.txtDingteaSay}>
                    {MyI18n.trans.dingtea_say_introduct}
                  </MyText>
                </MyView>
                <MyImage
                  source={Utilities.convertLinkImage('')}
                  style={stylesModal.imgLogo}
                  width={stylesModal.imgLogo.width}
                  height={stylesModal.imgLogo.height}
                />
              </MyView>
            </MyButtonShadow>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {id, name} = state.PersonReducer;
  return {id, name};
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(ModalBarCode);
