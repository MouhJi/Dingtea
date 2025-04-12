import {FONT_FAMILY, FONT_SIZE, MARGIN, PADDING, RADIUS} from 'bases/styles/Core';
import React, {PureComponent} from 'react';

import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import MyTheme from 'utils/MyTheme';
import Utilities from 'utils/Utilities';

interface IProps extends TextInputProps {
  label?: string;
  style?: any;
  textInputRef?: any;
  wrapperStyle?: any;
  numberOfLines?: number;
  multiline?: boolean;
  autoFocus?: boolean;
}

export default class MyInputInDialog extends PureComponent<IProps> {
  static displayName = 'MyInputInDialog';

  render() {
    const {
      label,
      style,
      wrapperStyle,
      textInputRef,
      multiline,
      numberOfLines,
      autoFocus,
      ...otherProps
    } = this.props;
    const lines = (multiline && numberOfLines) || 1;
    let height = 18 + 18 * lines;
    if (Utilities.isAndroid()) {
      height = 18 + 22 * lines;
    }
    return (
      <View style={[styles.textInputWrapper, wrapperStyle]}>
        {label ? (
          <Text style={Utilities.isAndroid() ? styles.labelAndroid : styles.labelIos}>{label}</Text>
        ) : null}
        <TextInput
          ref={textInputRef}
          style={[
            Utilities.isAndroid() ? styles.textInputAndroid : styles.textInputIos,
            style,
            {height}
          ]}
          multiline={multiline}
          numberOfLines={numberOfLines}
          placeholderTextColor={'gray'}
          autoFocus={autoFocus}
          {...otherProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputWrapper: {
    backgroundColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: RADIUS.r_4,
    borderColor: '#A9ADAE',
    marginHorizontal: MARGIN.m_20,
    marginBottom: MARGIN.m_16,
    paddingHorizontal: PADDING.p_8
  },
  labelIos: {
    marginTop: MARGIN.m_4
  },
  labelAndroid: {
    color: MyTheme.themes.BG.BLACK_30,
    fontSize: FONT_SIZE.s_14,
    marginTop: MARGIN.m_4
  },
  textInputIos: {
    color: MyTheme.themes.TEXT.PRIMARY,
    fontFamily: FONT_FAMILY.Regular,
    fontSize: FONT_SIZE.s_16
  },
  textInputAndroid: {
    marginLeft: -4,
    paddingLeft: PADDING.p_4,
    color: MyTheme.themes.TEXT.PRIMARY,
    fontFamily: FONT_FAMILY.Regular,
    fontSize: FONT_SIZE.s_16
  }
});
