import {setMargin, MARGIN, LAYOUT, PADDING, setPadding, RADIUS, setRadius} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';
import MyTheme from 'utils/MyTheme';

const giftStyle = StyleSheet.create({
  list: {
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  contentList: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  itemSeparator: {
    height: LAYOUT.l_1,
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    ...setMargin(MARGIN.m_14, MARGIN.m_14, MARGIN.m_0, MARGIN.m_0)
  },
  containerDoiQua: {
    flex: 1,
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  }
});

export {giftStyle};
