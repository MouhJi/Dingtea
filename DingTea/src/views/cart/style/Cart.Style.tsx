import {StyleSheet} from 'react-native';

import {
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

const cartStyles = StyleSheet.create({
  list: {
    backgroundColor: MyTheme.themes.BG.SECONDARY
  },
  contentList: {
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  itemSeparator: {
    height: LAYOUT.l_16
  },

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
  txtAgain: {
    textAlign: 'center',
    fontSize: FONT_SIZE.s_16
  }
});

const itemCartStyles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  textContent: {
    fontSize: FONT_SIZE.s_14,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    color: MyTheme.themes.TEXT.SECONDARY
  },
  qtyView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(PADDING.p_0, PADDING.p_10, PADDING.p_16, PADDING.p_0)
  },
  qtyTitle: {
    ...setMargin(MARGIN.m_0, MARGIN.m_4, MARGIN.m_16, MARGIN.m_16),
    color: MyTheme.themes.TEXT.PRIMARY
  },
  qtyTitleName: {
    ...setMargin(MARGIN.m_16, MARGIN.m_4, MARGIN.m_16, MARGIN.m_48)
  },
  qtyViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    ...setRadius(RADIUS.r_0, RADIUS.r_16, RADIUS.r_0, RADIUS.r_0),
    ...setPadding(PADDING.p_12, PADDING.p_12, PADDING.p_12, PADDING.p_12)
  },
  plusButton: {
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    ...setRadius(RADIUS.r_0, RADIUS.r_0, RADIUS.r_0, RADIUS.r_16),
    alignSelf: 'center'
  },
  minusButton: {
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    alignSelf: 'center'
  },
  txtSoluong: {
    width: LAYOUT.l_30,
    textAlign: 'center'
  },

  containerImage: {
    flexDirection: 'row',
    ...setMargin(MARGIN.m_10, MARGIN.m_10, MARGIN.m_16, MARGIN.m_16)
  },
  contentImage: {
    flex: 1
  },
  titleTopping: {
    ...setMargin(MARGIN.m_4, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    color: MyTheme.themes.TEXT.SECONDARY
  },
  image: {
    width: LAYOUT.l_86,
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6)
  },
  qtyViewImage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...setPadding(PADDING.p_0, PADDING.p_16, PADDING.p_16, PADDING.p_0),
    ...setRadius(RADIUS.r_0, RADIUS.r_0, RADIUS.r_8, RADIUS.r_8)
  },

  titleNote: {
    ...setMargin(MARGIN.m_6, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  titleContentNote: {
    ...setMargin(MARGIN.m_4, MARGIN.m_0, MARGIN.m_0, MARGIN.m_8),
    color: MyTheme.themes.TEXT.PRIMARY
  },
  textCmt: {
    ...setMargin(MARGIN.m_4, MARGIN.m_0, MARGIN.m_0, MARGIN.m_8),
    color: MyTheme.themes.TEXT.ORANGE,
    textDecorationLine: 'underline'
  }
});

export {cartStyles, itemCartStyles};
