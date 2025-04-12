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
import {SvgUri} from 'react-native-svg';
import Utilities from 'utils/Utilities';

import MyNavigator from 'utils/MyNavigator';
import {MyButton, MyImage, MyText, MyButtonShadow, MyView, MyViewShadow} from 'bases/components';
import {ICategoryModel} from 'models';

interface IProps {
  data?: ICategoryModel;
  isEmpty?: boolean;
}

export class ItemMenu extends PureComponent<IProps, {}> {
  onPress = () => {
    const {data} = this.props;
    MyNavigator.navigate('MenuDetail', {id: data?.id});
  };

  render() {
    const {data, isEmpty} = this.props;

    if (isEmpty) {
      return (
        <MyView style={styles.container}>
          <MyView style={styles.image} />
          <MyText style={styles.titleHide} fontStyle="Regular" numberOfLines={2}>
            {'dingteavnapp dingteavnapp'}
          </MyText>
        </MyView>
      );
    }

    const source = Utilities.convertLinkImage(data?.logo, 'LOW');

    return (
      <MyButton style={styles.container} onPress={this.onPress}>
        <MyImage
          source={source}
          width={styles.image.width}
          height={styles.image.width}
          style={styles.image}
        />
        <MyText
          style={data ? styles.title : styles.titleHide}
          fontStyle="Regular"
          numberOfLines={2}>
          {data?.name?.trim() || 'dingteavnapp dingteavnapp'}
        </MyText>
      </MyButton>
    );
  }
}

export class ItemMenuDetail extends PureComponent<IProps, {}> {
  onPress = () => {
    const {data} = this.props;
    MyNavigator.navigate('MenuDetail', {id: data?.id});
  };

  render() {
    const {data} = this.props;

    const source = Utilities.convertLinkImage(data?.logo, 'LOW');
    return (
      <MyButtonShadow style={styles.containerDetail} onPress={this.onPress}>
        <MyImage
          source={source}
          width={styles.imageDetail.width}
          height={styles.imageDetail.width}
          style={styles.imageDetail}
        />
        <MyView style={styles.contentDetail} transparent={true}>
          <MyText style={styles.titleDetail} fontStyle="Bold" numberOfLines={1}>
            {data?.name}
          </MyText>
          {/* <MyText style={styles.secondTitleDetail} fontStyle="SemiBold" numberOfLines={1}>
            {'10 món'}
          </MyText> */}
        </MyView>
      </MyButtonShadow>
    );
  }
}

interface IPropsSvg {
  url: string;
  isShowTitle?: boolean;
}

export class ItemMenuSvg extends PureComponent<IPropsSvg, {}> {
  onPress = () => {
    MyNavigator.navigate('Promotion');
  };
  render() {
    const {url, isShowTitle} = this.props;
    let _viewTitle = isShowTitle ? (
      <MyText style={styles.title} fontStyle="Regular" numberOfLines={1}>
        {'Son môi'}
      </MyText>
    ) : null;
    return (
      <MyButton style={styles.containerSvg} onPress={this.onPress} transparent>
        <MyViewShadow style={styles.viewSvg}>
          <SvgUri width={24} height={24} uri={url} />
        </MyViewShadow>
        {_viewTitle}
      </MyButton>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.PRIMARY,
    flex: 1,
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_0, PADDING.p_0)
  },
  image: {
    width: LAYOUT.l_50,
    height: LAYOUT.l_50,
    alignSelf: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: FONT_SIZE.s_11,
    ...setMargin(MARGIN.m_4, MARGIN.m_0, MARGIN.m_2, MARGIN.m_2)
  },
  titleHide: {
    color: COLOR.BG.PRIMARY,
    textAlign: 'center',
    fontSize: FONT_SIZE.s_11,
    ...setMargin(MARGIN.m_4, MARGIN.m_0, MARGIN.m_2, MARGIN.m_2)
  },

  containerDetail: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10)
  },
  imageDetail: {
    width: LAYOUT.l_60,
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10)
  },
  contentDetail: {
    flex: 1,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_10, MARGIN.m_0),
    justifyContent: 'center'
  },
  titleDetail: {
    fontSize: FONT_SIZE.s_14
  },
  secondTitleDetail: {
    fontSize: FONT_SIZE.s_14,
    color: COLOR.TEXT.SECONDARY,
    ...setMargin(MARGIN.m_2, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },

  containerSvg: {
    backgroundColor: COLOR.BG.PRIMARY,
    width: LAYOUT.l_70,
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_0, PADDING.p_0)
  },
  viewSvg: {
    width: LAYOUT.l_50,
    height: LAYOUT.l_50,
    ...setRadius(RADIUS.r_16, RADIUS.r_16, RADIUS.r_16, RADIUS.r_16),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
});
