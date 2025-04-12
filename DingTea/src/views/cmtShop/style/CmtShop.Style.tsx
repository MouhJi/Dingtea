import {StyleSheet} from 'react-native';

import {LAYOUT, MARGIN, PADDING, RADIUS, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import MyTheme from 'utils/MyTheme';

const cmtShop = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    flex: 1
  },

  content: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16),
    ...setPadding(PADDING.p_10, PADDING.p_16, PADDING.p_0, PADDING.p_0),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewTextRating: {
    ...setMargin(MARGIN.m_6, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  },
  viewTextAttachedPhoto: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    backgroundColor: MyTheme.themes.BG.PRIMARY,
    height: LAYOUT.l_48
  },
  contentInput: {
    ...setMargin(MARGIN.m_10, MARGIN.m_10, MARGIN.m_16, MARGIN.m_16),
    // backgroundColor: MyTheme.themes.BG.WHITE,
    backgroundColor: MyTheme.themes.TEXT.PLACEHOLDER,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  input: {
    borderWidth: 1,
    borderColor: MyTheme.themes.TEXT.SECONDARY_LIGHT,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    height: LAYOUT.l_140
  },
  inputName: {
    borderColor: MyTheme.themes.TEXT.SECONDARY_LIGHT,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    borderWidth: 1
  },
  viewRating: {
    backgroundColor: 'yellow',
    borderRadius: RADIUS.r_16
  },
  viewImage: {
    ...setMargin(MARGIN.m_0, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16),
    flexDirection: 'row'
  },

  spaceUp: {
    flex: 1
  },
  txtNote: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  }
});

export {cmtShop};
