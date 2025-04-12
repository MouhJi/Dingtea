import React, {PureComponent} from 'react';
import {Modal} from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import {SafeAreaView} from 'react-native-safe-area-context';

import {MyButtonIcon, MyToolbar, MyButtonShadow} from 'bases/components';

import Utilities from 'utils/Utilities';

import {stylesModal} from '../style/Scan.Style';

interface IProps {
  value: string;
}
interface IStates {
  isVisible: boolean;
}

export default class ModalQrCode extends PureComponent<IProps, IStates> {
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
    const {value} = this.props;
    const {isVisible} = this.state;

    return (
      <Modal
        visible={isVisible}
        transparent
        supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        hardwareAccelerated
        onRequestClose={this.onHide}>
        <SafeAreaView edges={['left', 'right']} style={stylesModal.container}>
          <MyToolbar style={stylesModal.containerToolbar} onPress={this.onHide} />
          <MyButtonShadow onPress={this.onHide} style={stylesModal.modalContainer}>
            <MyButtonIcon
              onPress={this.onHide}
              iconFontType="AntDesign"
              iconProps={{
                name: 'close',
                size: 32
              }}
              style={stylesModal.iconClose}
            />
            <QRCode size={Utilities.getWidthScreen() * 0.5} value={value} />
          </MyButtonShadow>
        </SafeAreaView>
      </Modal>
    );
  }
}
