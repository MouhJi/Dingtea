import {svgRank} from 'assets/images/svgImage';
import {MyButton, MyText, MyView, MyViewShadow} from 'bases/components';
import ProgressBar from 'bases/components/progressbar/ProgressBar';
import React, {PureComponent} from 'react';
import Barcode from 'react-native-barcode-svg';
import {SvgCss} from 'react-native-svg/css';
import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import MyTheme from 'utils/MyTheme';
import Utilities from 'utils/Utilities';
import {IPersonState} from 'views/accounts/person/redux';
import {RootState} from 'views/app/redux';
import {tabtichDiemStyle} from 'views/tichDiem/style/TichDiem.Style';
interface defaultProps extends IPersonState {}

class HeaderTichDiem extends PureComponent<defaultProps> {
  render() {
    const {id, name, total_point} = this.props;
    let rateProcess: number;
    if (!total_point) {
      // rateProcess = 0;
      rateProcess = 40 / 100;
    } else {
      rateProcess = total_point / 100;
    }

    const userCode = id?.toString() || '-1';
    const widthProgessBar = Utilities.getWidthScreen();
    return (
      <MyView style={tabtichDiemStyle.viewHeaderContainer}>
        <SvgCss
          xml={Utilities.getSvgBackground(Utilities.getResolutionByWidth(375))}
          style={tabtichDiemStyle.background}
        />
        <MyButton style={tabtichDiemStyle.viewQACode}>
          <Barcode
            height={74}
            maxWidth={Utilities.getWidthScreen() * 0.6}
            value={userCode}
            format="CODE128"
          />
          <MyText fontStyle="SemiBold" style={tabtichDiemStyle.txtName}>
            {name} - {id}
          </MyText>
        </MyButton>
        <MyView style={tabtichDiemStyle.viewBody}>
          <MyView style={tabtichDiemStyle.viewHolder} />
          <MyViewShadow style={tabtichDiemStyle.viewPoint}>
            <MyView transparent style={tabtichDiemStyle.viewRank}>
              <SvgCss xml={svgRank} />
              <MyText fontStyle="SemiBold" style={tabtichDiemStyle.txtRank}>
                <MyText fontStyle="SemiBold">Rank Đồng - </MyText>
                {/* {total_point} */}
                40 {MyI18n.trans.point}
              </MyText>
            </MyView>
            <ProgressBar
              progress={rateProcess}
              height={8}
              borderWidth={0}
              width={widthProgessBar}
              color={MyTheme.themes.BG.PRIMARY}
              style={tabtichDiemStyle.processActive}
            />
            <MyText fontStyle="SemiBold" style={tabtichDiemStyle.txtName}>
              Bạn cần 60 điểm nữa để thăng hạng, đổi quà không ảnh hưởng tới việc thăng hạng của bạn
            </MyText>
          </MyViewShadow>
        </MyView>
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {id, name, total_point} = state.PersonReducer;
  return {id, name, total_point};
};

export default connect(mapStateToProps, null)(HeaderTichDiem);
