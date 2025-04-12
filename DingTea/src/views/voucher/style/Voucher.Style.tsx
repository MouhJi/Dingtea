import {setPadding, PADDING, LAYOUT, setMargin, MARGIN, FONT_SIZE} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';
import MyTheme from 'utils/MyTheme';

export const tabVoucherStyles = StyleSheet.create({
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
