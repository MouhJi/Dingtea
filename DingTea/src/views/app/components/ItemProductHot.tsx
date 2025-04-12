import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import {
  COLOR,
  FONT_SIZE,
  PADDING,
  setPadding,
  setMargin,
  setRadius,
  MARGIN,
  LAYOUT,
  RADIUS
} from 'bases/styles/Core';

import Utilities from 'utils/Utilities';

import MyNavigator from 'utils/MyNavigator';
import {
  MyText,
  MyTextPriceMask,
  MyButtonShadow,
  MyImage,
  MyView,
  MyIcon,
  MyViewShadow
} from 'bases/components';
import {IProductModel} from 'models';

interface IProps {
  data?: IProductModel;
}

export default class ItemProductHot extends PureComponent<IProps, {}> {
  onPress = () => {
    const {data} = this.props;
    MyNavigator.navigate('ProductDetail', {id: data?.id, product: data});
  };

  render() {
    const {data} = this.props;
    if (!data) {
      return (
        <MyViewShadow style={styles.containerHotProduct}>
          <MyImage
            source={Utilities.convertLinkImage('', 'MEDIUM')}
            width={styles.imageHotProduct.width}
            height={styles.imageHotProduct.width}
            style={styles.imageHotProduct}
          />
        </MyViewShadow>
      );
    }
    const source = Utilities.convertLinkImage(data?.thumbnail_url, 'MEDIUM');

    const {price, normal_price, name, rating_count} = data;

    let giaBan = 0;
    let giaGoc = 0;
    if (price) {
      giaBan = price;
    }
    if (normal_price) {
      giaGoc = normal_price;
    }
    let percent = 0;
    if (giaGoc) {
      percent = Math.round(((giaGoc - giaBan) / giaGoc) * 100);
    }

    let _viewPercent = null;
    let _viewPriceOrigin = null;
    if (percent > 0) {
      _viewPercent = (
        <MyText style={styles.textPercent} fontStyle="Regular">
          {'-'}
          {percent}
          {'%'}
        </MyText>
      );
      _viewPriceOrigin = (
        <MyTextPriceMask
          text={giaGoc}
          currency="VND"
          fontStyle="Regular"
          style={styles.priceOriginHotProduct}
        />
      );
    }

    return (
      <MyButtonShadow style={styles.containerHotProduct} onPress={this.onPress}>
        <MyImage
          source={source}
          width={styles.imageHotProduct.width}
          height={styles.imageHotProduct.width}
          style={styles.imageHotProduct}
        />
        {_viewPercent}
        <MyView style={styles.content} transparent={true}>
          <MyText style={styles.titleHotProduct} fontStyle="Bold" numberOfLines={2}>
            {name?.trim()}
            <MyText style={styles.titleStarHotProduct} fontStyle="Bold">
              {' '}
              {rating_count}
            </MyText>
            <MyIcon
              iconFontType="AntDesign"
              name="star"
              size={styles.titleStarHotProduct.fontSize}
              color={styles.titleStarHotProduct.color}
            />
          </MyText>
          <MyView style={styles.contentPrice} transparent={true}>
            <MyTextPriceMask
              text={giaBan}
              currency="VND"
              fontStyle="Regular"
              style={styles.priceHotProduct}
            />
            {_viewPriceOrigin}
          </MyView>
        </MyView>
      </MyButtonShadow>
    );
  }
}

const styles = StyleSheet.create({
  containerHotProduct: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    width: LAYOUT.l_174,
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10)
  },
  imageHotProduct: {
    width: LAYOUT.l_52,
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10)
  },
  content: {
    flex: 1,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_10, MARGIN.m_0)
  },
  titleHotProduct: {
    fontSize: FONT_SIZE.s_10
  },
  titleStarHotProduct: {
    fontSize: FONT_SIZE.s_10,
    color: COLOR.BUTTON.RED
  },
  priceHotProduct: {
    fontSize: FONT_SIZE.s_12,
    color: COLOR.TEXT.PRIMARY
  },
  priceOriginHotProduct: {
    textDecorationLine: 'line-through',
    alignSelf: 'flex-end',
    fontSize: FONT_SIZE.s_9,
    color: COLOR.TEXT.PRIMARY,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_4, MARGIN.m_0)
  },
  contentPrice: {
    flexDirection: 'row'
  },
  textPercent: {
    borderRadius: RADIUS.r_4,
    overflow: 'hidden',
    fontSize: FONT_SIZE.s_9,
    color: COLOR.TEXT.WHITE,
    backgroundColor: COLOR.BUTTON.RED,
    position: 'absolute',
    top: PADDING.p_6,
    left: PADDING.p_6,
    zIndex: 100,
    ...setPadding(PADDING.p_2, PADDING.p_2, PADDING.p_2, PADDING.p_2)
  }
});
