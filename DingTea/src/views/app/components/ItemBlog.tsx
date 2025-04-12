import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import {
  COLOR,
  FONT_SIZE,
  setMargin,
  setRadius,
  MARGIN,
  RADIUS,
  LAYOUT,
  PADDING,
  setPadding
} from 'bases/styles/Core';

import Utilities from 'utils/Utilities';

import MyNavigator from 'utils/MyNavigator';
import {MyButtonShadow, MyImage, MyText, MyView} from 'bases/components';
import {IBlogModel} from 'models';
import MyTheme from 'utils/MyTheme';

interface IProps {
  itemBlog: IBlogModel;
}

export class ItemBlog extends PureComponent<IProps, {}> {
  onPress = (item: any) => {
    MyNavigator.navigate('BlogDetail', {blog: item});
  };

  render() {
    const {itemBlog} = this.props;
    const source = Utilities.convertLinkImage(itemBlog.avatar, 'HIGH');
    return (
      <MyButtonShadow style={styles.container} onPress={() => this.onPress(itemBlog)} transparent>
        <MyImage
          resizeMode="cover"
          source={source}
          width={styles.image.width}
          height={styles.image.height}
          style={styles.image}
        />
        <MyView style={styles.blackGradian}>
          <MyText style={styles.title} fontStyle="SemiBold" numberOfLines={2}>
            {itemBlog.title?.trim()}
          </MyText>
          <MyText style={styles.secondTitle} fontStyle="SemiBold" numberOfLines={1}>
            {itemBlog.description}
          </MyText>
        </MyView>
      </MyButtonShadow>
    );
  }
}

export class ItemBlogDetal extends PureComponent<IProps, {}> {
  onPress = (item: any) => {
    MyNavigator.navigate('BlogDetail', {blog: item});
  };

  render() {
    const {itemBlog} = this.props;
    const source = Utilities.convertLinkImage(itemBlog.avatar, 'LOW');
    return (
      <MyButtonShadow
        transparent
        style={styles.containerDetail}
        onPress={() => this.onPress(itemBlog)}>
        <MyImage
          source={source}
          width={styles.imageDetail.width}
          height={styles.imageDetail.height}
          style={styles.imageDetail}
        />
        <MyView style={styles.contentDetail} transparent={true}>
          <MyText style={styles.titleDetail} fontStyle="SemiBold" numberOfLines={1}>
            {itemBlog.title}
          </MyText>
          <MyText style={styles.secondTitleDetail} fontStyle="SemiBold" numberOfLines={2}>
            {itemBlog.description}
          </MyText>
        </MyView>
      </MyButtonShadow>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: LAYOUT.l_248,
    height: LAYOUT.l_140,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    justifyContent: 'flex-end'
  },
  image: {
    position: 'absolute',
    width: LAYOUT.l_248,
    height: LAYOUT.l_140,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  title: {
    fontSize: FONT_SIZE.s_14,
    color: MyTheme.themes.TEXT.WHITE,
    ...setMargin(MARGIN.m_10, MARGIN.m_4, MARGIN.m_10, MARGIN.m_10)
  },
  secondTitle: {
    fontSize: FONT_SIZE.s_12,
    color: MyTheme.themes.TEXT.WHITE,
    ...setMargin(MARGIN.m_0, MARGIN.m_10, MARGIN.m_10, MARGIN.m_10)
  },
  containerDetail: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_0, PADDING.p_0)
  },
  imageDetail: {
    width: LAYOUT.l_114,
    height: LAYOUT.l_64,
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6)
  },
  contentDetail: {
    flex: 1,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_10, MARGIN.m_0)
  },
  titleDetail: {
    fontSize: FONT_SIZE.s_14
  },
  secondTitleDetail: {
    fontSize: FONT_SIZE.s_14,
    color: MyTheme.themes.TEXT.SECONDARY,
    ...setMargin(MARGIN.m_2, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  blackGradian: {
    backgroundColor: MyTheme.themes.BG.BLACK_30,
    ...setRadius(RADIUS.r_0, RADIUS.r_0, RADIUS.r_8, RADIUS.r_8)
  }
});
