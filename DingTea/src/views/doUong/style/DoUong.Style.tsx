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
import Utilities from 'utils/Utilities';

const doUongStyles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    flex: 1
  },
  containerHeader: {
    ...setPadding(PADDING.p_0, PADDING.p_8, PADDING.p_0, PADDING.p_0)
  },
  header: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setShadow()
  },
  list: {
    backgroundColor: MyTheme.themes.BG.SECONDARY
  },
  contentList: {
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    ...setPadding(PADDING.p_0, Utilities.getResolutionByHeight(100), PADDING.p_0, PADDING.p_0)
  },
  itemSeparator: {
    height: LAYOUT.l_1,
    backgroundColor: MyTheme.themes.BG.WHITE,
    marginHorizontal: MARGIN.m_16
  },
  itemSeparator2: {
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    marginHorizontal: MARGIN.m_16,
    height: LAYOUT.l_1
  },
  headerSection: {
    ...setPadding(PADDING.p_24, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  item: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  },

  containerError: {
    flex: 1,
    justifyContent: 'center',
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  txtAgain: {
    textAlign: 'center',
    fontSize: FONT_SIZE.s_16
  },
  btnAgain: {
    ...setMargin(MARGIN.m_20, MARGIN.m_0, MARGIN.m_20, MARGIN.m_20)
  }
});

const listTag = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setShadow(),
    zIndex: 99
  },
  title: {
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    color: MyTheme.themes.TEXT.RED
  },
  content: {
    flexDirection: 'row',
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_0, PADDING.p_0)
  },
  content2: {
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16)
  },
  btn: {
    backgroundColor: MyTheme.themes.BG.SECONDARY_LIGHT,
    ...setRadius(RADIUS.r_50, RADIUS.r_50, RADIUS.r_50, RADIUS.r_50),
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16)
  },
  text: {
    color: MyTheme.themes.TEXT.SECONDARY
  },
  itemSeparator: {
    width: LAYOUT.l_16
  }
});

export {doUongStyles, listTag};
