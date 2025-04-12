import React from 'react';
import {TextStyle, TouchableOpacity, TouchableOpacityProps, StyleSheet} from 'react-native';
import {IconProps} from 'react-native-vector-icons/Icon';

import {LAYOUT, RADIUS, setRadius, FONT_FAMILY, FONT_SIZE, setShadow} from '../../styles/Core';
import {MyText, IPropsMyText} from '../textview';
import {FontType, MyIcon} from '../icon';
import MyTheme from 'utils/MyTheme';

interface IPopsMyButton extends TouchableOpacityProps {
  children?: React.ReactNode;
  transparent?: boolean;
}

export const MyButton = (props: IPopsMyButton) => {
  const {children, transparent, style} = props;
  let styleOfView = {};
  let transparentStyle = {};
  if (style) {
    styleOfView = style;
  }
  if (transparent) {
    transparentStyle = {backgroundColor: 'transparent'};
  }
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      {...props}
      style={[styles.container, styleOfView, transparentStyle]}>
      {children}
    </TouchableOpacity>
  );
};

export const MyButtonShadow = (props: IPopsMyButton) => {
  const {children, transparent, style} = props;
  let styleOfView = {};
  let transparentStyle = {};
  if (style) {
    styleOfView = style;
  }
  if (transparent) {
    transparentStyle = {backgroundColor: 'transparent'};
  }
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      {...props}
      style={[styles.containerShadow, styleOfView, transparentStyle]}>
      {children}
    </TouchableOpacity>
  );
};

interface IPropsMyButtonText extends TouchableOpacityProps {
  title: string;
  titleStyle?: TextStyle;
  titleProps?: IPropsMyText;
}

export const MyButtonText = (props: IPropsMyButtonText) => {
  const {style, title, titleProps, titleStyle} = props;

  return (
    <TouchableOpacity activeOpacity={0.9} {...props} style={[styles.buttonText, style]}>
      <MyText {...titleProps} style={[styles.title, titleStyle]} fontStyle="Bold">
        {title}
      </MyText>
    </TouchableOpacity>
  );
};

export const MyButtonTextBorder = (props: IPropsMyButtonText) => {
  const {style, title, titleProps, titleStyle} = props;

  return (
    <TouchableOpacity activeOpacity={0.9} {...props} style={[styles.buttonTextBorder, style]}>
      <MyText {...titleProps} style={[styles.titleBorder, titleStyle]} fontStyle="Bold">
        {title}
      </MyText>
    </TouchableOpacity>
  );
};

interface IPropsMyButtonIcon extends TouchableOpacityProps {
  iconFontType: FontType;
  iconProps: IconProps;
}

/**
 ** size default '18'
 *
 */
export const MyButtonIcon = (props: IPropsMyButtonIcon) => {
  const {iconFontType, iconProps} = props;
  return (
    <TouchableOpacity {...props}>
      <MyIcon iconFontType={iconFontType} size={18} {...iconProps} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  containerShadow: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setShadow()
  },

  buttonText: {
    backgroundColor: MyTheme.themes.BG.PRIMARY_DARK,
    height: LAYOUT.l_38,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: MyTheme.themes.TEXT.WHITE,
    fontFamily: FONT_FAMILY.SemiBold,
    fontSize: FONT_SIZE.s_14
  },

  buttonTextBorder: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    height: LAYOUT.l_32,
    borderColor: MyTheme.themes.BG.PRIMARY_DARK,
    borderWidth: 1,
    ...setRadius(RADIUS.r_4, RADIUS.r_4, RADIUS.r_4, RADIUS.r_4),
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleBorder: {
    color: MyTheme.themes.TEXT.PRIMARY_DARK,
    fontSize: FONT_SIZE.s_14
  }
});
