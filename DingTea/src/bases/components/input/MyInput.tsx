import React from 'react';
import {StyleProp, StyleSheet, TextInput, TextInputProps, ViewStyle} from 'react-native';

import {MyText} from '../textview';
import {MyView} from '../view';
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
} from '../../styles/Core';
import MyTheme from 'utils/MyTheme';

interface IProps extends TextInputProps {
  label?: any | null;
  inputRef?: React.Ref<any>;
  fontStyle?: 'Regular' | 'Medium' | 'Bold' | 'SemiBold';
  containerStyle?: StyleProp<ViewStyle>;
}

export const MyInput = (props: IProps) => {
  const {label, inputRef, fontStyle, containerStyle} = props;
  let textStyle = {};
  if (fontStyle) {
    textStyle = {
      fontFamily: FONT_FAMILY[fontStyle]
    };
  } else {
    textStyle = {
      fontFamily: FONT_FAMILY.Medium
    };
  }
  const labelView = label ? <MyText style={[styles.label, textStyle]}>{label}</MyText> : null;
  return (
    <MyView style={containerStyle}>
      {labelView}
      <TextInput
        placeholderTextColor={MyTheme.themes.TEXT.SECONDARY}
        focusable={false}
        autoCorrect={false}
        allowFontScaling={false}
        {...props}
        ref={inputRef}
        style={[styles.input, props.style, textStyle]}
      />
    </MyView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: FONT_SIZE.s_14,
    ...setMargin(MARGIN.m_0, MARGIN.m_6, MARGIN.m_0, MARGIN.m_0)
  },
  input: {
    color: MyTheme.themes.TEXT.PRIMARY,
    fontFamily: FONT_FAMILY.SemiBold,
    fontSize: FONT_SIZE.s_14,
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_10, PADDING.p_10),
    height: LAYOUT.l_38,
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6)
  }
});
