import {StyleSheet} from 'react-native';
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
import Utilities from 'utils/Utilities';
import MyTheme from 'utils/MyTheme';

const searchComponentStyles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.PRIMARY,
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_10, PADDING.p_10),
    ...setRadius(RADIUS.r_4, RADIUS.r_4, RADIUS.r_4, RADIUS.r_4)
  },
  icon: {
    fontSize: FONT_SIZE.s_14,
    color: MyTheme.themes.TEXT.SECONDARY_LIGHT
  },
  title: {
    color: MyTheme.themes.TEXT.SECONDARY_LIGHT,
    ...setPadding(PADDING.p_8, PADDING.p_8, PADDING.p_10, PADDING.p_10)
  }
});

const slideBannerStyles = StyleSheet.create({
  container: {
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_0, PADDING.p_0),
    backgroundColor: MyTheme.themes.BG.SECONDARY
  },
  image: {
    width: Utilities.getWidthScreen() - PADDING.p_32
  },
  slider: {
    backgroundColor: 'transparent'
  },
  styleContainerImage: {
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16)
  },
  background: {
    position: 'absolute',
    backgroundColor: MyTheme.themes.BG.SECONDARY
  },
  contentBtn: {
    ...setMargin(MARGIN.m_16, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16),
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const listMenuComponent = StyleSheet.create({
  container: {
    ...setPadding(PADDING.p_14, PADDING.p_14, PADDING.p_16, PADDING.p_16)
  },
  content: {
    flexDirection: 'row',
    ...setPadding(PADDING.p_2, PADDING.p_0, PADDING.p_0, PADDING.p_0)
  },
  content2: {
    flexDirection: 'row',
    ...setPadding(PADDING.p_8, PADDING.p_0, PADDING.p_0, PADDING.p_0)
  },
  containerBtnAll: {
    flex: 1,
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_0, PADDING.p_0)
  },
  containerBtn: {
    height: LAYOUT.l_50,
    justifyContent: 'center'
  },
  contentBtn: {
    backgroundColor: MyTheme.themes.BG.PRIMARY,
    width: LAYOUT.l_30,
    height: LAYOUT.l_30,
    alignSelf: 'center',
    justifyContent: 'center',
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10)
  },
  icon: {
    fontSize: FONT_SIZE.s_14,
    color: MyTheme.themes.TEXT.WHITE,
    alignSelf: 'center'
  },
  textAll: {
    textAlign: 'center',
    fontSize: FONT_SIZE.s_11,
    ...setMargin(MARGIN.m_4, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  }
});

const productHotStyles = StyleSheet.create({
  container: {
    ...setPadding(PADDING.p_6, PADDING.p_6, PADDING.p_0, PADDING.p_0)
  },
  title: {
    fontSize: FONT_SIZE.s_16,
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16)
  },
  containerList: {
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  itemSeparator: {
    width: LAYOUT.l_16
  },

  viewEmpty: {
    flexDirection: 'row'
  }
});

const giftStyles = StyleSheet.create({
  container: {
    ...setPadding(PADDING.p_8, PADDING.p_8, PADDING.p_0, PADDING.p_0)
  },
  title: {
    fontSize: FONT_SIZE.s_16,
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16)
  },
  containerList: {
    ...setPadding(PADDING.p_6, PADDING.p_0, PADDING.p_6, PADDING.p_6)
  },
  itemSeparator: {
    width: LAYOUT.l_16
  },
  containerBtnAll: {
    width: LAYOUT.l_70,
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_0, PADDING.p_0)
  }
});

const blogStyles = StyleSheet.create({
  container: {
    ...setPadding(PADDING.p_14, PADDING.p_14, PADDING.p_0, PADDING.p_0),
    backgroundColor: MyTheme.themes.BG.SECONDARY
  },
  title: {
    fontSize: FONT_SIZE.s_16,
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16)
  },
  containerList: {
    alignItems: 'center',
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  itemSeparator: {
    width: LAYOUT.l_16,
    backgroundColor: MyTheme.themes.BG.SECONDARY
  },
  containerBtnAll: {
    width: LAYOUT.l_70,
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_0, PADDING.p_0),
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_0)
  }
});

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyTheme.themes.BG.SECONDARY
  },
  title: {
    fontSize: FONT_SIZE.s_16,
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16),
    ...setMargin(MARGIN.m_0, MARGIN.m_16, MARGIN.m_0, MARGIN.m_0)
  },
  itemProduct: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    flex: 1
  },
  itemSeparator: {
    height: LAYOUT.l_10
  },
  contentList: {
    ...setPadding(PADDING.p_0, Utilities.getResolutionByHeight(100), PADDING.p_0, PADDING.p_0),
    backgroundColor: MyTheme.themes.BG.SECONDARY
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

const cartComponent = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_16, PADDING.p_16)
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setRadius(RADIUS.r_4, RADIUS.r_4, RADIUS.r_4, RADIUS.r_4),
    height: LAYOUT.l_35
  },
  textDish: {
    textTransform: 'lowercase',
    fontSize: FONT_SIZE.s_12,
    color: MyTheme.themes.TEXT.WHITE
  },
  textCart: {
    fontSize: FONT_SIZE.s_12,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  },
  iconClose: {
    alignSelf: 'center',
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_6),
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10)
  },
  containerView: {
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16),
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  }
});

export {
  searchComponentStyles,
  slideBannerStyles,
  listMenuComponent,
  productHotStyles,
  giftStyles,
  blogStyles,
  homeStyles,
  cartComponent
};
