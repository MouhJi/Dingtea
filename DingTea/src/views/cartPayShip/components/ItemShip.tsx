import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import {
  COLOR,
  FONT_SIZE,
  LAYOUT,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius
} from 'bases/styles/Core';
import {MyButtonShadow, MyText, MyImage, MyView, MyTextPriceMask} from 'bases/components';
import Utilities from 'utils/Utilities';
import {ICartShipModel} from 'models';

interface IProps {
  item: ICartShipModel;
  onPress: () => void;
}

export default class ItemPayment extends PureComponent<IProps, {}> {
  render() {
    const {onPress, item} = this.props;
    return (
      <MyButtonShadow style={styles.containerDetail} onPress={onPress}>
        <MyImage
          style={styles.imgIcon}
          width={LAYOUT.l_40}
          height={LAYOUT.l_40}
          source={Utilities.convertLinkImage(item.logo)}
          resizeMode="contain"
        />
        <MyView transparent>
          <MyText style={styles.titleDetail} fontStyle="Bold" numberOfLines={1}>
            {item.name}
          </MyText>
          <MyTextPriceMask text={item.price} />
        </MyView>
      </MyButtonShadow>
    );
  }
}

const styles = StyleSheet.create({
  containerDetail: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10),
    alignItems: 'center',
    minHeight: LAYOUT.l_50
  },
  titleDetail: {
    fontSize: FONT_SIZE.s_14
  },
  viewImage: {
    alignItems: 'center'
  },
  imgIcon: {
    ...setRadius(RADIUS.r_0, RADIUS.r_0, RADIUS.r_0, RADIUS.r_0),
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_26)
  }
});
