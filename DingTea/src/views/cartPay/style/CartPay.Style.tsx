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
import MyTheme from 'utils/MyTheme';

const buttonBottomStyles = StyleSheet.create({
  safeView: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setShadow()
  },
  bottomButton: {
    ...setMargin(MARGIN.m_8, MARGIN.m_8, MARGIN.m_8, MARGIN.m_8)
  },
  bottomButtonOrder: {
    ...setMargin(MARGIN.m_8, MARGIN.m_2, MARGIN.m_8, MARGIN.m_8),
    height: LAYOUT.l_48
  },
  button: {
    ...setMargin(MARGIN.m_8, MARGIN.m_8, MARGIN.m_8, MARGIN.m_8),
    flex: 1,
    borderColor: MyTheme.themes.BG.PRIMARY_DARK
  },
  buttonDisable: {
    ...setMargin(MARGIN.m_8, MARGIN.m_8, MARGIN.m_8, MARGIN.m_8),
    flex: 1,
    borderColor: MyTheme.themes.TEXT.SECONDARY_LIGHT
  },
  titleStyle: {
    color: MyTheme.themes.BG.PRIMARY_DARK
  },
  titleStyleDisable: {
    color: MyTheme.themes.TEXT.SECONDARY_LIGHT
  },
  viewButton: {
    flexDirection: 'row'
  },
  textButton: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_8, MARGIN.m_8),
    ...setPadding(PADDING.p_4, PADDING.p_4, PADDING.p_0, PADDING.p_0),
    textAlign: 'center',
    color: MyTheme.themes.TEXT.POSITIVE_BTN
  }
});

const cartPayStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentView: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_0, RADIUS.r_0),
    ...setPadding(PADDING.p_8, PADDING.p_8, PADDING.p_0, PADDING.p_0)
  },
  viewTextGiamGia: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_16),
    alignSelf: 'center'
  },
  iconSecond: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_10, MARGIN.m_0),
    alignSelf: 'center'
  },
  textTitle: {
    fontSize: FONT_SIZE.s_12,
    color: MyTheme.themes.TEXT.PRIMARY,
    flex: 1
  },
  textTitlePrime: {
    fontSize: FONT_SIZE.s_12,
    color: MyTheme.themes.TEXT.PRIMARY
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
    ...setPadding(PADDING.p_10, PADDING.p_16, PADDING.p_0, PADDING.p_0),
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

  myViewFooter: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_0, RADIUS.r_0, RADIUS.r_8, RADIUS.r_8),
    ...setPadding(PADDING.p_0, PADDING.p_16, PADDING.p_0, PADDING.p_0)
  },
  titleGiamGia: {
    ...setMargin(MARGIN.m_10, MARGIN.m_4, MARGIN.m_16, MARGIN.m_16)
  },
  viewChonGiamGia: {
    ...setMargin(MARGIN.m_0, MARGIN.m_4, MARGIN.m_16, MARGIN.m_16),
    ...setPadding(PADDING.p_4, PADDING.p_4, PADDING.p_0, PADDING.p_0),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  chonGiamGia: {
    color: MyTheme.themes.TEXT.ORANGE,
    textDecorationLine: 'underline',
    ...setPadding(PADDING.p_2, PADDING.p_4, PADDING.p_0, PADDING.p_0)
  },
  tongGia: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setMargin(MARGIN.m_10, MARGIN.m_10, MARGIN.m_16, MARGIN.m_16)
  },
  chuThichVoucher: {
    fontSize: FONT_SIZE.s_12,
    ...setMargin(MARGIN.m_8, MARGIN.m_10, MARGIN.m_16, MARGIN.m_16)
  },

  viewItemGiamGiaContainer: {
    ...setMargin(MARGIN.m_0, MARGIN.m_4, MARGIN.m_16, MARGIN.m_16),
    ...setPadding(PADDING.p_4, PADDING.p_4, PADDING.p_0, PADDING.p_0),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nameItemGiamGia: {
    color: MyTheme.themes.TEXT.ORANGE,
    textDecorationLine: 'underline',
    ...setPadding(PADDING.p_2, PADDING.p_4, PADDING.p_0, PADDING.p_0),
    flex: 3
  },
  deleteGiamGia: {
    color: MyTheme.themes.TEXT.PRIMARY,
    textDecorationLine: 'underline',
    ...setPadding(PADDING.p_2, PADDING.p_4, PADDING.p_8, PADDING.p_8),
    flex: 1
  },
  viewTextGiamGiaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    justifyContent: 'space-between'
  },
  viewPriceGiamGia: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end'
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
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  input: {
    ...setMargin(MARGIN.m_2, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    height: LAYOUT.l_86,
    textAlignVertical: 'top'
  }
});

export {buttonBottomStyles, cartPayStyles, ghiChuStyles};
