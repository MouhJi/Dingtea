import React, {PureComponent} from 'react';
import {StyleSheet, Text, TextProps, TouchableOpacity} from 'react-native';

import {FONT_FAMILY, FONT_SIZE} from 'bases/styles/Core';

interface IProps extends TextProps {
  label: string;
  color: string;
  disabled?: boolean;
  onPress: () => void;
}

export default class MyButtonInDialog extends PureComponent<IProps> {
  static displayName = 'MyButtonInDialog';

  render() {
    const {label, color, disabled = false, onPress, style, ...props} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.button}
        onPress={onPress}
        disabled={disabled}>
        <Text style={[styles.text, {color: color}, style]} {...props}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: FONT_SIZE.s_16,
    backgroundColor: 'transparent',
    fontFamily: FONT_FAMILY.Bold
  }
});
