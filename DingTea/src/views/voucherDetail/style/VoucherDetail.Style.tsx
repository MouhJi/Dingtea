import {
  COLOR,
  setRadius,
  RADIUS,
  setMargin,
  MARGIN,
  setPadding,
  PADDING,
  FONT_SIZE,
  LAYOUT
} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

const detailVCStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  contentList: {
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16),
    ...setPadding(PADDING.p_0, PADDING.p_16, PADDING.p_0, PADDING.p_0)
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.TEXT.SECONDARY,
    ...setMargin(MARGIN.m_10, MARGIN.m_10, MARGIN.m_0, MARGIN.m_0)
  },
  containerText: {
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  titleBold: {
    ...setMargin(MARGIN.m_0, MARGIN.m_10, MARGIN.m_0, MARGIN.m_0)
  },
  containerTextTitle: {
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_16, PADDING.p_16),
    backgroundColor: COLOR.BG.WHITE,
    ...setRadius(RADIUS.r_0, RADIUS.r_16, RADIUS.r_0, RADIUS.r_0)
  },
  title: {
    fontSize: FONT_SIZE.s_14,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_10)
  },
  contentPromotion: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    minHeight: LAYOUT.l_18
  },
  textPromotion: {
    fontSize: FONT_SIZE.s_12,
    color: COLOR.TEXT.RED,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLOR.TEXT.RED,
    borderRadius: RADIUS.r_4,
    ...setPadding(PADDING.p_4, PADDING.p_4, PADDING.p_8, PADDING.p_8),
    ...setMargin(MARGIN.m_4, MARGIN.m_10, MARGIN.m_0, MARGIN.m_4)
  },
  txtExpirydate: {
    ...setMargin(MARGIN.m_8, MARGIN.m_0, MARGIN.m_0, MARGIN.m_4),
    fontSize: FONT_SIZE.s_12
  },
  containerError: {
    flex: 1,
    justifyContent: 'center',
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  txtAgain: {
    textAlign: 'center',
    fontSize: FONT_SIZE.s_16
  },
  btnAgain: {
    ...setMargin(MARGIN.m_20, MARGIN.m_0, MARGIN.m_20, MARGIN.m_20)
  },
  safeView: {
    backgroundColor: COLOR.BG.WHITE,
    shadowColor: COLOR.BG.BLACK,
    shadowOffset: {
      width: 0,
      height: -1
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 100
  },
  bottomButton: {
    ...setMargin(MARGIN.m_10, MARGIN.m_10, MARGIN.m_16, MARGIN.m_16),
    height: LAYOUT.l_48
  }
});

const itemStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    alignItems: 'center'
  },
  image: {
    width: LAYOUT.l_60,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  contentText: {
    flex: 1,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_10, MARGIN.m_0)
  },
  textApDung: {
    fontSize: FONT_SIZE.s_14,
    color: COLOR.TEXT.DA_CAM,
    alignSelf: 'flex-start',
    ...setPadding(PADDING.p_6, PADDING.p_0, PADDING.p_0, PADDING.p_20)
  },
  textHSD: {
    color: COLOR.TEXT.SECONDARY,
    fontSize: FONT_SIZE.s_12,
    ...setMargin(MARGIN.m_2, MARGIN.m_2, MARGIN.m_0, MARGIN.m_0)
  }
});
export {detailVCStyle, itemStyle};
