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

const addressStyles = StyleSheet.create({
  list: {
    backgroundColor: MyTheme.themes.BG.SECONDARY
  },
  contentList: {
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  itemSeparator: {
    height: LAYOUT.l_14
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
  inputSearch: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10),
    height: LAYOUT.l_40
  },
  contentSearch: {
    flex: 1,
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10),
    ...setMargin(MARGIN.m_0, MARGIN.m_16, MARGIN.m_0, MARGIN.m_0)
  },
  containerSearch: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    flexDirection: 'row',
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10),
    ...setMargin(MARGIN.m_0, MARGIN.m_10, MARGIN.m_0, MARGIN.m_0),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btnCheck: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    alignSelf: 'center',
    height: LAYOUT.l_40,
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_10, PADDING.p_10),
    ...setRadius(RADIUS.r_0, RADIUS.r_10, RADIUS.r_0, RADIUS.r_10),
    justifyContent: 'center'
  },

  textCmt: {
    color: MyTheme.themes.TEXT.ORANGE,
    textDecorationLine: 'underline',
    fontSize: FONT_SIZE.s_14,
    flex: 1
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

export {addressStyles};
