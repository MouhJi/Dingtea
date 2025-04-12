import {StyleSheet} from 'react-native';

import {
  LAYOUT,
  setMargin,
  MARGIN,
  COLOR,
  setPadding,
  PADDING,
  FONT_SIZE,
  setRadius,
  RADIUS,
  setShadow
} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';
import MyTheme from 'utils/MyTheme';

const storeStyles = StyleSheet.create({
  container: {flex: 1},
  inputSearchStore: {
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLOR.BG.SECONDARY1,
    height: Utilities.getResolutionByHeight(48)
  },
  itemSeparator: {
    flexDirection: 'row',
    height: LAYOUT.l_1,
    // ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  itemSeparator2: {
    height: LAYOUT.l_1,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    backgroundColor: MyTheme.themes.BG.BLACK_30,
    flex: 1
  },
  contentList: {
    // backgroundColor: MyTheme.themes.BG.WHITE,
    // // ...setPadding(PADDING.p_0, Utilities.getResolutionByHeight(16), PADDING.p_0, PADDING.p_0),
    // ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6)
  },
  inputSearch: {
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_0, PADDING.p_8)
  },
  containerError: {
    flex: 1,
    justifyContent: 'center',
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_0, PADDING.p_0)
  },
  txtAgain: {
    textAlign: 'center',
    fontSize: FONT_SIZE.s_16,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_10, MARGIN.m_10)
  },
  btnAgain: {
    ...setMargin(MARGIN.m_20, MARGIN.m_0, MARGIN.m_20, MARGIN.m_20),
    height: LAYOUT.l_48
  },
  list: {
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16)
  }
});

const StoreDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyTheme.themes.TEXT.PLACEHOLDER
  },
  images: {
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16)
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mapView: {
    width: '100%',
    height: '100%'
  },
  viewBtnScan: {
    backgroundColor: MyTheme.themes.BG.PRIMARY_DARK,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setMargin(MARGIN.m_12, MARGIN.m_14, MARGIN.m_16, MARGIN.m_16)
  },
  viewMap: {
    overflow: 'hidden',
    ...setMargin(MARGIN.m_16),
    height: Utilities.getResolutionByHeight(120),
    backgroundColor: COLOR.BG.SECONDARY,
    ...setRadius(RADIUS.r_24, RADIUS.r_24, RADIUS.r_24, RADIUS.r_24)
  },
  viewText: {
    marginLeft: MARGIN.m_12,
    justifyContent: 'space-between',
    flex: 1
  },
  textWhite: {
    color: COLOR.TEXT.WHITE,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_10, MARGIN.m_0)
  },
  text24: {
    fontSize: FONT_SIZE.s_12
  },
  text25: {
    fontSize: FONT_SIZE.s_14,
    ...setMargin(MARGIN.m_6, MARGIN.m_6, MARGIN.m_0, MARGIN.m_0)
  },
  textBlack27: {
    color: MyTheme.themes.TEXT.SECONDARY, // COLOR.TEXT.SECONDARY,
    fontSize: FONT_SIZE.s_12,
    ...setMargin(MARGIN.m_4, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    ...setPadding(PADDING.p_0, PADDING.p_12, PADDING.p_0, PADDING.p_0)
  },
  textGreen: {
    color: MyTheme.themes.TEXT.PRIMARY_DARK, // COLOR.TEXT.SECONDARY,
    fontSize: FONT_SIZE.s_12,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_8, MARGIN.m_8)
  },
  textBlue: {
    color: COLOR.TEXT.BLUE
  },
  text18: {
    color: MyTheme.themes.TEXT.SECONDARY,
    fontSize: FONT_SIZE.s_12
  },
  textTitle: {
    fontSize: FONT_SIZE.s_12,
    // maxWidth: Utilities.getResolutionByWidth(280),
    ...setPadding(PADDING.p_12, PADDING.p_0, PADDING.p_0, PADDING.p_0)
  },
  textTitle2: {
    fontSize: FONT_SIZE.s_12,
    // maxWidth: Utilities.getResolutionByWidth(280),
    ...setPadding(PADDING.p_22, PADDING.p_22, PADDING.p_0, PADDING.p_0)
  },
  addressStore: {
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16)
  },
  addressStore2: {
    ...setMargin(MARGIN.m_8, MARGIN.m_8, MARGIN.m_16, MARGIN.m_16)
  },
  viewLine: {
    height: LAYOUT.l_1,
    backgroundColor: COLOR.BG.PRIMARY
  },
  safeArena: {
    height: Utilities.getResolutionByHeight(73),
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setShadow()
  }
});

export {storeStyles, StoreDetailsStyles};
