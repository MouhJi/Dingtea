import React, {PureComponent} from 'react';

import {StyleSheet, Text, TextProps} from 'react-native';
import {FONT_FAMILY, FONT_SIZE} from 'bases/styles/Core';
import MyTheme from 'utils/MyTheme';

interface IProps extends TextProps {
  children: string;
}

export default class MyTitleInDialog extends PureComponent<IProps> {
  static displayName = 'MyTitleInDialog';

  render() {
    const {style, children, ...props} = this.props;
    return (
      <Text style={[styles.text, style]} {...props}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: MyTheme.themes.TEXT.PRIMARY,
    textAlign: 'center',
    fontSize: FONT_SIZE.s_16,
    fontFamily: FONT_FAMILY.Bold
  }
});
