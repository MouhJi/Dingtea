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

const addressAddStyles = StyleSheet.create({
  list: {
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    ...setPadding(PADDING.p_8, PADDING.p_8, PADDING.p_16, PADDING.p_16)
  },
  titleInput: {
    ...setMargin(MARGIN.m_8, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  bottomButton: {
    ...setMargin(MARGIN.m_10, MARGIN.m_10, MARGIN.m_16, MARGIN.m_16),
    height: LAYOUT.l_48
  },
  container: {
    flex: 1
  },
  safeView: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setShadow()
  },
  viewinput: {
    borderWidth: 1,
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setMargin(MARGIN.m_8, MARGIN.m_8, MARGIN.m_0, MARGIN.m_0),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    borderColor: MyTheme.themes.BG.SECONDARY_DARK
  },

  pickType: {
    flexDirection: 'row',
    flex: 1
  },
  pick: {
    flexDirection: 'row',
    height: LAYOUT.l_38,
    alignItems: 'center',
    flex: 1
  }
});

const inputStyles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    height: LAYOUT.l_40,
    ...setMargin(MARGIN.m_8, MARGIN.m_8, MARGIN.m_0, MARGIN.m_0),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_10, PADDING.p_10),
    borderWidth: 1,
    borderColor: MyTheme.themes.BG.SECONDARY_DARK,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: MyTheme.themes.TEXT.PRIMARY
  }
});

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyTheme.themes.BG.BLACK_30
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16),
    alignItems: 'center'
  },
  content: {
    ...setRadius(RADIUS.r_16, RADIUS.r_16, RADIUS.r_16, RADIUS.r_16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_16, PADDING.p_16),
    maxHeight: '60%',
    width: Utilities.getWidthScreen() - PADDING.p_16 * 2
  },
  titleModal: {
    fontSize: FONT_SIZE.s_16,
    ...setPadding(PADDING.p_0, PADDING.p_10, PADDING.p_0, PADDING.p_0)
  },
  viewFlatList: {
    width: '100%'
  },
  titleList: {
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_0, PADDING.p_0),
    textAlign: 'center'
  },
  textCmt: {
    color: MyTheme.themes.TEXT.ORANGE,
    textDecorationLine: 'underline',
    ...setPadding(PADDING.p_6, PADDING.p_0, PADDING.p_6, PADDING.p_0),
    textAlign: 'center'
  },

  contentScroll: {
    justifyContent: 'center',
    flex: 1
  },

  spaceUp: {
    flex: 1
  }
});

export {addressAddStyles, inputStyles, modalStyles};
