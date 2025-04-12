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
  setRadius
} from 'bases/styles/Core';

const promotionStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    backgroundColor: COLOR.BG.PRIMARY
  },
  contentList: {
    backgroundColor: COLOR.BG.PRIMARY,
    ...setPadding(PADDING.p_0, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  itemSeparator: {
    height: LAYOUT.l_10
  },
  viewHeader: {
    ...setPadding(PADDING.p_16, PADDING.p_10, PADDING.p_0, PADDING.p_0)
  },
  totalPoint: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  btnFillter: {
    backgroundColor: COLOR.TEXT.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_8, MARGIN.m_0),
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6),
    height: LAYOUT.l_30,
    width: LAYOUT.l_30
  },
  viewSearch: {
    flexDirection: 'row',
    ...setMargin(MARGIN.m_20, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  viewInput: {
    backgroundColor: COLOR.TEXT.PLACEHOLDER,
    flex: 1,
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6),
    height: LAYOUT.l_30,
    justifyContent: 'center'
  },
  txtAll: {
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    fontSize: FONT_SIZE.s_16
  },
  textPromotion: {
    fontSize: FONT_SIZE.s_10,
    color: COLOR.TEXT.DA_CAM,
    borderWidth: 2,
    borderColor: COLOR.TEXT.DA_CAM,
    borderRadius: RADIUS.r_4,
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    ...setMargin(MARGIN.m_16, MARGIN.m_0, MARGIN.m_0, MARGIN.m_8),
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  contentPromotion: {
    flexDirection: 'row',
    minHeight: LAYOUT.l_18
  },
  txtUnselect: {
    color: COLOR.TEXT.SECONDARY,
    borderColor: COLOR.TEXT.SECONDARY
  }
});

const modalGift = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.BLACK_30,
    flex: 1,
    justifyContent: 'flex-end'
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
  bottomButtonFillter: {
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16)
  },
  viewModal: {
    backgroundColor: COLOR.BG.WHITE,
    height: '75%',
    ...setRadius(RADIUS.r_16, RADIUS.r_16, RADIUS.r_0, RADIUS.r_0)
  },
  contentList: {
    ...setPadding(PADDING.p_6, PADDING.p_16, PADDING.p_6, PADDING.p_6)
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleItem: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_10, MARGIN.m_10)
  }
});

export {promotionStyles, modalGift};
