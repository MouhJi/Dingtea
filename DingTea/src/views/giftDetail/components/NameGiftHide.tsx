import {MyView, MyText} from 'bases/components';
import React, {PureComponent} from 'react';

import {styleNameGift} from '../style/GiftDetail.Style';

interface IProps {}

export default class NameGiftHide extends PureComponent<IProps> {
  render() {
    return (
      <MyView style={styleNameGift.containerHide} transparent>
        <MyView style={styleNameGift.containerTextHide}>
          <MyText style={styleNameGift.textHide} fontStyle="Bold" numberOfLines={2}>
            {'Son Thỏi EcoleDelight'}
          </MyText>
        </MyView>
      </MyView>
    );
  }
}
