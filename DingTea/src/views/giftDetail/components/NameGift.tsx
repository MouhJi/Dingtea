import React, {PureComponent} from 'react';
import {styleNameGift} from '../style/GiftDetail.Style';
import {COLOR} from 'bases/styles/Core';
import {MyView, MyText, MyButtonIcon} from 'bases/components';

interface IProps {
  titlePoint: string;
}
export default class NameGift extends PureComponent<IProps> {
  state = {isFavorite: false};

  render() {
    const {titlePoint} = this.props;
    return (
      <MyView style={styleNameGift.container} transparent>
        <MyView style={styleNameGift.containerText}>
          <MyText style={styleNameGift.title} fontStyle="Bold" numberOfLines={2}>
            {'Son Thỏi EcoleDelight'}
          </MyText>
          <MyText style={styleNameGift.txtPoint} fontStyle="Bold" numberOfLines={2}>
            {'25'} {titlePoint}
          </MyText>
        </MyView>
        <MyButtonIcon
          disabled
          style={styleNameGift.btnHeart}
          iconFontType="AntDesign"
          iconProps={{
            name: 'hearto',
            color: COLOR.BG.WHITE,
            size: 18
          }}
        />
      </MyView>
    );
  }
}
