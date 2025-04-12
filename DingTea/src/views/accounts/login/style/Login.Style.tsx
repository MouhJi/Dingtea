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

const LoginStyle = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    flex: 1
  },
  contentScroll: {
    // justifyContent: 'center',
    flex: 1
  },
  spaceUp: {
    flex: 1
  },
  close: {
    alignSelf: 'center'
  },
  btnClose: {
    width: LAYOUT.l_50,
    height: LAYOUT.l_50,
    justifyContent: 'center',
    top: 0,
    left: 0,
    zIndex: 999
  },

  viewForm: {
    // backgroundColor: MyTheme.themes.BG.SECONDARY_WHITE,
    ...setMargin(MARGIN.m_40, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    ...setRadius(RADIUS.r_15, RADIUS.r_15, RADIUS.r_15, RADIUS.r_15),
    ...setPadding(PADDING.p_8, PADDING.p_64, PADDING.p_0, PADDING.p_0)
  },
  btnLogin: {
    height: LAYOUT.l_45,
    ...setMargin(MARGIN.m_30, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    backgroundColor: MyTheme.themes.BG.PRIMARY_DARK
  },
  btnResend: {
    ...setMargin(MARGIN.m_8, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    height: LAYOUT.l_45,
    backgroundColor: 'transparent'
  },
  txtResend: {
    // color: MyTheme.themes.TEXT.ORANGE,
    textDecorationLine: 'underline'
  },
  viewinputTwo: {
    height: LAYOUT.l_45,
    justifyContent: 'center',
    flex: 1
  },
  viewinput: {
    height: LAYOUT.l_45,
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    ...setMargin(MARGIN.m_8, MARGIN.m_8, MARGIN.m_0, MARGIN.m_0),
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6),
    borderColor: MyTheme.themes.TEXT.SECONDARY_LIGHT
  },

  textCmt: {
    color: MyTheme.themes.TEXT.ORANGE,
    textDecorationLine: 'underline',
    ...setPadding(PADDING.p_6, PADDING.p_0, PADDING.p_6, PADDING.p_6),
    height: LAYOUT.l_45
  },
  textTitle: {
    ...setPadding(PADDING.p_6, PADDING.p_0, PADDING.p_6, PADDING.p_6),
    height: LAYOUT.l_45
  },

  viewImage: {
    alignSelf: 'center',
    ...setMargin(MARGIN.m_16, MARGIN.m_64, MARGIN.m_0, MARGIN.m_0)
  },
  viewTextLogin: {
    flexDirection: 'row',
    ...setMargin(MARGIN.m_24, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    height: LAYOUT.l_45,
    textAlign: 'center',
    justifyContent: 'center'
  },
  viewWellcome: {
    ...setMargin(MARGIN.m_28, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  },
  txtDingteaSay: {
    fontSize: FONT_SIZE.s_12,
    color: MyTheme.themes.TEXT.SECONDARY,
    ...setMargin(MARGIN.m_16, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  viewName: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setMargin(MARGIN.m_8, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  txtName: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_8)
  },
  viewInputLogin: {
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    ...setMargin(MARGIN.m_16, MARGIN.m_8, MARGIN.m_0, MARGIN.m_0),
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6),
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_0, PADDING.p_16),
    borderColor: MyTheme.themes.TEXT.SECONDARY_LIGHT,
    alignItems: 'center'
  },
  txtContry: {
    color: MyTheme.themes.TEXT.SECONDARY
    // ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_16)
    // ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_0, PADDING.p_16)
  },
  btnContry: {
    backgroundColor: 'transparent',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: MyTheme.themes.TEXT.SECONDARY,
    height: LAYOUT.l_45,
    ...setRadius(RADIUS.r_0, RADIUS.r_0, RADIUS.r_0, RADIUS.r_0),
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_8, PADDING.p_8)
  }
});
export default LoginStyle;
