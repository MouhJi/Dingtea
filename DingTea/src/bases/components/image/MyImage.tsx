import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';

import {RADIUS, setRadius} from '../../styles/Core';

interface IProps extends FastImageProps {
  width: number | string;
  height?: number | string;
  children?: any | null;
}

export const MyImage = (props: IProps) => {
  const {children, style, width, height} = props;

  return (
    <FastImage
      resizeMode="contain"
      {...props}
      style={[styles.image, style, {width: width, height: height}]}>
      {children}
    </FastImage>
  );
};

const styles = StyleSheet.create({
  image: {
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  }
});
