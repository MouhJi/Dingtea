import React from 'react';
import {StyleSheet, TouchableOpacityProps, TextProps, TextStyle, ViewStyle} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {IconProps} from 'react-native-vector-icons/Icon';

import {MyText} from '../textview';
import {MyView} from '../view';
import {FontType, MyIcon} from '../icon';
import {MyButton, MyButtonIcon} from '../button';

import {FONT_SIZE, LAYOUT, PADDING, setPadding, setShadow} from '../../styles/Core';

import MyNavigator from 'utils/MyNavigator';
import MyTheme from 'utils/MyTheme';

interface IToolbarProps {
  isShowBtnLeft?: boolean;
  iconLeftFontType?: FontType;
  iconLeftProps?: IconProps;
  onPressLeft?: () => void;
  buttonLeftProps?: TouchableOpacityProps;

  title?: string;
  titleStyle?: TextStyle;
  titleProps?: TextProps;
  isLongTitle?: boolean;

  isShowIconTitle?: boolean;
  iconTitleFontType?: FontType;
  iconTitleProps?: IconProps;

  isShowBtnRight?: boolean;
  iconRightFontType?: FontType;
  iconRightProps?: IconProps;
  onPressRight?: () => void;
  buttonRightProps?: TouchableOpacityProps;

  style?: ViewStyle;
  onPress?: () => void;
}

export const MyToolbar = (props: IToolbarProps) => {
  const {
    isShowBtnLeft,
    iconLeftFontType,
    iconLeftProps,

    onPressLeft,
    buttonLeftProps,

    title,
    titleStyle,
    titleProps,
    isLongTitle,

    isShowIconTitle,
    iconTitleFontType,
    iconTitleProps,

    isShowBtnRight,
    iconRightFontType,
    iconRightProps,

    onPressRight,
    buttonRightProps,

    style,
    onPress
  } = props;

  let _viewLeft = <MyView style={ToolbarCss.left} transparent />;
  if (isShowBtnLeft) {
    let leftFontType = iconLeftFontType ? iconLeftFontType : 'AntDesign';
    let leftFontProps = iconLeftProps
      ? iconLeftProps
      : {name: 'arrowleft', size: 26, color: MyTheme.themes.TEXT.PRIMARY};
    let pressLeft = onPressLeft ? onPressLeft : () => MyNavigator.goBack();
    _viewLeft = (
      <MyButtonIcon
        iconFontType={leftFontType}
        iconProps={leftFontProps}
        style={ToolbarCss.left}
        {...buttonLeftProps}
        onPress={pressLeft}
      />
    );
  }

  let _viewIconTitle = null;
  if (isShowIconTitle) {
    let titleFontType = iconTitleFontType ? iconTitleFontType : 'AntDesign';
    let titleFontProps = iconTitleProps
      ? iconTitleProps
      : {name: 'checkcircleo', size: 20, color: MyTheme.themes.TEXT.GREEN};
    _viewIconTitle = <MyIcon iconFontType={titleFontType} {...titleFontProps} />;
  }

  let _viewRight = null;
  if (!isLongTitle) {
    _viewRight = <MyView style={ToolbarCss.right} transparent />;
  }
  if (isShowBtnRight) {
    let rightFontType = iconRightFontType ? iconRightFontType : 'AntDesign';
    let rightFontProps = iconRightProps
      ? iconRightProps
      : {name: 'filter', size: 26, color: MyTheme.themes.TEXT.PRIMARY};
    _viewRight = (
      <MyButtonIcon
        iconFontType={rightFontType}
        iconProps={rightFontProps}
        style={ToolbarCss.right}
        {...buttonRightProps}
        onPress={onPressRight}
      />
    );
  }
  return (
    <SafeAreaView style={[ToolbarCss.container, style]} edges={['top']}>
      <MyButton onPress={onPress} activeOpacity={1} style={ToolbarCss.content} transparent>
        {_viewLeft}

        <MyText
          {...titleProps}
          numberOfLines={2}
          style={[isLongTitle ? ToolbarCss.titleLong : ToolbarCss.title, titleStyle]}
          fontStyle="Bold">
          {_viewIconTitle} {title}
        </MyText>

        {_viewRight}
      </MyButton>
    </SafeAreaView>
  );
};

const ToolbarCss = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setShadow()
  },
  content: {
    height: LAYOUT.l_50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  left: {
    width: LAYOUT.l_56,
    height: LAYOUT.l_50,
    justifyContent: 'center',
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_12, PADDING.p_0)
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZE.s_18,
    textAlign: 'center'
  },
  titleLong: {
    flex: 1,
    fontSize: FONT_SIZE.s_18,
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_12, PADDING.p_0)
  },
  right: {
    width: LAYOUT.l_56,
    height: LAYOUT.l_50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_0, PADDING.p_12)
  }
});
