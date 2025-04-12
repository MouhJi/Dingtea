import React, {PureComponent} from 'react';
import {StyleSheet, ViewProps} from 'react-native';

import {
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
import {MyText, MyTextPriceMask, MyButton, MyImage, MyView} from 'bases/components';
import {IProductModel} from 'models';
import MyTheme from 'utils/MyTheme';

interface IProps extends ViewProps {
  data: IProductModel;
}

export default class ItemProduct extends PureComponent<IProps, {}> {
  onPress = () => {
    const {data} = this.props;
    MyNavigator.navigate('ProductDetail', {id: data.id, product: data});
  };

  render() {
    const {style, data} = this.props;

    const source = Utilities.convertLinkImage(data?.thumbnail_url, 'MEDIUM');

    const {price, normal_price, name, description} = data;

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
          fontStyle="SemiBold"
          style={styles.priceOrigin}
        />
      );
    }

    return (
      <MyButton {...this.props} style={[styles.container, style]} onPress={this.onPress}>
        <MyView style={styles.content} transparent>
          <MyView transparent>
            <MyText style={styles.title} fontStyle="Bold" numberOfLines={1}>
              {name?.trim()}
            </MyText>
            <MyText style={styles.title2} fontStyle="Bold" numberOfLines={2}>
              {description?.trim()}
            </MyText>
          </MyView>
          <MyView style={styles.contentPrice} transparent>
            <MyTextPriceMask
              text={giaBan}
              currency="VND"
              fontStyle="SemiBold"
              style={styles.price}
            />
            {_viewPriceOrigin}
          </MyView>
        </MyView>
        <MyImage
          source={source}
          width={styles.image.width}
          height={styles.image.width}
          style={styles.image}
        />
        {_viewPercent}
      </MyButton>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    flexDirection: 'row',
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16)
    // ...setRadius(RADIUS.r_4, RADIUS.r_4, RADIUS.r_4, RADIUS.r_4)
  },
  image: {
    width: LAYOUT.l_86,
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6)
  },
  content: {
    flex: 1,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_10),
    justifyContent: 'space-between'
  },
  title: {
    fontSize: FONT_SIZE.s_14
  },
  title2: {
    fontSize: FONT_SIZE.s_14,
    ...setMargin(MARGIN.m_4, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    color: MyTheme.themes.TEXT.SECONDARY
  },
  price: {
    fontSize: FONT_SIZE.s_14,
    color: MyTheme.themes.TEXT.PRIMARY_LIGHT
  },
  priceOrigin: {
    textDecorationLine: 'line-through',
    alignSelf: 'flex-end',
    fontSize: FONT_SIZE.s_11,
    color: MyTheme.themes.TEXT.PRIMARY_LIGHT,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_8, MARGIN.m_0)
  },
  contentPrice: {
    flexDirection: 'row'
  },
  textPercent: {
    borderRadius: RADIUS.r_4,
    overflow: 'hidden',
    fontSize: FONT_SIZE.s_12,
    color: MyTheme.themes.TEXT.PRIMARY,
    backgroundColor: MyTheme.themes.BG.PRIMARY,
    position: 'absolute',
    top: PADDING.p_8,
    right: PADDING.p_8,
    zIndex: 100,
    ...setPadding(PADDING.p_2, PADDING.p_2, PADDING.p_2, PADDING.p_2)
  }
});
