import {StyleSheet} from 'react-native';

import {FONT_SIZE, LAYOUT, MARGIN, PADDING, setMargin, setPadding} from 'bases/styles/Core';
import MyTheme from 'utils/MyTheme';

const menuDetailStyles = StyleSheet.create({
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

export {menuDetailStyles};
