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

import Utilities from 'utils/Utilities';

import MyNavigator from 'utils/MyNavigator';
import {MyText, MyButton, MyImage, MyView, MyViewShadow, MyIcon} from 'bases/components';

interface IProps {}

const Images = [
  'https://images.foody.vn/res/g17/164937/s180x180/foody-ding-tea-chua-lang-199-636684237509738726.jpg',
  'https://images.foody.vn/res/g8/79187/s180x180/foody-checkin-ding-tea-tran-duy-hung-606-636066096201200402.jpg',
  'https://images.foody.vn/res/g8/79187/s180x180/foody-ding-tea-tran-duy-hung-230-635946018788336725.jpg',
  'https://images.foody.vn/res/g8/79187/s180x180/foody-ding-tea-tran-duy-hung-636-636010847012424855.jpg',
  'https://images.foody.vn/res/g8/79187/s180x180/foody-ding-tea-tran-duy-hung-529-636588852254134997.jpg'
];

export default class ItemComment extends PureComponent<IProps, {}> {
  onPress = (index: number) => {
    MyNavigator.navigate('PreviewImage', {arrImages: Images, indexSelected: index});
  };

  render() {
    const time = Utilities.convertTimeByFormat(1610536095270, 'DD/MM/YYYY');

    let _viewContent = (
      <MyText style={styles.textComment} fontStyle="Regular" numberOfLines={4}>
        {'Mình đã đặt trà sữa của quán tại Tô Hiệu, công nhận ngon dã man luôn í ~'}
      </MyText>
    );

    let _viewImage: any = [];
    if (Images && Images.length > 0) {
      Images.map((value, index) => {
        const source = Utilities.convertLinkImage(value, 'MEDIUM');
        _viewImage.push(
          <MyButton key={index} transparent onPress={() => this.onPress(index)}>
            <MyImage
              source={source}
              width={styles.imageCmt.width}
              height={styles.imageCmt.width}
              style={styles.imageCmt}
            />
          </MyButton>
        );
      });
    }

    let _viewContainerImage = null;
    if (_viewImage.length > 0) {
      _viewContainerImage = (
        <MyView style={styles.contentImg} transparent>
          {_viewImage}
        </MyView>
      );
    }

    return (
      <MyViewShadow style={styles.container}>
        <MyView style={styles.content} transparent>
          <MyText style={styles.userName} fontStyle="Bold" numberOfLines={1}>
            {'ThanhNC Csell'}
          </MyText>
          <MyText style={styles.timeCmt} fontStyle="Regular" numberOfLines={1}>
            {time}
          </MyText>
        </MyView>
        <MyText fontStyle="Regular" style={styles.textContent}>
          {'Đã đánh giá:'}
          <MyText style={styles.titleStar} fontStyle="Bold">
            {' '}
            {5}
          </MyText>
          <MyIcon
            iconFontType="AntDesign"
            name="star"
            size={styles.titleStar.fontSize}
            color={styles.titleStar.color}
          />
        </MyText>
        {_viewContent}
        {_viewContainerImage}
      </MyViewShadow>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BG.WHITE,
    flex: 1,
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16),
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10)
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userName: {
    flex: 1,
    fontSize: FONT_SIZE.s_14
  },
  timeCmt: {
    fontSize: FONT_SIZE.s_14
  },
  textContent: {
    fontSize: FONT_SIZE.s_14,
    color: COLOR.TEXT.PRIMARY
  },
  textComment: {
    fontSize: FONT_SIZE.s_14,
    color: COLOR.TEXT.PRIMARY,
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  titleStar: {
    fontSize: FONT_SIZE.s_14,
    color: COLOR.TEXT.RED
  },
  contentImg: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  imageCmt: {
    width: LAYOUT.l_75,
    ...setRadius(RADIUS.r_10, RADIUS.r_10, RADIUS.r_10, RADIUS.r_10),
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_0, MARGIN.m_10)
  }
});
