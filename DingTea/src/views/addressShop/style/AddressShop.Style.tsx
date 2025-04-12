import {StyleSheet} from 'react-native';

import {
  COLOR,
  FONT_SIZE,
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

const addressStyles = StyleSheet.create({
  list: {
    backgroundColor: COLOR.BG.PRIMARY,
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16)
  },
  itemSeparator: {
    height: LAYOUT.l_1,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  },
  contentList: {
    ...setShadow(),
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16),
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },

  bottomButton: {
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16)
  },
  container: {
    flex: 1
  },
  safeView: {
    backgroundColor: COLOR.BG.WHITE,
    shadowColor: COLOR.BG.BLACK,
    shadowOffset: {
      width: 0,
      height: -1
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 100
  },
  inputSearch: {
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10),
    height: LAYOUT.l_40
  },
  containerSearch: {
    // flex: 1,
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10),
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16)
  },

  containerError: {
    flex: 1,
    justifyContent: 'center',
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_0, PADDING.p_0)
  },
  txtAgain: {
    textAlign: 'center',
    fontSize: FONT_SIZE.s_16
  },
  btnAgain: {
    ...setMargin(MARGIN.m_20, MARGIN.m_0, MARGIN.m_20, MARGIN.m_20),
    height: LAYOUT.l_48
  }
});

const itemStoreStyle = StyleSheet.create({
  containerDetail: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  titleDetail: {
    fontSize: FONT_SIZE.s_14
  },
  viewInfor: {
    flex: 1,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_0)
  },
  logoShop: {
    ...setRadius(RADIUS.r_20, RADIUS.r_20, RADIUS.r_20, RADIUS.r_20)
  },
  viewInforCall: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setMargin(MARGIN.m_8, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  viewCall: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent'
  },
  txtCall: {
    fontSize: FONT_SIZE.s_12,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_4, MARGIN.m_0)
  },
  icon: {
    color: MyTheme.themes.BG.PRIMARY_DARK
  }
});

export {addressStyles, itemStoreStyle};
