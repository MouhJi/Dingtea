import React, {createRef, PureComponent} from 'react';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';

import Barcode from 'react-native-barcode-svg';
import Utilities from 'utils/Utilities';
import ModalBarCode from './components/ModalBarCode';
import QRCode from 'react-native-qrcode-svg';
import ModalQrCode from './components/ModalQrCode';
import {scanStyles} from './style/Scan.Style';
import {ScrollView} from 'react-native-gesture-handler';

import {ISettingState} from 'views/setting/redux';
import {MyView, MyToolbar, MyButton, MyText} from 'bases/components';
import {IPersonState} from 'views/accounts/person/redux';
import {LoginView} from 'views/accounts/person/component';

interface defaultProps extends ISettingState, IPersonState {}

class Scan extends PureComponent<defaultProps> {
  showModalBarCodeRef: any = createRef();
  showModalQrCodeRef: any = createRef();

  onShowBarCode = () => {
    this.showModalBarCodeRef.current.onShow();
  };

  onShowQrCode = () => {
    this.showModalQrCodeRef.current.onShow();
  };

  render() {
    const {id} = this.props;
    const userCode = id?.toString() || '-1';

    let _viewContent = id ? (
      <>
        <MyButton onPress={this.onShowBarCode} style={scanStyles.btnBarCode}>
          <Barcode
            height={64}
            maxWidth={Utilities.getWidthScreen() * 0.65}
            value={userCode}
            format="CODE128"
          />
        </MyButton>
        <MyText style={scanStyles.text}>
          {MyI18n.trans.customer_code}
          {': '}
          {userCode}
        </MyText>
        <MyText style={scanStyles.textHuongdan}>{MyI18n.trans.use_code}</MyText>
        <MyButton onPress={this.onShowQrCode}>
          <QRCode value={userCode} />
        </MyButton>
      </>
    ) : (
      // <LoginView  />
      <LoginView />
    );

    return (
      <MyView style={scanStyles.container}>
        <MyToolbar title={MyI18n.trans.scan_member} />
        <ScrollView
          contentContainerStyle={scanStyles.content}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {_viewContent}
        </ScrollView>
        <ModalBarCode value={userCode} ref={this.showModalBarCodeRef} />
        <ModalQrCode value={userCode} ref={this.showModalQrCodeRef} />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso} = state.SettingReducer;
  const {id} = state.PersonReducer;
  return {iso, id};
};

export default connect(mapStateToProps, null)(Scan);
