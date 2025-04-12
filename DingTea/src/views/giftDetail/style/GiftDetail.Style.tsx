import {setRadius, RADIUS, setMargin, MARGIN, setPadding, PADDING, LAYOUT} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';
import MyTheme from 'utils/MyTheme';
import Utilities from 'utils/Utilities';

const giftDetailStyles = StyleSheet.create({
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
  styleImage: {
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_0, MARGIN.m_0),
    alignSelf: 'center',
    backgroundColor: MyTheme.themes.BG.WHITE,
    width: Utilities.getWidthScreen() - PADDING.p_16 * 4,
    height: (Utilities.getWidthScreen() * 9) / 16
  },
  title: {
    ...setMargin(MARGIN.m_16, MARGIN.m_10, MARGIN.m_0, MARGIN.m_0)
  },
  txtPoint: {
    ...setMargin(MARGIN.m_0, MARGIN.m_16, MARGIN.m_0, MARGIN.m_0)
  },
  bottomButton: {
    ...setMargin(MARGIN.m_10, MARGIN.m_10, MARGIN.m_16, MARGIN.m_16),
    height: LAYOUT.l_48
  },
  safeView: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    shadowColor: MyTheme.themes.BG.BLACK,
    shadowOffset: {
      width: 0,
      height: -1
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 100
  }
});
export {giftDetailStyles};
