import {MyText, MyView} from 'bases/components';
import {IProductModel} from 'models';
import React, {PureComponent} from 'react';

import {titleDetailProduct} from 'views/productDetail/style/ProductDetail.Style';

interface IProps {
  titleDetail: string;
  data: IProductModel;
}

export default class TitleDetailProduct extends PureComponent<IProps, {}> {
  render() {
    const {titleDetail, data} = this.props;
    return (
      <MyView style={titleDetailProduct.container} transparent>
        <MyText fontStyle="Bold" style={titleDetailProduct.title}>
          {titleDetail}
        </MyText>
        <MyText fontStyle="Regular">{data.description}</MyText>
      </MyView>
    );
  }
}
