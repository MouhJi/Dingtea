import {StyleSheet} from 'react-native';

import {
  LAYOUT,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius,
  setShadow
} from 'bases/styles/Core';
import MyTheme from 'utils/MyTheme';

const cartSuccessStyles = StyleSheet.create({
  bottomButton: {
    ...setMargin(MARGIN.m_10, MARGIN.m_10, MARGIN.m_16, MARGIN.m_16),
    height: LAYOUT.l_48
  },
  container: {
    flex: 1
  },
  safeView: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setShadow()
  },
  codeOrders: {
    ...setMargin(MARGIN.m_6, MARGIN.m_14, MARGIN.m_16, MARGIN.m_16),
    alignContent: 'center',
    textAlign: 'center'
  },
  chonGiamGia: {
    ...setMargin(MARGIN.m_0, MARGIN.m_4, MARGIN.m_16, MARGIN.m_16),
    ...setPadding(PADDING.p_4, PADDING.p_4, PADDING.p_0, PADDING.p_0),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleVoucher: {
    flex: 1
  },
  viewPay: {
    ...setPadding(PADDING.p_8, PADDING.p_8, PADDING.p_8, PADDING.p_8),
    flexDirection: 'row'
  },
  buttonViewPay: {
    ...setMargin(MARGIN.m_2, MARGIN.m_2, MARGIN.m_8, MARGIN.m_8),
    flex: 1,
    height: LAYOUT.l_48
  },
  buttonGoHome: {
    ...setMargin(MARGIN.m_2, MARGIN.m_2, MARGIN.m_8, MARGIN.m_8),
    flex: 1,
    height: LAYOUT.l_48,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    borderColor: MyTheme.themes.BG.PRIMARY_DARK
  },
  titleGoHome: {
    color: MyTheme.themes.BG.PRIMARY_DARK
  }
});

export {cartSuccessStyles};
