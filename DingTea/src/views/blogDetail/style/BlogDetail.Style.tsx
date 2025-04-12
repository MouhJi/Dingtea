import {StyleSheet} from 'react-native';

import {
  FONT_SIZE,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius
} from 'bases/styles/Core';
import MyTheme from 'utils/MyTheme';
import Utilities from 'utils/Utilities';

const blogDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyTheme.themes.BG.SECONDARY
  },
  contentList: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16),
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: MyTheme.themes.TEXT.SECONDARY
  },
  containerError: {
    flex: 1,
    justifyContent: 'center',
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  txtAgain: {
    textAlign: 'center',
    fontSize: FONT_SIZE.s_16
  },
  btnAgain: {
    ...setMargin(MARGIN.m_20, MARGIN.m_0, MARGIN.m_20, MARGIN.m_20)
  },
  styleImage: {
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_0, MARGIN.m_0),
    alignSelf: 'center',
    backgroundColor: MyTheme.themes.BG.WHITE,
    width: Utilities.getWidthScreen() - PADDING.p_16 * 4,
    height: ((Utilities.getWidthScreen() - PADDING.p_16 * 4) * 9) / 16
  },
  containerImage: {
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_0, PADDING.p_0),
    ...setRadius(RADIUS.r_16, RADIUS.r_16, RADIUS.r_0, RADIUS.r_0),
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  viewDesc: {
    top: -PADDING.p_16 * 4
  },
  title: {
    ...setMargin(MARGIN.m_16, MARGIN.m_10, MARGIN.m_0, MARGIN.m_0)
  },
  viewDate: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setMargin(MARGIN.m_0, MARGIN.m_16, MARGIN.m_0, MARGIN.m_0)
  },
  txtDate: {
    color: MyTheme.themes.TEXT.SECONDARY,
    fontSize: FONT_SIZE.s_12,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_8, MARGIN.m_0)
  }
});

export {blogDetailStyles};
