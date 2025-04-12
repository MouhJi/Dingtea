import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

import {setShadow} from 'bases/styles/Core';
import MyTheme from 'utils/MyTheme';

interface IProps extends ViewProps {
  children?: React.ReactNode;
  transparent?: boolean;
}

export const MyView = (props: IProps) => {
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
    <View {...props} style={[styles.container, styleOfView, transparentStyle]}>
      {children}
    </View>
  );
};

export const MyViewShadow = (props: IProps) => {
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
    <View {...props} style={[styles.containerShadow, styleOfView, transparentStyle]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.SECONDARY
  },
  containerShadow: {
    backgroundColor: MyTheme.themes.BG.SECONDARY,
    ...setShadow()
  }
});
