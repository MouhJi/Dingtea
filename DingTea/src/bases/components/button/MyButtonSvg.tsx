import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import {SvgCss} from 'react-native-svg/css';

import {MyButtonShadow} from './MyButton';
import {MyText} from '../textview';
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

interface IProps {
  title: string;
  svgImage: string;
  onPress: () => void;
}

export default class MyButtonSvg extends PureComponent<IProps> {
  render() {
    const {svgImage, title, onPress} = this.props;
    return (
      <MyButtonShadow style={styles.container} onPress={onPress}>
        <SvgCss xml={svgImage} />
        <MyText style={styles.title} numberOfLines={1} fontStyle="Bold">
          {title}
        </MyText>
      </MyButtonShadow>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    width: (Utilities.getWidthScreen() - LAYOUT.l_16 * 3) / 2,
    ...setPadding(PADDING.p_14, PADDING.p_14, PADDING.p_16, PADDING.p_16),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  title: {
    flex: 1,
    ...setMargin(MARGIN.m_14, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    fontSize: FONT_SIZE.s_12
  }
});
