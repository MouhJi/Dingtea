import {StyleSheet} from 'react-native';

import {COLOR, FONT_SIZE, LAYOUT, MARGIN, PADDING, setMargin, setPadding} from 'bases/styles/Core';

const cmtStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    backgroundColor: COLOR.BG.PRIMARY
  },
  contentList: {
    backgroundColor: COLOR.BG.PRIMARY,
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  itemSeparator: {
    height: LAYOUT.l_10
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

export {cmtStyles};
