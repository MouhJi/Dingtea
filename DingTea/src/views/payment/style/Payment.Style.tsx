import {StyleSheet} from 'react-native';

import {FONT_SIZE, LAYOUT, MARGIN, PADDING, setMargin, setPadding} from 'bases/styles/Core';
import MyTheme from 'utils/MyTheme';

const payStyles = StyleSheet.create({
  list: {
    backgroundColor: MyTheme.themes.BG.SECONDARY
  },
  contentList: {
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  itemSeparator: {
    height: LAYOUT.l_10
  },

  bottomButton: {
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16)
  },
  container: {
    flex: 1
  },
  safeView: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setPadding()
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
  },

  viewRowHeader: {
    flexDirection: 'row',
    ...setMargin(MARGIN.m_0, MARGIN.m_8, MARGIN.m_0, MARGIN.m_0),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTitle: {
    color: MyTheme.themes.TEXT.PRIMARY
  },
  titleChooseBank: {
    alignSelf: 'center',
    fontSize: FONT_SIZE.s_16,
    ...setMargin(MARGIN.m_8, MARGIN.m_16, MARGIN.m_0, MARGIN.m_0),
    alignItems: 'center'
  },
  textPrice: {
    color: MyTheme.themes.TEXT.PRIMARY,
    fontSize: FONT_SIZE.s_16
  }
});

export {payStyles};
