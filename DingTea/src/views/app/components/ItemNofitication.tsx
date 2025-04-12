import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import {
  COLOR,
  FONT_SIZE,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius
} from 'bases/styles/Core';

import Utilities from 'utils/Utilities';
import {MyButtonShadow, MyText} from 'bases/components';

interface IProps {}

export default class ItemNotification extends PureComponent<IProps> {
  onPress = () => {};

  render() {
    const time = Utilities.convertTimeByFormat(1610536095, 'hh:mm DD/MM/YYYY');

    return (
      <MyButtonShadow onPress={this.onPress} style={styles.container}>
        <MyText fontStyle="Bold" numberOfLines={2}>
          {'Chúc mừng sinh nhật <3'}
        </MyText>
        <MyText fontStyle="Regular" style={styles.textDescription}>
          {'Dingtea chúc bạn có một sinh nhật vui vẻ, đầm ấm bên người thân và gia đình!'}
        </MyText>
        <MyText fontStyle="Regular" style={styles.textDate}>
          {time}
        </MyText>
      </MyButtonShadow>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    ...setPadding(PADDING.p_15, PADDING.p_15, PADDING.p_15, PADDING.p_15),
    ...setRadius(RADIUS.r_15, RADIUS.r_15, RADIUS.r_15, RADIUS.r_15)
  },
  textDescription: {
    fontSize: FONT_SIZE.s_11
  },
  textDate: {
    fontSize: FONT_SIZE.s_12,
    color: COLOR.TEXT.DA_CAM,
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  }
});
