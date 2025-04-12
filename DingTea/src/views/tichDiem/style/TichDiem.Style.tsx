import {
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
import MyTheme from 'utils/MyTheme';
import Utilities from 'utils/Utilities';

const tichDiemStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyTheme.themes.BG.WHITE
  }
});

const tabtichDiemStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyTheme.themes.BG.SECONDARY
  },
  background: {
    position: 'absolute',
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  viewheader: {
    flexDirection: 'row',
    ...setMargin(MARGIN.m_16, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    justifyContent: 'space-between',
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  viewHeaderContainer: {
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  viewQACode: {
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    justifyContent: 'center',
    alignItems: 'center',
    ...setPadding(PADDING.p_20, PADDING.p_20, PADDING.p_0, PADDING.p_0),
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  txtName: {
    color: MyTheme.themes.TEXT.SECONDARY,
    ...setMargin(MARGIN.m_12, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  viewPoint: {
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    justifyContent: 'center',
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16),
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  viewRank: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtRank: {
    color: MyTheme.themes.TEXT.PRIMARY_DARK,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_10, MARGIN.m_0)
  },
  viewHolder: {
    backgroundColor: MyTheme.themes.BG.PRIMARY_LIGHT,
    position: 'absolute',
    height: '100%',
    width: '90%',
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  viewBody: {
    ...setMargin(MARGIN.m_16, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  processActive: {
    width: '100%',
    ...setMargin(MARGIN.m_12, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  txtTitle: {
    textDecorationLine: 'underline',
    color: MyTheme.themes.TEXT.ORANGE
  },
  containerDoiQua: {
    flex: 1,
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  containerUuDai: {
    flex: 1,
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setPadding(PADDING.p_0, PADDING.p_16, PADDING.p_16, PADDING.p_16),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setMargin(MARGIN.m_48, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16)
  },
  viewUuDai: {
    ...setMargin(MARGIN.m_40, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  list: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  contentList: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: MyTheme.themes.TEXT.SECONDARY,
    ...setMargin(MARGIN.m_14, MARGIN.m_14, MARGIN.m_0, MARGIN.m_0)
  },
  itemPhieuUuDai: {
    ...setMargin(MARGIN.m_14, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  }
});

const tabGiftStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyTheme.themes.BG.SECONDARY
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setMargin(MARGIN.m_40, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16)
  },
  txtTitle: {
    textDecorationLine: 'underline',
    color: MyTheme.themes.TEXT.ORANGE
  },
  txtNoiBat: {
    ...setMargin(MARGIN.m_16, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  },
  containerList: {
    alignItems: 'center',
    ...setPadding(PADDING.p_18, PADDING.p_0, PADDING.p_16, PADDING.p_16)
    // backgroundColor: MyTheme.themes.BG.WHITE
  },
  itemSeparator: {
    width: LAYOUT.l_16
  },
  containerBtnAll: {
    width: LAYOUT.l_70,
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_0, PADDING.p_0),
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_0),
    justifyContent: 'center'
  },
  containerBtn: {
    height: LAYOUT.l_50,
    justifyContent: 'center'
  },
  contentBtn: {
    backgroundColor: MyTheme.themes.TEXT.RED,
    width: LAYOUT.l_30,
    height: LAYOUT.l_30,
    alignSelf: 'center',
    justifyContent: 'center',
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10)
  },
  icon: {
    fontSize: FONT_SIZE.s_14,
    color: MyTheme.themes.TEXT.PRIMARY,
    alignSelf: 'center'
  },
  textAll: {
    textAlign: 'center',
    fontSize: FONT_SIZE.s_11,
    ...setMargin(MARGIN.m_4, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  containerShadow: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_0, PADDING.p_0),
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  line: {
    height: LAYOUT.l_1,
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  }
});
const tabVoucherStyles = StyleSheet.create({
  list: {
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  contentList: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setPadding(PADDING.p_16, PADDING.p_0, PADDING.p_16, PADDING.p_16)
  },
  itemSeparator: {
    height: LAYOUT.l_10
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
const stylesModal = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.BLACK_30,
    flex: 1
    // justifyContent: 'flex-end'
  },
  containerToolbar: {
    backgroundColor: 'transparent'
  },
  modalContainer: {
    justifyContent: 'center',
    backgroundColor: MyTheme.themes.BG.WHITE,
    alignItems: 'center',
    flex: 1
  },
  iconClose: {
    position: 'absolute',
    top: PADDING.p_16,
    right: PADDING.p_16
  },
  contentScroll: {
    justifyContent: 'center',
    flex: 1
  },
  spaceUp: {
    flex: 1
  },
  background: {
    position: 'absolute',
    alignSelf: 'center'
  },
  viewQACode: {
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_0, RADIUS.r_0),
    justifyContent: 'center',
    alignItems: 'center',
    ...setPadding(PADDING.p_20, PADDING.p_10, PADDING.p_0, PADDING.p_0),
    backgroundColor: MyTheme.themes.BG.WHITE,
    width: Utilities.getWidthScreen() - 32,
    ...setMargin(-MARGIN.m_25, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  },
  viewHeaderContainer: {
    ...setPadding(PADDING.p_0, PADDING.p_30, PADDING.p_16, PADDING.p_16),
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    height: Utilities.getResolutionByHeight(255),
    width: Utilities.getWidthScreen() - 32,
    ...setRadius(RADIUS.r_0, RADIUS.r_0, RADIUS.r_8, RADIUS.r_8),
    justifyContent: 'space-between'
  },
  imgLogo: {
    ...setRadius(RADIUS.r_0, RADIUS.r_0, RADIUS.r_8, RADIUS.r_8),
    ...setMargin(MARGIN.m_20, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    width: LAYOUT.l_70,
    height: LAYOUT.l_50
  },
  txtNote: {
    ...setMargin(MARGIN.m_20, MARGIN.m_10, MARGIN.m_0, MARGIN.m_0)
  },
  txtDingteaSay: {
    fontSize: FONT_SIZE.s_12,
    ...setMargin(MARGIN.m_16, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    maxWidth: Utilities.getWidthScreen() - 64
  }
});

export {tichDiemStyles, tabtichDiemStyle, tabGiftStyle, tabVoucherStyles, stylesModal};
