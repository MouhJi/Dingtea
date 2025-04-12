import {StyleSheet} from 'react-native';

import {
  COLOR,
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

const copyInputStyles = StyleSheet.create({
  container: {
    ...setMargin(MARGIN.m_8, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16)
  },
  title: {
    color: COLOR.TEXT.BLACK,
    ...setMargin(MARGIN.m_0, MARGIN.m_8, MARGIN.m_0, MARGIN.m_0)
  },
  content: {
    color: COLOR.TEXT.BLACK,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_10, MARGIN.m_10),
    flex: 1
  },
  boxCopy: {
    height: LAYOUT.l_40,
    borderRadius: RADIUS.r_8,
    borderColor: COLOR.BG.BLACK,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnCopy: {
    height: LAYOUT.l_40,
    ...setRadius(RADIUS.r_0, RADIUS.r_8, RADIUS.r_0, RADIUS.r_8),
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_8, PADDING.p_8),
    marginRight: -1
  }
});

const bankStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.SECONDARY,
    flex: 1
  },
  bottomButton: {
    ...setMargin(MARGIN.m_10, MARGIN.m_10, MARGIN.m_16, MARGIN.m_16),
    height: LAYOUT.l_48
  },
  safeView: {
    backgroundColor: COLOR.BG.WHITE,
    ...setShadow()
  },
  nameBank: {
    fontSize: FONT_SIZE.s_16,
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16),
    alignSelf: 'center'
  }
});

export {copyInputStyles, bankStyle};
