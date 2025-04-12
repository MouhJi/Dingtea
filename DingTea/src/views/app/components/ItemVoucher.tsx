import React, {PureComponent} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';

import {
  FONT_SIZE,
  LAYOUT,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius
} from 'bases/styles/Core';

import Utilities from 'utils/Utilities';
import {MyText, MyButtonShadow, MyImage, MyViewShadow} from 'bases/components';
import {IVoucherModel} from 'models';
import {initVoucher} from 'views/app/reduxChooseVoucher';
import MyNavigator from 'utils/MyNavigator';
import MyStaticLocal from 'utils/MyStaticLocal';
import MyTheme from 'utils/MyTheme';

interface IProps {
  item: IVoucherModel;
  initVoucher: typeof initVoucher;
  title?: string;
  date?: number;
  image?: string;
  onPress?: () => void;
  status_local?: number | string;
  style?: ViewStyle;
}

class ItemVoucher extends PureComponent<IProps> {
  //   onPress = () => {
  //     MyNavigator.navigate('VoucherDetail', {voucher: this.props.item});
  //   };

  onPressApply = () => {
    const {item} = this.props;
    MyStaticLocal.addListVoucher(item);
    this.props.initVoucher(MyStaticLocal.getListVoucher());
    MyNavigator.goBack();
  };

  render() {
    const {onPress, date, image, status_local, title, style} = this.props;

    let stopTime: number = 0;
    if (date) {
      stopTime = date;
    }
    const source = Utilities.convertLinkImage(image, 'MEDIUM');
    const time = Utilities.convertTimeByFormat(stopTime, 'DD/MM/YYYY');

    let _viewTextApply = null;
    switch (status_local) {
      case 1:
        _viewTextApply = (
          <MyText
            onPress={this.onPressApply}
            fontStyle="Bold"
            style={[styles.textApDung, {color: MyTheme.themes.TEXT.ORANGE}]}>
            {MyI18n.trans.apply}
          </MyText>
        );
        break;

      case 2:
        _viewTextApply = (
          <MyText
            fontStyle="Bold"
            style={[styles.textApDung, {color: MyTheme.themes.TEXT.SECONDARY_LIGHT}]}>
            {MyI18n.trans.unqualified}
          </MyText>
        );
        break;

      case 3:
        _viewTextApply = (
          <MyText
            fontStyle="Bold"
            style={[styles.textApDung, {color: MyTheme.themes.TEXT.SECONDARY_LIGHT}]}>
            {MyI18n.trans.expired}
          </MyText>
        );
        break;

      default:
        break;
    }

    return (
      <MyButtonShadow transparent onPress={onPress} style={[styles.container, style]}>
        <MyViewShadow style={styles.vieImage}>
          <MyImage
            height={styles.image.width}
            width={styles.image.width}
            source={source}
            style={styles.image}
          />
        </MyViewShadow>

        <MyViewShadow style={styles.contentText}>
          <MyText fontStyle="SemiBold" numberOfLines={2}>
            {title}
          </MyText>
          {/* <MyView transparent style={styles.viewApply}> */}
          <MyText fontStyle="SemiBold" style={styles.textHSD}>
            {MyI18n.trans.due_date}
            {': '}
            {time}
          </MyText>

          {_viewTextApply}
          {/* </MyView> */}
        </MyViewShadow>
      </MyButtonShadow>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      initVoucher
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(ItemVoucher);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  image: {
    width: LAYOUT.l_60,
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6)
  },
  contentText: {
    flex: 1,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_2, MARGIN.m_0),
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    backgroundColor: MyTheme.themes.BG.WHITE,
    justifyContent: 'space-between'
  },
  textApDung: {
    fontSize: FONT_SIZE.s_12,
    color: MyTheme.themes.TEXT.ORANGE,
    alignSelf: 'flex-start',
    ...setPadding(PADDING.p_2, PADDING.p_0, PADDING.p_0, PADDING.p_0),
    textDecorationLine: 'underline'
  },
  textHSD: {
    color: MyTheme.themes.TEXT.PRIMARY_DARK,
    fontSize: FONT_SIZE.s_12,
    ...setMargin(MARGIN.m_2, MARGIN.m_2, MARGIN.m_0, MARGIN.m_0)
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: MyTheme.themes.BG.SECONDARY
  },
  vieImage: {
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16),
    justifyContent: 'center',
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  viewApply: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
