import {MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import WebView from 'react-native-webview';

interface IProps {
  route?: any;
}

export default class PreviewWeb extends PureComponent<IProps> {
  render() {
    const {params} = this.props.route;
    return (
      <MyView style={styles.container}>
        <WebView
          source={{uri: params?.uri || 'https://dingtea.vn/'}}
          androidHardwareAccelerationDisabled
        />
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    flex: 1
  }
});
