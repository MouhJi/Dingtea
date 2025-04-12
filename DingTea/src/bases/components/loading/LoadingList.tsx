import React from 'react';
import {ActivityIndicator, StyleSheet, ViewProps} from 'react-native';
import MyTheme from 'utils/MyTheme';

import {MARGIN, setMargin} from '../../styles/Core';

interface IProps {
  style?: ViewProps;
}

export const LoadingList = (props: IProps) => {
  const {style} = props;
  return (
    <ActivityIndicator
      style={[styles.container, style]}
      size="large"
      color={MyTheme.themes.TEXT.PRIMARY}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...setMargin(MARGIN.m_32, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16)
  }
});
