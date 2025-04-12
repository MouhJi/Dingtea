import {
  svgLichSuGiaoDich,
  svgPhieuUuDai,
  svgQuaTang,
  svgQuyenLoiCuaBan
} from 'assets/images/svgImage';
import {MyText, MyView} from 'bases/components';
import MyButtonSvg from 'bases/components/button/MyButtonSvg';
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux';
import {tabtichDiemStyle} from '../style/TichDiem.Style';
import DoiQuaTangComponent from '../components/DoiQuaTangComponent';
import HeaderTichDiem from './components/HeaderTichDiem';
import PhieuUuDaiComponent from '../components/PhieuUuDaiComponent';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';

interface IAppProps {
  onPressQuaTang: () => void;
  onPressUuDai: () => void;
}
class TabTichDiem extends PureComponent<IAppProps> {
  render() {
    const {onPressUuDai, onPressQuaTang} = this.props;
    return (
      <ScrollView
        style={tabtichDiemStyle.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <HeaderTichDiem />
        <MyView transparent style={tabtichDiemStyle.viewheader}>
          <MyButtonSvg svgImage={svgQuaTang} title={MyI18n.trans.gift} onPress={onPressQuaTang} />
          <MyButtonSvg
            svgImage={svgPhieuUuDai}
            title={MyI18n.trans.vouchers}
            onPress={onPressUuDai}
          />
        </MyView>
        <MyView transparent style={tabtichDiemStyle.viewheader}>
          <MyButtonSvg
            svgImage={svgLichSuGiaoDich}
            title={MyI18n.trans.transaction_history}
            onPress={() => {
              MyNavigator.navigate('Order');
            }}
          />
          <MyButtonSvg
            svgImage={svgQuyenLoiCuaBan}
            title={MyI18n.trans.your_favorite}
            onPress={() => {
              Utilities.showToast('Thông báo', 'Tính năng sắp ra mắt');
              // MyNavigator.navigate('Blog');
            }}
          />
        </MyView>
        <MyView transparent style={tabtichDiemStyle.viewTitle}>
          <MyText fontStyle={'Bold'}>{MyI18n.trans.redeem_gifts}</MyText>
          {/* <MyText fontStyle={'SemiBold'} style={tabtichDiemStyle.txtTitle}>
              {MyI18n.trans.all}
            </MyText> */}
        </MyView>
        <DoiQuaTangComponent />

        {/* <PhieuUuDaiComponent /> */}
      </ScrollView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  return {iso, theme};
};

export default connect(mapStateToProps, null)(TabTichDiem);
