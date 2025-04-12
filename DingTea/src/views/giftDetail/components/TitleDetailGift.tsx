import {MyView, MyText} from 'bases/components';
import React, {PureComponent} from 'react';

import {titleDetailGift} from '../style/GiftDetail.Style';

interface IProps {
  titleDetail: string;
}

export default class TitleDetailGift extends PureComponent<IProps, {}> {
  render() {
    const {titleDetail} = this.props;
    return (
      <MyView style={titleDetailGift.container} transparent>
        <MyText fontStyle="Bold" style={titleDetailGift.title}>
          {titleDetail}
        </MyText>
        <MyText fontStyle="Regular">
          {
            'Trà sữa trân châu đường đen là sự kết hợp hoàn hảo giữa vị ngọt đặc trưng của siro đường hổ quyện với vị ngậy béo của sữa tươi cùng trân châu dẻo dai uống rồi lại muốn thêm ly nữa.'
          }
        </MyText>
      </MyView>
    );
  }
}
