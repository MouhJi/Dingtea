import {StyleSheet} from 'react-native';

import {
  COLOR,
  FONT_SIZE,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius
} from 'bases/styles/Core';

const scanStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    alignItems: 'center',
    ...setPadding(PADDING.p_0, PADDING.p_16, PADDING.p_0, PADDING.p_0)
  },
  text: {
    fontSize: FONT_SIZE.s_20,
    color: COLOR.TEXT.BLACK,
    ...setMargin(MARGIN.m_20, MARGIN.m_6, MARGIN.m_0, MARGIN.m_0)
  },
  textHuongdan: {
    ...setMargin(MARGIN.m_10, MARGIN.m_20, MARGIN.m_0, MARGIN.m_0)
  },
  btnBarCode: {
    ...setMargin(MARGIN.m_24, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  }
});

const stylesModal = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.BLACK_30,
    flex: 1,
    justifyContent: 'flex-end'
  },
  containerToolbar: {
    backgroundColor: 'transparent'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...setPadding(PADDING.p_8, PADDING.p_8, PADDING.p_8, PADDING.p_8),
    ...setRadius(RADIUS.r_16, RADIUS.r_16, RADIUS.r_0, RADIUS.r_0)
  },
  iconClose: {
    position: 'absolute',
    top: PADDING.p_16,
    right: PADDING.p_16
  }
});

export {scanStyles, stylesModal};
