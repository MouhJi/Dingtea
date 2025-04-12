import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {
  FONT_SIZE,
  LAYOUT,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius
} from 'bases/styles/Core';

import Utilities from 'utils/Utilities';

import {MyText, MyImage, MyView, MyButton} from 'bases/components';
import MyI18n from 'utils/MyI18n';
import MyTheme from 'utils/MyTheme';

interface IProps {
  isGifted?: boolean;
  title?: string;
  point?: number | string;
  image?: string;
  nameGift?: string;
  onPress?: () => void;
}

export class ItemGift extends PureComponent<IProps> {
  // onPress = () => {
  //   MyNavigator.navigate('GiftDetail', {gift: 'id'});
  // };

  render() {
    const {title, point, image, nameGift, onPress} = this.props;

    const source = Utilities.convertLinkImage(image, 'MEDIUM');

    return (
      <MyButton onPress={onPress} style={styles.container}>
        <MyImage
          height={styles.image.width}
          width={styles.image.width}
          source={source}
          style={styles.image}
        />
        <MyView transparent style={styles.contentText}>
          <MyText fontStyle="SemiBold" numberOfLines={2}>
            {title}
          </MyText>
          <MyText fontStyle="SemiBold" style={styles.textCoin}>
            <MyText fontStyle={'SemiBold'} style={styles.txtnameGift}>
              {nameGift} -{' '}
            </MyText>
            {point} {MyI18n.trans.point}
          </MyText>
        </MyView>
      </MyButton>
    );
  }
}

export class ItemGiftDetail extends PureComponent<IProps> {
  // onPress = () => {
  //   MyNavigator.navigate('GiftDetail', {gift: 'id'});
  // };

  render() {
    const {title, point, image, nameGift, onPress} = this.props;

    const source = Utilities.convertLinkImage(image, 'MEDIUM');

    return (
      <>
        <MyButton onPress={onPress} style={stylesDetail.container}>
          <MyImage
            height={stylesDetail.image.width}
            width={stylesDetail.image.width}
            source={source}
            style={stylesDetail.image}
          />
          <MyText style={stylesDetail.txtTitle} fontStyle="SemiBold" numberOfLines={2}>
            {title}
          </MyText>
          <MyText fontStyle="SemiBold" style={stylesDetail.textCoin}>
            <MyText fontStyle={'SemiBold'} style={stylesDetail.txtnameGift}>
              {nameGift} -{' '}
            </MyText>
            {point} {MyI18n.trans.point}
          </MyText>
        </MyButton>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  image: {
    width: LAYOUT.l_60,
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6)
  },
  contentText: {
    flex: 1,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_14, MARGIN.m_0)
  },
  childContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setMargin(MARGIN.m_2, MARGIN.m_2, MARGIN.m_0, MARGIN.m_0)
  },
  textCoin: {
    fontSize: FONT_SIZE.s_12,
    color: MyTheme.themes.TEXT.PRIMARY_DARK,
    ...setMargin(MARGIN.m_4, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  txtnameGift: {
    color: MyTheme.themes.TEXT.SECONDARY
  }
});

const stylesDetail = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16),
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6)
  },
  image: {
    width: LAYOUT.l_184,
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6)
  },
  contentText: {
    // flex: 1,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_14, MARGIN.m_0)
  },
  childContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setMargin(MARGIN.m_2, MARGIN.m_2, MARGIN.m_0, MARGIN.m_0)
  },
  textCoin: {
    fontSize: FONT_SIZE.s_12,
    color: MyTheme.themes.TEXT.PRIMARY_DARK,
    ...setMargin(MARGIN.m_6, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  txtnameGift: {
    color: MyTheme.themes.TEXT.SECONDARY
  },
  txtTitle: {
    ...setMargin(MARGIN.m_12, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    maxWidth: LAYOUT.l_184
  }
});
