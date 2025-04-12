import {StyleSheet} from 'react-native';

import {
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
import Utilities from 'utils/Utilities';
import MyTheme from 'utils/MyTheme';

const orderDetailStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnMuaLai: {
    ...setMargin(MARGIN.m_10, MARGIN.m_10, MARGIN.m_16, MARGIN.m_16),
    height: LAYOUT.l_48
  },
  btnTitle: {
    fontSize: FONT_SIZE.s_12
  },
  centerLayoutBtn: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_8, MARGIN.m_8)
  },
  chonGiamGia: {
    ...setMargin(MARGIN.m_0, MARGIN.m_4, MARGIN.m_16, MARGIN.m_16),
    ...setPadding(PADDING.p_4, PADDING.p_4, PADDING.p_0, PADDING.p_0),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleVoucher: {
    flex: 1
  },
  codeOrders: {
    ...setMargin(MARGIN.m_6, MARGIN.m_14, MARGIN.m_16, MARGIN.m_16),
    alignContent: 'center',
    textAlign: 'center'
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
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setShadow()
  }
});

const cmtProduct = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.BLACK_30,
    flex: 1
  },
  contentScroll: {
    justifyContent: 'center',
    flex: 1
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16),
    alignItems: 'center'
  },
  content: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setPadding(PADDING.p_10, PADDING.p_16, PADDING.p_16, PADDING.p_16),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    width: Utilities.getWidthScreen() - PADDING.p_16 * 2
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewTextRating: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_4)
  },
  contentInput: {
    ...setMargin(MARGIN.m_10, MARGIN.m_10, MARGIN.m_0, MARGIN.m_0),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: MyTheme.themes.TEXT.SECONDARY,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    height: LAYOUT.l_140
  },
  viewRating: {
    backgroundColor: 'yellow',
    borderRadius: RADIUS.r_16
  },
  viewImage: {
    ...setMargin(MARGIN.m_0, MARGIN.m_16, MARGIN.m_0, MARGIN.m_0),
    flexDirection: 'row'
  },

  spaceUp: {
    flex: 1
  },
  bntPreview: {
    backgroundColor: MyTheme.themes.BG.PRIMARY_DARK,
    height: LAYOUT.l_48,
    ...setMargin(MARGIN.m_16, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  }
});
const cartOrderDetailStyles = StyleSheet.create({
  viewTextGiamGia: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_16),
    alignSelf: 'center'
  },
  textTitle: {
    fontSize: FONT_SIZE.s_12,
    color: MyTheme.themes.TEXT.BLACK,
    flex: 1
  },
  textTitlePrime: {
    fontSize: FONT_SIZE.s_12,
    color: MyTheme.themes.TEXT.BLACK
  },
  viewEditText: {
    flexDirection: 'row',
    ...setPadding(PADDING.p_8, PADDING.p_6, PADDING.p_16, PADDING.p_16)
  },
  detailOrder: {
    ...setRadius(RADIUS.r_0, RADIUS.r_32, RADIUS.r_0, RADIUS.r_32),
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_16, PADDING.p_16),
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    width: '80%'
  },
  contentList: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_0, PADDING.p_0),
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16)
  },
  item: {
    ...setPadding(PADDING.p_10, PADDING.p_0, PADDING.p_16, PADDING.p_16)
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: MyTheme.themes.TEXT.SECONDARY,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  },
  titleGiamGia: {
    ...setMargin(MARGIN.m_10, MARGIN.m_4, MARGIN.m_16, MARGIN.m_16)
  },
  tongGia: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setMargin(MARGIN.m_10, MARGIN.m_10, MARGIN.m_16, MARGIN.m_16)
  },
  chuThichVoucher: {
    fontSize: FONT_SIZE.s_12,
    ...setMargin(MARGIN.m_8, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  }
});

const ghiChuStyles = StyleSheet.create({
  container: {
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  },
  title: {
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  viewinput: {
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  input: {
    // ...setMargin(MARGIN.m_2, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_0, PADDING.p_0),
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_0, RADIUS.r_0, RADIUS.r_0, RADIUS.r_0),
    textAlignVertical: 'top'
    // height: LAYOUT.l_86
  }
});

export {orderDetailStyles, cmtProduct, cartOrderDetailStyles, ghiChuStyles};
