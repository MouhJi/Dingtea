import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

import {TextMask, TextInputMaskProps} from 'react-native-masked-text';

import {PRICE_MASK} from 'common/Constants';
import {FONT_FAMILY, FONT_SIZE} from 'bases/styles/Core';
import MyTheme from 'utils/MyTheme';

export interface IPropsMyText extends TextProps {
  children?: any | null;
  fontStyle?: 'Regular' | 'Medium' | 'Bold' | 'SemiBold';
}
/**
 ** TextSize default '14'
 ** FontFamily default 'Medium'
 *
 */
export const MyText = (props: IPropsMyText) => {
  const {children, fontStyle} = props;
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

  return (
    <Text {...props} style={[styles.text, props.style, textStyle]} allowFontScaling={false}>
      {children}
    </Text>
  );
};

interface IPropsMask extends Omit<Partial<TextInputMaskProps>, 'children'>, IPropsMyText {
  text: number | 0;
  currency?: 'VND' | 'USD';
}

/**
 ** TextSize default '14'
 ** FontFamily default 'Medium'
 ** currency default 'VND'
 */
export const MyTextPriceMask = (props: IPropsMask) => {
  const {text, currency, fontStyle, style} = props;
  let money = String(text);
  let option = null;
  if (currency && currency !== 'VND') {
    /* cau hinh don vi sau dau phay la 2 ~ 100, 3 ~ 1000 */
    money = String(text * 100);
    option = PRICE_MASK[currency];
  } else {
    option = PRICE_MASK.VND;
  }
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

  return (
    <TextMask
      {...props}
      numberOfLines={1}
      allowFontScaling={false}
      value={money}
      style={[styles.text, style, textStyle]}
      type="money"
      options={option}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: MyTheme.themes.TEXT.PRIMARY,
    fontSize: FONT_SIZE.s_14
  }
});
