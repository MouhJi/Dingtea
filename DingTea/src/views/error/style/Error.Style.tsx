import {COLOR, FONT_SIZE, MARGIN, PADDING, setMargin, setPadding} from 'bases/styles/Core';
import {StyleSheet} from 'react-native';

const errorStyles = StyleSheet.create({
  containerError: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE,
    justifyContent: 'center',
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
  },
  txtAgain: {
    textAlign: 'center',
    fontSize: FONT_SIZE.s_16,
    ...setMargin(MARGIN.m_8, MARGIN.m_8, MARGIN.m_0, MARGIN.m_0)
  },
  btnAgain: {
    ...setMargin(MARGIN.m_20, MARGIN.m_0, MARGIN.m_20, MARGIN.m_20)
  },
  activityIndicator: {
    ...setMargin(MARGIN.m_16, MARGIN.m_8, MARGIN.m_0, MARGIN.m_0)
  }
});

export {errorStyles};
