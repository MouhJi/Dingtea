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

const productDetailStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentList: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setMargin(MARGIN.m_16, Utilities.getResolutionByHeight(100), MARGIN.m_16, MARGIN.m_16),
    ...setPadding(PADDING.p_0, PADDING.p_10, PADDING.p_0, PADDING.p_0)
  },
  contentListEdit: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_16, RADIUS.r_16, RADIUS.r_16, RADIUS.r_16),
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16),
    ...setPadding(PADDING.p_0, PADDING.p_10, PADDING.p_0, PADDING.p_0)
  },
  safeView: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setShadow()
  },
  viewHeader: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_16, RADIUS.r_16, RADIUS.r_0, RADIUS.r_0)
  },
  bottomButton: {
    ...setMargin(MARGIN.m_10, MARGIN.m_10, MARGIN.m_16, MARGIN.m_16),
    height: LAYOUT.l_48
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: MyTheme.themes.TEXT.SECONDARY,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  },
  title: {
    ...setMargin(MARGIN.m_16, MARGIN.m_4, MARGIN.m_16, MARGIN.m_16)
  },
  titleSecond: {
    textDecorationLine: 'underline',
    ...setPadding(PADDING.p_10, PADDING.p_6, PADDING.p_0, PADDING.p_0)
  },
  viewinput: {
    backgroundColor: 'transparent'
  },
  input: {
    ...setMargin(MARGIN.m_2, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_0, PADDING.p_0)
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
    ...setMargin(MARGIN.m_20, MARGIN.m_0, MARGIN.m_20, MARGIN.m_20),
    height: LAYOUT.l_48
  }
});

const slideBannerStyles = StyleSheet.create({
  container: {
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_0, PADDING.p_0),
    ...setRadius(RADIUS.r_16, RADIUS.r_16, RADIUS.r_0, RADIUS.r_0),
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  image: {
    width: Utilities.getWidthScreen() - PADDING.p_16 * 4
  },
  slider: {
    backgroundColor: 'transparent'
  },
  styleContainerImage: {
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16)
  },
  styleImage: {
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10)
  },
  styleViewDiscount: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    width: LAYOUT.l_40,
    height: LAYOUT.l_40,
    ...setRadius(RADIUS.r_32, RADIUS.r_32, RADIUS.r_32, RADIUS.r_32),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    ...setMargin(MARGIN.m_26, MARGIN.m_26, MARGIN.m_26, MARGIN.m_26)
  },
  styleDiscount: {
    color: MyTheme.themes.BG.PRIMARY_DARK
  },
  styleBar: {
    top: MARGIN.m_10
  }
});

const styleNameProduct = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  containerText: {
    ...setPadding(PADDING.p_0, PADDING.p_10, PADDING.p_16, PADDING.p_0),
    backgroundColor: 'green',
    ...setRadius(RADIUS.r_0, RADIUS.r_16, RADIUS.r_0, RADIUS.r_0),
    flex: 1
  },
  title: {
    fontSize: FONT_SIZE.s_14
  },
  titleStar: {
    fontSize: FONT_SIZE.s_14,
    color: MyTheme.themes.TEXT.BROWN
  },
  contentPrice: {
    flexDirection: 'row'
  },
  contentPromotion: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    minHeight: LAYOUT.l_18
  },
  price: {
    fontSize: FONT_SIZE.s_14,
    color: MyTheme.themes.TEXT.BLACK
  },
  textPromotion: {
    fontSize: FONT_SIZE.s_10,
    color: MyTheme.themes.TEXT.PRIMARY_LIGHT,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: MyTheme.themes.TEXT.PRIMARY_LIGHT,
    borderRadius: RADIUS.r_4,
    ...setPadding(PADDING.p_4, PADDING.p_4, PADDING.p_6, PADDING.p_6),
    ...setMargin(MARGIN.m_4, MARGIN.m_0, MARGIN.m_0, MARGIN.m_4)
  },
  textHetHang: {
    color: MyTheme.themes.TEXT.SECONDARY,
    borderColor: MyTheme.themes.TEXT.SECONDARY
  },
  priceOrigin: {
    textDecorationLine: 'line-through',
    alignSelf: 'flex-end',
    fontSize: FONT_SIZE.s_11,
    color: MyTheme.themes.TEXT.PRIMARY,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_8, MARGIN.m_0)
  },
  btnHeart: {
    ...setPadding(PADDING.p_4, PADDING.p_4, PADDING.p_6, PADDING.p_6),
    ...setMargin(MARGIN.m_0, MARGIN.m_6, MARGIN.m_8, MARGIN.m_10),
    alignSelf: 'flex-end'
  },

  containerHide: {
    flexDirection: 'row'
  },
  containerTextHide: {
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_26, PADDING.p_0),
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_0, RADIUS.r_16, RADIUS.r_0, RADIUS.r_0),
    flex: 1
  },
  textHide: {
    color: MyTheme.themes.BG.WHITE,
    borderColor: MyTheme.themes.BG.WHITE,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_4)
  }
});

const titleDetailProduct = StyleSheet.create({
  container: {
    ...setMargin(MARGIN.m_10, MARGIN.m_6, MARGIN.m_16, MARGIN.m_16)
  },
  title: {
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  }
});

const soLuongStyles = StyleSheet.create({
  qtyView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_6)
  },
  qtyViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  plusButton: {
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    alignSelf: 'center'
  },
  minusButton: {
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    alignSelf: 'center'
  },
  txtSoluong: {
    width: LAYOUT.l_30,
    textAlign: 'center'
  }
});

const itemTextStyles = StyleSheet.create({
  viewTitleItem: {
    ...setRadius(RADIUS.r_0, RADIUS.r_32, RADIUS.r_0, RADIUS.r_32),
    ...setMargin(MARGIN.m_12, MARGIN.m_6, MARGIN.m_0, MARGIN.m_0),
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_16, PADDING.p_16),
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    width: '80%'
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_0)
  },
  viewCheck: {
    ...setPadding(PADDING.p_5, PADDING.p_5, PADDING.p_16, PADDING.p_16),
    alignSelf: 'center'
  },
  viewTextPrice: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textType: {
    fontSize: FONT_SIZE.s_9,
    ...setPadding(PADDING.p_4, PADDING.p_4, PADDING.p_0, PADDING.p_0),
    ...setRadius(RADIUS.r_4, RADIUS.r_4, RADIUS.r_4, RADIUS.r_4),
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    borderRadius: RADIUS.r_4,
    overflow: 'hidden',
    width: LAYOUT.l_20,
    textAlign: 'center'
  },
  price: {
    fontSize: FONT_SIZE.s_14,
    color: MyTheme.themes.TEXT.PRIMARY,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_8, MARGIN.m_0)
  },
  priceOrigin: {
    textDecorationLine: 'line-through',
    alignSelf: 'flex-end',
    fontSize: FONT_SIZE.s_11,
    color: MyTheme.themes.TEXT.PRIMARY,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_8, MARGIN.m_0)
  },

  qtyView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_6)
  },
  qtyViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  plusButton: {
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    alignSelf: 'center'
  },
  minusButton: {
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    alignSelf: 'center'
  },
  priceTopping: {
    fontSize: FONT_SIZE.s_12,
    color: MyTheme.themes.TEXT.PRIMARY
  },
  priceToppingOrigin: {
    fontSize: FONT_SIZE.s_9,
    color: MyTheme.themes.TEXT.PRIMARY,
    textDecorationLine: 'line-through',
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_4, MARGIN.m_0)
  },

  txtSoluong: {
    width: LAYOUT.l_30,
    textAlign: 'center'
  }
});

export {
  productDetailStyles,
  slideBannerStyles,
  styleNameProduct,
  titleDetailProduct,
  soLuongStyles,
  itemTextStyles
};
