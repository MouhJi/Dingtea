import React, {PureComponent} from 'react';

import {styleNameProduct} from '../../style/ProductDetail.Style';

import {COLOR} from 'bases/styles/Core';
import {MyButtonIcon, MyIcon, MyText, MyTextPriceMask, MyView} from 'bases/components';
import {IProductModel} from 'models';

interface IProps {
  data: IProductModel;
}

export default class NameProductHide extends PureComponent<IProps> {
  render() {
    const {data} = this.props;
    const {name, hashtag} = data;

    let _viewHashtag: any[] = [];
    hashtag.map((element, index) => {
      _viewHashtag.push(
        <MyText
          key={index}
          style={[styleNameProduct.textPromotion, styleNameProduct.textHide]}
          fontStyle="Regular">
          {element}
        </MyText>
      );
    });

    return (
      <MyView style={styleNameProduct.containerHide} transparent>
        <MyView style={styleNameProduct.containerTextHide}>
          <MyText
            style={[styleNameProduct.title, styleNameProduct.textHide]}
            fontStyle="Bold"
            numberOfLines={2}>
            {name}
            <MyText
              style={[styleNameProduct.titleStar, styleNameProduct.textHide]}
              fontStyle="Bold">
              {' '}
              {5}
            </MyText>
            <MyIcon
              iconFontType="AntDesign"
              name="star"
              size={styleNameProduct.titleStar.fontSize}
              color={styleNameProduct.textHide.color}
            />
          </MyText>
          <MyView style={[styleNameProduct.contentPrice, styleNameProduct.textHide]} transparent>
            <MyTextPriceMask
              text={99999}
              currency="VND"
              fontStyle="Regular"
              style={[styleNameProduct.price, styleNameProduct.textHide]}
            />
          </MyView>
          {hashtag.length > 0 ? (
            <MyView style={styleNameProduct.contentPromotion} transparent>
              {_viewHashtag}
            </MyView>
          ) : null}
        </MyView>
        <MyButtonIcon
          disabled
          style={styleNameProduct.btnHeart}
          iconFontType="AntDesign"
          iconProps={{name: 'hearto', color: COLOR.BG.WHITE, size: 18}}
        />
      </MyView>
    );
  }
}
