import {
  COLOR,
  FONT_SIZE,
  LAYOUT,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius
} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

const searchStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    shadowColor: COLOR.BG.BLACK,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 100
  },
  content: {
    height: LAYOUT.l_50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  left: {
    backgroundColor: COLOR.BG.WHITE,
    width: LAYOUT.l_56,
    height: LAYOUT.l_50,
    justifyContent: 'center',
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_12, PADDING.p_0)
  },

  containerSearch: {
    flex: 1,
    ...setRadius(RADIUS.r_0, RADIUS.r_4, RADIUS.r_0, RADIUS.r_4)
  },
  contentSearch: {
    flex: 1,
    flexDirection: 'row',
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_16),
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_8, PADDING.p_0),
    ...setRadius(RADIUS.r_4, RADIUS.r_4, RADIUS.r_4, RADIUS.r_4),
    alignItems: 'center'
  },
  inputSearch: {
    height: LAYOUT.l_30
  },
  iconSearch: {
    fontSize: FONT_SIZE.s_14,
    color: COLOR.TEXT.SECONDARY
  },
  contentList: {
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  itemSeparator: {
    height: LAYOUT.l_10
  },
  contentView: {
    flex: 1
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

export {searchStyles};
