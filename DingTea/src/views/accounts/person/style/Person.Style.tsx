import {StyleSheet} from 'react-native';

import {
  FONT_FAMILY,
  FONT_SIZE,
  LAYOUT,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius
} from 'bases/styles/Core';
import MyTheme from 'utils/MyTheme';

const personStyles = StyleSheet.create({
  version: {textAlign: 'center', ...setMargin(MARGIN.m_16, MARGIN.m_16)},
  safeView: {
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  viewContainer: {
    flex: 1,
    backgroundColor: MyTheme.themes.BG.SECONDARY_DARK
  },
  container: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  containerTwo: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_0, PADDING.p_0),
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  person: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...setMargin(MARGIN.m_26, MARGIN.m_6, MARGIN.m_0, MARGIN.m_0),
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16)
  },
  imgAvatar: {
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6),
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  imageAvatar: {
    width: LAYOUT.l_40
  },
  image: {
    width: LAYOUT.l_38
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: MyTheme.themes.TEXT.SECONDARY,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  },
  viewTxt: {
    ...setPadding(PADDING.p_10, PADDING.p_6, PADDING.p_16, PADDING.p_16)
  },
  viewTxtRow: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(PADDING.p_10, PADDING.p_6, PADDING.p_16, PADDING.p_16)
  },
  txtPerson: {
    ...setPadding(PADDING.p_6, PADDING.p_6, PADDING.p_16, PADDING.p_16)
  },
  txtDate: {
    fontSize: FONT_SIZE.s_12
  },
  txtLogout: {
    color: MyTheme.themes.TEXT.RED,
    fontSize: FONT_SIZE.s_14,
    fontFamily: FONT_FAMILY.Bold
  },
  dot: {
    width: LAYOUT.l_5,
    height: LAYOUT.l_5,
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6),
    backgroundColor: MyTheme.themes.TEXT.RED,
    // backgroundColor: COLOR.BG.RED,

    position: 'absolute',
    right: 0,
    top: -2
  },
  viewUser: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  viewUserLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  viewDot: {
    flexDirection: 'row',
    height: '100%',
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16),
    alignItems: 'center'
  },
  nameUser: {
    justifyContent: 'center'
  },
  viewheader: {
    flexDirection: 'row',
    ...setMargin(MARGIN.m_16, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    justifyContent: 'space-between'
  },
  txtSupport: {
    ...setMargin(MARGIN.m_16, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  }
});

const avatarStyles = StyleSheet.create({
  footerDialog: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTopColor: '#A9ADAE',
    borderTopWidth: StyleSheet.hairlineWidth,
    height: LAYOUT.l_46 * 3
  },
  buttonSeparatorHoz: {
    height: StyleSheet.hairlineWidth * 1.00009,
    backgroundColor: '#A9ADAE',
    width: '100%'
  }
});

const inforPersonStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  containerTwo: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16),
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  imgAvatar: {
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6),
    backgroundColor: MyTheme.themes.BG.WHITE
    // ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_16)
  },
  imageAvatar: {
    width: LAYOUT.l_52
  },
  viewName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnUpdate: {
    backgroundColor: MyTheme.themes.BG.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setMargin(MARGIN.m_28, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  txtUpdate: {
    color: MyTheme.themes.TEXT.PRIMARY,
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_0, PADDING.p_0)
  },
  viewBody: {
    ...setMargin(MARGIN.m_16, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  viewinput: {
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    ...setMargin(MARGIN.m_12, MARGIN.m_20, MARGIN.m_0, MARGIN.m_0),
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6)
  },
  txtBirthday: {
    ...setPadding(PADDING.p_8, PADDING.p_8, PADDING.p_8, PADDING.p_0),
    color: MyTheme.themes.TEXT.SECONDARY
  },
  icon: {
    color: MyTheme.themes.TEXT.SECONDARY_LIGHT
  },
  viewIcon: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    right: -3,
    position: 'absolute',
    bottom: -3,
    ...setPadding(PADDING.p_2, PADDING.p_2, PADDING.p_4, PADDING.p_4),
    ...setRadius(RADIUS.r_2, RADIUS.r_2, RADIUS.r_2, RADIUS.r_2)
  },
  txtName: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_0)
  }
});

export {personStyles, avatarStyles, inforPersonStyle};
