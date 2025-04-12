import React, {PureComponent} from 'react';

import {StyleSheet, Text, TextProps} from 'react-native';
import {FONT_FAMILY, FONT_SIZE, MARGIN} from 'bases/styles/Core';
import MyTheme from 'utils/MyTheme';

interface IProps extends TextProps {
  text: string;
}

export default class MyDescriptionInDialog extends PureComponent<IProps> {
  static displayName = 'MyDescriptionInDialog';

  render() {
    const {style, text, ...props} = this.props;
    return (
      <Text style={[styles.text, style]} {...props}>
        {text}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: MyTheme.themes.TEXT.PRIMARY,
    fontSize: FONT_SIZE.s_14,
    marginTop: MARGIN.m_16,
    fontFamily: FONT_FAMILY.Regular
  }
});
